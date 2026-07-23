import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

export interface Allowlist {
  githubOrgs: Record<string, string>;
  npmOrgs: Record<string, string>;
}

const dirname = path.dirname(fileURLToPath(import.meta.url));

export function loadAllowlist(
  filePath: string = path.join(dirname, "allowlist.json"),
): Allowlist {
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
