/**
 * Turns verified candidates into a set of changes for the data file. Nothing is
 * written here, so a run can produce its report without touching the repo.
 */

import {
  normalizePackageName,
  normalizePyPIName,
} from "../gov-dependencies.js";
import { Allowlist } from "./allowlist.js";
import { Candidate } from "./cache.js";
import { DataFileEntry } from "./codegen.js";
import { Ecosystem, VerifyResult } from "./verify.js";

export interface FlaggedCandidate {
  eco: Ecosystem;
  name: string;
  org: string;
  repo: string;
  reason: string;
}

export interface UpdatePlan {
  additions: DataFileEntry[];
  flagged: FlaggedCandidate[];
  rejected: number;
  skippedExisting: number;
}

export type VerifyFn = (input: {
  eco: Ecosystem;
  name: string;
}) => Promise<VerifyResult>;

export type ResolveUrlFn = (candidate: Candidate) => Promise<string>;

export interface PlanOptions {
  candidates: Candidate[];
  existing: Record<Ecosystem, Set<string>>;
  allowlist: Allowlist;
  verify: VerifyFn;
  resolveUrl: ResolveUrlFn;
}

// The same package usually turns up more than once. Lower rank wins: npm org
// membership is the strongest signal, a manifest is a direct declaration, and a
// README install line is the weakest since it may be describing someone else's
// package.
const SOURCE_RANK: Record<Candidate["source"], number> = {
  "npm-org": 0,
  manifest: 1,
  readme: 2,
};

export function normalizeKey(eco: Ecosystem, name: string): string {
  return eco === "npm" ? normalizePackageName(name) : normalizePyPIName(name);
}

function dedupe(candidates: Candidate[]): Candidate[] {
  const best = new Map<string, Candidate>();
  for (const candidate of candidates) {
    const key = `${candidate.eco}|${normalizeKey(candidate.eco, candidate.name)}`;
    const current = best.get(key);
    if (
      !current ||
      SOURCE_RANK[candidate.source] < SOURCE_RANK[current.source]
    ) {
      best.set(key, candidate);
    }
  }
  return [...best.values()];
}

// Matches the "package (Agency Name)" format already used in the data file.
function displayName(name: string, agency: string): string {
  return `${name.replace(/^@[^/]+\//, "")} (${agency})`;
}

function agencyForRepo(allowlist: Allowlist, repo: string): string | undefined {
  const org = repo.split("/")[0]?.toLowerCase();
  return org ? allowlist.githubOrgs[org] : undefined;
}

/**
 * Decides what each candidate becomes: an addition, a flag for review, or a
 * rejection. Existing entries are skipped, so the plan only ever adds. Removing
 * a package stays a manual call, since a package can drop off discovery for
 * reasons that have nothing to do with it going away.
 */
export async function planUpdate(options: PlanOptions): Promise<UpdatePlan> {
  const { existing, allowlist, verify, resolveUrl } = options;
  const plan: UpdatePlan = {
    additions: [],
    flagged: [],
    rejected: 0,
    skippedExisting: 0,
  };

  for (const candidate of dedupe(options.candidates)) {
    const key = normalizeKey(candidate.eco, candidate.name);
    if (existing[candidate.eco].has(key)) {
      plan.skippedExisting++;
      continue;
    }

    // Packages from an allowlisted npm org skip verification. The registry only
    // lists a package under an org when that org holds write access to it, so
    // npm has already established the ownership verifyPackage spends several
    // requests on. This covers unscoped names too, which are most of some orgs.
    if (candidate.source === "npm-org") {
      const agency = allowlist.npmOrgs[candidate.org.toLowerCase()];
      if (!agency) {
        plan.flagged.push({
          eco: candidate.eco,
          name: candidate.name,
          org: candidate.org,
          repo: candidate.repo,
          reason: "npm org not in allowlist",
        });
        continue;
      }
      plan.additions.push({
        eco: candidate.eco,
        key,
        displayName: displayName(candidate.name, agency),
        url: await resolveUrl(candidate),
      });
      continue;
    }

    const result = await verify({ eco: candidate.eco, name: candidate.name });
    if (result.verdict === "PASS" && result.repo) {
      const agency =
        agencyForRepo(allowlist, result.repo) ??
        allowlist.githubOrgs[candidate.org.toLowerCase()] ??
        candidate.org;
      plan.additions.push({
        eco: candidate.eco,
        key,
        displayName: displayName(candidate.name, agency),
        url: `https://github.com/${result.repo}`,
      });
    } else if (result.verdict === "FLAG") {
      plan.flagged.push({
        eco: candidate.eco,
        name: candidate.name,
        org: candidate.org,
        repo: candidate.repo,
        reason: result.reason,
      });
    } else {
      plan.rejected++;
    }
  }

  plan.additions.sort((a, b) =>
    a.eco === b.eco ? a.key.localeCompare(b.key) : a.eco.localeCompare(b.eco),
  );
  return plan;
}

/** Markdown for the pull request body and the run log. */
export function renderReport(plan: UpdatePlan): string {
  const lines: string[] = [];
  lines.push(
    `Discovered ${plan.additions.length} new verified package(s), ${plan.flagged.length} flagged for review.`,
  );
  lines.push("");
  if (plan.additions.length) {
    lines.push("## Verified additions");
    for (const entry of plan.additions) {
      lines.push(`- \`${entry.eco}\` ${entry.key} — ${entry.url}`);
    }
    lines.push("");
  }
  if (plan.flagged.length) {
    lines.push("## Flagged for manual review");
    for (const flag of plan.flagged) {
      const where = flag.repo ? ` (${flag.repo})` : "";
      lines.push(`- \`${flag.eco}\` ${flag.name}${where}: ${flag.reason}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}
