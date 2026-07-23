import { readFileSync, writeFileSync, mkdirSync } from "fs";
import path from "path";
import { Ecosystem } from "./verify.js";

export interface Candidate {
  eco: Ecosystem;
  name: string;
  org: string;
  repo: string;
  source: "manifest" | "readme" | "npm-org";
  fork: boolean;
  archived: boolean;
}

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
