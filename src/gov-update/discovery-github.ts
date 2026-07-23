import {
  Ecosystem,
  extractManifestNames,
  extractReadmeInstallNames,
} from "./verify.js";
import { Candidate, UpdateCache } from "./cache.js";
import { FetchFn, USER_AGENT, getJson, getText, sleep } from "./http.js";

export interface RepoInfo {
  name: string;
  pushedAt: string;
  fork: boolean;
  archived: boolean;
}

interface GithubRepoResponse {
  name: string;
  pushed_at: string | null;
  fork: boolean;
  archived: boolean;
}

export async function listOrgRepos(
  fetchFn: FetchFn,
  org: string,
  githubToken?: string,
): Promise<RepoInfo[]> {
  const headers: Record<string, string> = { "User-Agent": USER_AGENT };
  if (githubToken) headers.Authorization = `Bearer ${githubToken}`;
  const repos: RepoInfo[] = [];
  for (let page = 1; ; page++) {
    const url = `https://api.github.com/orgs/${org}/repos?type=public&per_page=100&page=${page}`;
    const batch = (await getJson(fetchFn, url, headers)) as
      | GithubRepoResponse[]
      | null;
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
  return repos;
}

export async function discoverRepoCandidates(
  fetchFn: FetchFn,
  org: string,
  repo: RepoInfo,
): Promise<Candidate[]> {
  const base = `https://raw.githubusercontent.com/${org}/${repo.name}/HEAD`;
  const found = new Map<string, Candidate>();
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

  const packageJson = await getText(fetchFn, `${base}/package.json`);
  if (packageJson) {
    for (const name of extractManifestNames("package.json", packageJson)) {
      add("npm", name, "manifest");
    }
  }
  for (const file of ["pyproject.toml", "setup.py", "setup.cfg"]) {
    const text = await getText(fetchFn, `${base}/${file}`);
    if (!text) continue;
    for (const name of extractManifestNames(file, text)) {
      add("pypi", name, "manifest");
    }
  }

  for (const file of ["README.md", "readme.md", "README.rst"]) {
    const readme = await getText(fetchFn, `${base}/${file}`);
    if (!readme) continue;
    for (const name of extractReadmeInstallNames("npm", readme)) {
      add("npm", name, "readme");
    }
    for (const name of extractReadmeInstallNames("pypi", readme)) {
      add("pypi", name, "readme");
    }
    break;
  }

  return [...found.values()];
}

export interface GithubDiscoveryOptions {
  orgs: string[];
  cache: UpdateCache;
  githubToken?: string;
  fetchFn?: FetchFn;
  paceMs?: number;
  onProgress?: (message: string) => void;
}

export async function discoverFromGithub(
  options: GithubDiscoveryOptions,
): Promise<Candidate[]> {
  const { orgs, cache, githubToken, onProgress } = options;
  const fetchFn = options.fetchFn ?? fetch;
  const paceMs = options.paceMs ?? 150;
  const candidates: Candidate[] = [];

  for (const org of orgs) {
    const repos = await listOrgRepos(fetchFn, org, githubToken);
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
      const repoCandidates = await discoverRepoCandidates(fetchFn, org, repo);
      cache.repos[key] = {
        pushedAt: repo.pushedAt,
        candidates: repoCandidates,
      };
      candidates.push(...repoCandidates);
      if (paceMs > 0) await sleep(paceMs);
    }
    onProgress?.(`${org}: done, ${reused}/${repos.length} from cache`);
  }

  return candidates;
}
