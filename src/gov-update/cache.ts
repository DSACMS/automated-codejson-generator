import { readFileSync, writeFileSync, mkdirSync } from "fs";
import path from "path";
import { Ecosystem } from "./verify.js";

/**
 * A package name found in a government organization, before any verification.
 *
 * `source` is where the name came from, and decides how a duplicate is broken
 * in plan.ts: an npm org listing beats a manifest, which beats a README.
 */
export interface Candidate {
  eco: Ecosystem;
  name: string;
  org: string;
  repo: string;
  source: "manifest" | "readme" | "npm-org";
  fork: boolean;
  archived: boolean;
}

/**
 * Discovery results for one repository, tagged with the pushedAt they were read
 * at. A matching pushedAt on the next run means nothing changed, so these
 * candidates get reused instead of refetched.
 */
export interface CachedRepo {
  pushedAt: string;
  candidates: Candidate[];
}

export interface UpdateCache {
  repos: Record<string, CachedRepo>;
}

export function emptyCache(): UpdateCache {
  return { repos: {} };
}

/**
 * Reads the cache file, returning an empty cache if it is missing or corrupt.
 * A bad cache file only costs a slower run, so it is never fatal.
 */
export function loadCache(filePath: string): UpdateCache {
  try {
    const parsed = JSON.parse(readFileSync(filePath, "utf8")) as UpdateCache;
    if (parsed && typeof parsed.repos === "object" && parsed.repos !== null) {
      return { repos: parsed.repos };
    }
  } catch {
    return emptyCache();
  }
  return emptyCache();
}

export function saveCache(filePath: string, cache: UpdateCache): void {
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, JSON.stringify(cache, null, 2) + "\n");
}
