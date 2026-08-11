/**
 * First stage of a run. Lists every public repository in the allowlisted
 * organizations and collects the package names those repositories declare or
 * document. Nothing collected here is trusted yet, verify.ts decides what is
 * eligible for the data file.
 */

import {
  Ecosystem,
  extractManifestNames,
  extractReadmeInstallNames,
  isPrivatePackageManifest,
} from "./verify.js";
import { Candidate, UpdateCache } from "./cache.js";
import {
  FetchFn,
  USER_AGENT,
  getJsonResult,
  getTextResult,
  sleep,
} from "./http.js";

export interface RepoInfo {
  name: string;
  pushedAt: string;
  fork: boolean;
  archived: boolean;
}

export interface OrgRepos {
  repos: RepoInfo[];
  complete: boolean;
}

export interface RepoDiscovery {
  candidates: Candidate[];
  failed: boolean;
}

interface GithubRepoResponse {
  name: string;
  pushed_at: string | null;
  fork: boolean;
  archived: boolean;
}

/**
 * Lists an organization's public repositories, paging until GitHub returns a
 * short page. `complete` is false when a page request failed, so callers can
 * warn rather than treat a partial list as the whole organization.
 */
export async function listOrgRepos(
  fetchFn: FetchFn,
  org: string,
  githubToken?: string,
): Promise<OrgRepos> {
  const headers: Record<string, string> = { "User-Agent": USER_AGENT };
  if (githubToken) headers.Authorization = `Bearer ${githubToken}`;
  const repos: RepoInfo[] = [];
  for (let page = 1; ; page++) {
    const url = `https://api.github.com/orgs/${org}/repos?type=public&per_page=100&page=${page}`;
    const result = await getJsonResult(fetchFn, url, headers);
    if (result.status === "error") return { repos, complete: false };
    const batch =
      result.status === "ok" ? (result.body as GithubRepoResponse[]) : null;
    if (!Array.isArray(batch)) break;
    for (const repo of batch) {
      repos.push({
        name: repo.name,
        pushedAt: repo.pushed_at ?? "",
        fork: repo.fork,
        archived: repo.archived,
      });
    }
    if (batch.length < 100) break;
  }
  return { repos, complete: true };
}

/**
 * Collects package names from a repository's root manifests and README. Files
 * are read from raw.githubusercontent.com, which needs no token and does not
 * count against the API rate limit.
 *
 * `failed` means a fetch errored out, and tells the caller not to cache this
 * repository. Caching it would record a network failure as "no packages here"
 * until someone pushes to the repository again.
 */
export async function discoverRepoCandidates(
  fetchFn: FetchFn,
  org: string,
  repo: RepoInfo,
): Promise<RepoDiscovery> {
  const base = `https://raw.githubusercontent.com/${org}/${repo.name}/HEAD`;
  const found = new Map<string, Candidate>();
  let failed = false;
  const add = (eco: Ecosystem, name: string, source: Candidate["source"]) => {
    const key = `${eco}|${name.toLowerCase()}`;
    if (!found.has(key)) {
      found.set(key, {
        eco,
        name,
        org,
        repo: repo.name,
        source,
        fork: repo.fork,
        archived: repo.archived,
      });
    }
  };

  const packageJson = await getTextResult(fetchFn, `${base}/package.json`);
  if (packageJson.status === "error") failed = true;
  else if (
    packageJson.status === "ok" &&
    !isPrivatePackageManifest(packageJson.body)
  ) {
    for (const name of extractManifestNames("package.json", packageJson.body)) {
      add("npm", name, "manifest");
    }
  }
  for (const file of ["pyproject.toml", "setup.py", "setup.cfg"]) {
    const text = await getTextResult(fetchFn, `${base}/${file}`);
    if (text.status === "error") failed = true;
    else if (text.status === "ok") {
      for (const name of extractManifestNames(file, text.body)) {
        add("pypi", name, "manifest");
      }
    }
  }

  // Only the first README that exists is read, the rest are naming variants.
  for (const file of ["README.md", "readme.md", "README.rst"]) {
    const readme = await getTextResult(fetchFn, `${base}/${file}`);
    if (readme.status === "error") failed = true;
    if (readme.status !== "ok") continue;
    for (const name of extractReadmeInstallNames("npm", readme.body)) {
      add("npm", name, "readme");
    }
    for (const name of extractReadmeInstallNames("pypi", readme.body)) {
      add("pypi", name, "readme");
    }
    break;
  }

  return { candidates: [...found.values()], failed };
}

export interface GithubDiscoveryOptions {
  orgs: string[];
  cache: UpdateCache;
  githubToken?: string;
  fetchFn?: FetchFn;
  paceMs?: number;
  onProgress?: (message: string) => void;
}

/**
 * Discovers candidates across every organization, skipping repositories the
 * cache shows as unchanged. The cache is updated in place as it goes.
 */
export async function discoverFromGithub(
  options: GithubDiscoveryOptions,
): Promise<Candidate[]> {
  const { orgs, cache, githubToken, onProgress } = options;
  const fetchFn = options.fetchFn ?? fetch;
  // A pause between repositories keeps a full sweep under the rate limits.
  const paceMs = options.paceMs ?? 150;
  const candidates: Candidate[] = [];

  for (const org of orgs) {
    const { repos, complete } = await listOrgRepos(fetchFn, org, githubToken);
    if (!complete) {
      onProgress?.(`${org}: WARNING repo list incomplete, some pages failed`);
    }
    onProgress?.(`${org}: ${repos.length} repos`);
    let reused = 0;
    for (const repo of repos) {
      const key = `${org}/${repo.name}`;
      const cached = cache.repos[key];
      if (cached && cached.pushedAt === repo.pushedAt) {
        candidates.push(...cached.candidates);
        reused++;
        continue;
      }
      const { candidates: repoCandidates, failed } =
        await discoverRepoCandidates(fetchFn, org, repo);
      if (!failed) {
        cache.repos[key] = {
          pushedAt: repo.pushedAt,
          candidates: repoCandidates,
        };
      }
      candidates.push(...repoCandidates);
      if (paceMs > 0) await sleep(paceMs);
    }
    onProgress?.(`${org}: done, ${reused}/${repos.length} from cache`);
  }

  return candidates;
}
