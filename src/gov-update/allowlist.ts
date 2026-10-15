import { readFileSync } from "fs";

/**
 * The trust root for the whole updater. A package is only accepted if it traces
 * back to an organization listed here, and each organization maps to the agency
 * name that ends up in the data file.
 *
 * The README covers how organizations are vetted and how to add one. They are
 * only ever added by hand, through a reviewed pull request.
 */
export interface Allowlist {
  githubOrgs: Record<string, string>;
  npmOrgs: Record<string, string>;
}

/**
 * Keys are lowercased on load so lookups can ignore how an org is spelled.
 *
 * The caller passes the path rather than this module resolving one relative to
 * itself, which would need import.meta and cannot be compiled by the CommonJS
 * transform Jest applies. run.ts owns the default location.
 */
export function loadAllowlist(filePath: string): Allowlist {
  const parsed = JSON.parse(readFileSync(filePath, "utf8")) as Allowlist;
  return {
    githubOrgs: lowercaseKeys(parsed.githubOrgs),
    npmOrgs: lowercaseKeys(parsed.npmOrgs),
  };
}

function lowercaseKeys(map: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(map).map(([k, v]) => [k.toLowerCase(), v]),
  );
}
