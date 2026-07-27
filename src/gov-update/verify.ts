import {
  normalizePackageName,
  normalizePyPIName,
} from "../gov-dependencies.js";
import { FetchFn, USER_AGENT, getJson, getText } from "./http.js";

export type { FetchFn };
export type Ecosystem = "npm" | "pypi";
export type Verdict = "PASS" | "FLAG" | "REJECT";

export interface VerifyResult {
  verdict: Verdict;
  reason: string;
  repo?: string;
}

export interface GithubRepoRef {
  org: string;
  repo: string;
}

const PYPI_URL_KEYS = [
  "repository",
  "source",
  "source code",
  "code",
  "github",
  "homepage",
];
const SKIP_DIRS =
  /(^|\/)(node_modules|vendor|vendored|third[-_]party|dist|build|\.git)\//;
const MANIFEST_PATH =
  /(^|\/)(package\.json|pyproject\.toml|setup\.py|setup\.cfg)$/;
const MAX_TREE_MANIFESTS = 40;

export function parseGithubUrl(url: unknown): GithubRepoRef | null {
  if (!url || typeof url !== "string") return null;
  let u = url.trim().toLowerCase();
  u = u
    .replace(/^git\+/, "")
    .replace(/^git:\/\//, "https://")
    .replace(/^ssh:\/\/git@/, "https://")
    .replace(/^git@github\.com:/, "https://github.com/");
  if (u.startsWith("github:")) u = "https://github.com/" + u.slice(7);
  if (/^[\w.-]+\/[\w.-]+$/.test(u)) u = "https://github.com/" + u;
  const m = u.match(
    /(?:^|\/\/)(?:www\.)?github\.com\/([\w.-]+)\/([\w.-]+?)(?:\.git)?(?:[/?#]|$)/,
  );
  return m ? { org: m[1], repo: m[2] } : null;
}

interface NpmRegistryDoc {
  repository?: string | { url?: string };
}

interface PyPIRegistryDoc {
  info?: {
    home_page?: string | null;
    project_urls?: Record<string, string> | null;
  };
}

export function extractClaimedRepos(
  eco: Ecosystem,
  doc: unknown,
): GithubRepoRef[] {
  const out: GithubRepoRef[] = [];
  if (eco === "npm") {
    const repository = (doc as NpmRegistryDoc).repository;
    const ref = parseGithubUrl(
      typeof repository === "string" ? repository : repository?.url,
    );
    if (ref) out.push(ref);
  } else {
    const info = (doc as PyPIRegistryDoc).info ?? {};
    for (const [key, value] of Object.entries(info.project_urls ?? {})) {
      if (!PYPI_URL_KEYS.includes(key.toLowerCase())) continue;
      const ref = parseGithubUrl(value);
      if (ref) out.push(ref);
    }
    const ref = parseGithubUrl(info.home_page);
    if (ref) out.push(ref);
  }
  return out;
}

export function extractManifestNames(filePath: string, text: string): string[] {
  if (filePath.endsWith("package.json")) {
    try {
      const parsed = JSON.parse(text) as { name?: unknown };
      return typeof parsed.name === "string" ? [parsed.name] : [];
    } catch {
      return [];
    }
  }
  return [...text.matchAll(/^\s*name\s*=\s*["']([^"']+)["']/gm)].map(
    (m) => m[1],
  );
}

export function extractReadmeInstallNames(
  eco: Ecosystem,
  text: string,
): string[] {
  const patterns =
    eco === "npm"
      ? [
          /npm (?:install|i|add)(?: -{1,2}[\w-]+)* +(@?[\w./-]+)/g,
          /yarn add(?: -{1,2}[\w-]+)* +(@?[\w./-]+)/g,
        ]
      : [
          /pip3? install(?: -{1,2}[\w=.-]+)* +([\w.[\]-]+)/g,
          /conda install(?: -c [\w-]+)* +([\w.-]+)/g,
        ];
  const names: string[] = [];
  for (const pattern of patterns) {
    for (const m of text.matchAll(pattern)) {
      const name = m[1].replace(/\[.*\]$/, "");
      if (/^(-|\.|install$|git$|requirements)/.test(name)) continue;
      names.push(name);
    }
  }
  return names;
}

function namesEqual(eco: Ecosystem, a: string, b: string): boolean {
  return eco === "npm"
    ? normalizePackageName(a) === normalizePackageName(b)
    : normalizePyPIName(a) === normalizePyPIName(b);
}

function scopeStrippedEqual(a: string, b: string): boolean {
  const strip = (s: string) => normalizePackageName(s.replace(/^@[^/]+\//, ""));
  return strip(a) === strip(b);
}

export interface VerifyOptions {
  eco: Ecosystem;
  name: string;
  allowedOrgs: Set<string>;
  githubToken?: string;
  fetchFn?: FetchFn;
}

export async function verifyPackage(
  options: VerifyOptions,
): Promise<VerifyResult> {
  const { eco, name, allowedOrgs, githubToken } = options;
  const fetchFn = options.fetchFn ?? fetch;

  const registryUrl =
    eco === "npm"
      ? `https://registry.npmjs.org/${encodeURIComponent(name)}`
      : `https://pypi.org/pypi/${encodeURIComponent(name)}/json`;
  const doc = await getJson(fetchFn, registryUrl);
  if (doc === null) {
    return { verdict: "REJECT", reason: "registry lookup failed" };
  }

  const claimed = extractClaimedRepos(eco, doc);
  if (claimed.length === 0) {
    return { verdict: "REJECT", reason: "no repo in registry metadata" };
  }
  const govClaims = claimed.filter((ref) => allowedOrgs.has(ref.org));
  if (govClaims.length === 0) {
    const claims = [...new Set(claimed.map((r) => `${r.org}/${r.repo}`))];
    return {
      verdict: "REJECT",
      reason: `metadata points elsewhere: ${claims.join(", ")}`,
    };
  }

  let flagFallback: VerifyResult | null = null;
  for (const { org, repo } of govClaims) {
    const base = `https://raw.githubusercontent.com/${org}/${repo}/HEAD`;
    const declaredNames: string[] = [];

    const rootFiles =
      eco === "npm"
        ? ["package.json"]
        : ["pyproject.toml", "setup.py", "setup.cfg"];
    for (const file of rootFiles) {
      const text = await getText(fetchFn, `${base}/${file}`);
      if (text) declaredNames.push(...extractManifestNames(file, text));
    }
    if (declaredNames.some((n) => namesEqual(eco, n, name))) {
      return {
        verdict: "PASS",
        reason: `root manifest in ${org}/${repo}`,
        repo: `${org}/${repo}`,
      };
    }

    const readme = await getReadme(fetchFn, base);
    if (
      readme &&
      extractReadmeInstallNames(eco, readme).some((n) =>
        namesEqual(eco, n, name),
      )
    ) {
      return {
        verdict: "PASS",
        reason: `README install command in ${org}/${repo}`,
        repo: `${org}/${repo}`,
      };
    }

    const manifests = await listTreeManifests(fetchFn, org, repo, githubToken);
    for (const manifestPath of manifests) {
      const text = await getText(fetchFn, `${base}/${manifestPath}`);
      if (!text) continue;
      const names = extractManifestNames(manifestPath, text);
      if (names.some((n) => namesEqual(eco, n, name))) {
        return {
          verdict: "PASS",
          reason: `${manifestPath} in ${org}/${repo}`,
          repo: `${org}/${repo}`,
        };
      }
      declaredNames.push(...names);
    }

    if (
      eco === "npm" &&
      declaredNames.some((n) => scopeStrippedEqual(n, name))
    ) {
      const matches = [
        ...new Set(declaredNames.filter((n) => scopeStrippedEqual(n, name))),
      ];
      flagFallback ??= {
        verdict: "FLAG",
        reason: `scope mismatch: repo declares ${matches.join(", ")}, registry has ${name}`,
        repo: `${org}/${repo}`,
      };
    }
  }

  return (
    flagFallback ?? {
      verdict: "FLAG",
      reason: "no gov manifest or README declares this name",
    }
  );
}

async function getReadme(
  fetchFn: FetchFn,
  base: string,
): Promise<string | null> {
  for (const file of ["README.md", "readme.md", "README.rst"]) {
    const text = await getText(fetchFn, `${base}/${file}`);
    if (text) return text;
  }
  return null;
}

interface GitTreeResponse {
  tree?: { path: string }[];
}

async function listTreeManifests(
  fetchFn: FetchFn,
  org: string,
  repo: string,
  githubToken?: string,
): Promise<string[]> {
  const headers: Record<string, string> = { "User-Agent": USER_AGENT };
  if (githubToken) headers.Authorization = `Bearer ${githubToken}`;
  const url = `https://api.github.com/repos/${org}/${repo}/git/trees/HEAD?recursive=1`;
  const doc = (await getJson(fetchFn, url, headers)) as GitTreeResponse | null;
  return (doc?.tree ?? [])
    .map((entry) => entry.path)
    .filter((p) => MANIFEST_PATH.test(p) && !SKIP_DIRS.test(p))
    .slice(0, MAX_TREE_MANIFESTS);
}
