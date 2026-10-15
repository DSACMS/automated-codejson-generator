/**
 * Decides whether a candidate package is really published by the government
 * organization it points at.
 *
 * The repository field on npm and PyPI is self declared, so anyone can publish
 * a package that names a CMS repository as its source. Closing that hole takes
 * two checks in both directions: the package's registry metadata has to point
 * at an allowlisted organization, and a repository in that organization has to
 * declare the package name itself. A spoofer can do the first, but cannot
 * commit to a government repository to do the second.
 */

import {
  normalizePackageName,
  normalizePyPIName,
} from "../gov-dependencies.js";
import {
  FetchFn,
  USER_AGENT,
  getJson,
  getJsonResult,
  getText,
} from "./http.js";

export type { FetchFn };
export type Ecosystem = "npm" | "pypi";

/**
 * PASS is safe to add. REJECT is not ours, and is dropped silently. FLAG is
 * unresolved and goes in the report for a maintainer to judge, since the
 * interesting attacks land here rather than on an outright REJECT.
 */
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

// PyPI lets a project name its own URL keys, so only the ones that mean "this
// is where the source lives" count. A key like "Documentation" or a lab website
// says nothing about who publishes the package.
const PYPI_URL_KEYS = [
  "repository",
  "source",
  "source code",
  "code",
  "github",
  "homepage",
];

// Vendored and built copies of other people's manifests sit inside these, and
// matching against one would let any package name appear to be declared by a
// government repository.
const SKIP_DIRS =
  /(^|\/)(node_modules|vendor|vendored|third[-_]party|dist|build|\.git)\//;
const MANIFEST_PATH =
  /(^|\/)(package\.json|pyproject\.toml|setup\.py|setup\.cfg)$/;

// Caps the work spent on a large monorepo.
const MAX_TREE_MANIFESTS = 40;

/**
 * Pulls an org and repo out of the many shapes a repository field can take,
 * including git+ssh, the git protocol, the github: prefix, and bare org/repo.
 *
 * The match is anchored on the host so that lookalikes such as
 * github.com.example.com or example.com/github.com/cmsgov/x do not read as
 * GitHub, since every trust decision downstream keys off the org this returns.
 */
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

/** The repositories a registry document claims as its source, unverified. */
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

export function isPrivatePackageManifest(text: string): boolean {
  try {
    const parsed = JSON.parse(text) as { private?: unknown };
    return parsed.private === true;
  } catch {
    return false;
  }
}

/**
 * Reads package names out of install commands in a README.
 *
 * Some repositories never declare the published name in a checked in manifest,
 * because it is written at build time or the package lives in a subdirectory
 * this crawl misses. Their README almost always spells it out instead.
 */
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

/**
 * Runs the full check on one package name.
 *
 * The registry comes first: an unpublished name, or one whose metadata points
 * outside the allowlist, is rejected without any GitHub calls. After that the
 * claimed repo is searched for the name, in root manifests, then the README,
 * then nested manifests.
 *
 * Anything still unmatched comes back as FLAG rather than a guess either way.
 */
export async function verifyPackage(
  options: VerifyOptions,
): Promise<VerifyResult> {
  const { eco, name, allowedOrgs, githubToken } = options;
  const fetchFn = options.fetchFn ?? fetch;

  const registryUrl =
    eco === "npm"
      ? `https://registry.npmjs.org/${encodeURIComponent(name)}`
      : `https://pypi.org/pypi/${encodeURIComponent(name)}/json`;
  const registry = await getJsonResult(fetchFn, registryUrl);
  if (registry.status === "missing") {
    return {
      verdict: "REJECT",
      reason: "not published to the public registry",
    };
  }
  if (registry.status === "error") {
    return { verdict: "REJECT", reason: "registry lookup failed" };
  }
  const doc = registry.body;

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

    // A name that only matches once its scope is stripped is what a typosquat
    // looks like, but it can also be a legitimate republish under a different
    // scope, so flag it instead of rejecting. Held as a fallback so another
    // claimed repo can still PASS.
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

/**
 * Every manifest in the repo tree, for monorepos that keep their packages in
 * subdirectories. One API call covers the whole tree.
 */
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
