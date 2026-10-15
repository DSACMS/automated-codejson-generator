/**
 * Entry point for the updater. Discovery finds candidate package names,
 * verification decides which are genuinely government published, and codegen
 * writes the survivors into the data file.
 *
 * The scheduled workflow runs this and opens a pull request with whatever
 * changed, so every addition still gets a maintainer's review.
 */

import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadAllowlist } from "./allowlist.js";
import { loadCache, saveCache, Candidate } from "./cache.js";
import { addEntries, existingKeys } from "./codegen.js";
import { discoverFromGithub } from "./discovery-github.js";
import { discoverFromNpmOrgs } from "./discovery-npm-org.js";
import { getJson, USER_AGENT } from "./http.js";
import { planUpdate, renderReport, VerifyFn, ResolveUrlFn } from "./plan.js";
import {
  extractClaimedRepos,
  verifyPackage,
  parseGithubUrl,
} from "./verify.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(dirname, "..", "gov-dependencies.data.ts");
const ALLOWLIST_FILE = path.join(dirname, "allowlist.json");

export interface RunOptions {
  dataFile?: string;
  allowlistFile?: string;
  cacheFile?: string;
  reportFile?: string;
  orgs?: string[];
  npmOrgs?: string[];
  githubToken?: string;
  paceMs?: number;
  write?: boolean;
}

/**
 * Runs one update and returns the report. Every option has a default so tests
 * can point it at fixtures, and passing `write: false` gives a dry run.
 */
export async function run(options: RunOptions = {}): Promise<string> {
  const dataFile = options.dataFile ?? DATA_FILE;
  const githubToken = options.githubToken ?? process.env.GITHUB_TOKEN;
  const allowlist = loadAllowlist(options.allowlistFile ?? ALLOWLIST_FILE);
  const source = readFileSync(dataFile, "utf8");

  const orgs = options.orgs ?? Object.keys(allowlist.githubOrgs);
  const npmOrgs = options.npmOrgs ?? Object.keys(allowlist.npmOrgs);

  const cache = options.cacheFile
    ? loadCache(options.cacheFile)
    : { repos: {} };

  const log = (message: string) => console.log(message);
  const candidates: Candidate[] = [
    ...(await discoverFromGithub({
      orgs,
      cache,
      githubToken,
      paceMs: options.paceMs,
      onProgress: log,
    })),
    ...(await discoverFromNpmOrgs({ npmOrgs, onProgress: log })),
  ];

  const allowedOrgs = new Set(Object.keys(allowlist.githubOrgs));
  const verify: VerifyFn = ({ eco, name }) =>
    verifyPackage({ eco, name, allowedOrgs, githubToken });
  const resolveUrl: ResolveUrlFn = (candidate) =>
    resolveNpmRepoUrl(candidate.name);

  const plan = await planUpdate({
    candidates,
    existing: {
      npm: existingKeys(source, "npm"),
      pypi: existingKeys(source, "pypi"),
    },
    allowlist,
    verify,
    resolveUrl,
  });

  const report = renderReport(plan);

  if (options.write !== false && plan.additions.length) {
    writeFileSync(dataFile, addEntries(source, plan.additions));
  }
  if (options.cacheFile) saveCache(options.cacheFile, cache);
  if (options.reportFile) writeFileSync(options.reportFile, report + "\n");

  log(report);
  return report;
}

interface NpmDoc {
  repository?: string | { url?: string };
}

// Candidates from an npm org listing have no repo attached, so the repo URL has
// to come from the registry. Packages that name no repo at all fall back to
// their npm page, which is still somewhere a reader can go.
async function resolveNpmRepoUrl(name: string): Promise<string> {
  const doc = (await getJson(
    fetch,
    `https://registry.npmjs.org/${encodeURIComponent(name)}`,
    { "User-Agent": USER_AGENT },
  )) as NpmDoc | null;
  const repos = doc ? extractClaimedRepos("npm", doc) : [];
  if (repos.length) {
    return `https://github.com/${repos[0].org}/${repos[0].repo}`;
  }
  const raw =
    typeof doc?.repository === "string" ? doc.repository : doc?.repository?.url;
  const parsed = parseGithubUrl(raw);
  if (parsed) return `https://github.com/${parsed.org}/${parsed.repo}`;
  return `https://www.npmjs.com/package/${name}`;
}

// Imported by the tests and executed by the workflow, so the CLI half only runs
// when this file is the process entry point.
const invokedDirectly =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (invokedDirectly) {
  run({
    cacheFile: process.env.GOV_UPDATE_CACHE,
    reportFile: process.env.GOV_UPDATE_REPORT,
  }).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
