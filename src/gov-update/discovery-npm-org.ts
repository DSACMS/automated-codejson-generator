import { Candidate } from "./cache.js";
import { FetchFn, getJson } from "./http.js";

/**
 * Lists the packages published under an npm organization. Returns null when the
 * registry will not serve the listing, which it does for organizations that
 * have gone private or been renamed.
 */
export async function listNpmOrgPackages(
  fetchFn: FetchFn,
  npmOrg: string,
): Promise<string[] | null> {
  const url = `https://registry.npmjs.org/-/org/${encodeURIComponent(npmOrg)}/package`;
  const doc = await getJson(fetchFn, url);
  if (!doc || typeof doc !== "object" || Array.isArray(doc)) return null;
  return Object.keys(doc);
}

export interface NpmOrgDiscoveryOptions {
  npmOrgs: string[];
  fetchFn?: FetchFn;
  onProgress?: (message: string) => void;
}

/**
 * Turns the allowlisted npm organizations into candidates. Publishing under an
 * npm scope requires membership in it, so these skip repository verification
 * later on and carry no repo of their own.
 */
export async function discoverFromNpmOrgs(
  options: NpmOrgDiscoveryOptions,
): Promise<Candidate[]> {
  const { npmOrgs, onProgress } = options;
  const fetchFn = options.fetchFn ?? fetch;
  const candidates: Candidate[] = [];
  for (const npmOrg of npmOrgs) {
    const packages = await listNpmOrgPackages(fetchFn, npmOrg);
    if (packages === null) {
      onProgress?.(`npm org ${npmOrg}: listing unavailable, skipped`);
      continue;
    }
    onProgress?.(`npm org ${npmOrg}: ${packages.length} packages`);
    for (const name of packages) {
      candidates.push({
        eco: "npm",
        name,
        org: npmOrg,
        repo: "",
        source: "npm-org",
        fork: false,
        archived: false,
      });
    }
  }
  return candidates;
}
