/**
 * Lookup for the federal dependency list. The list itself sits in
 * gov-dependencies.data.ts so the updater can rewrite it without touching any
 * logic, and callers keep importing from here.
 */

import {
  ReusedCodeEntry,
  GOV_DEPENDENCIES,
  GOV_DEPENDENCIES_PYPI,
} from "./gov-dependencies.data.js";

export type { ReusedCodeEntry };
export { GOV_DEPENDENCIES, GOV_DEPENDENCIES_PYPI };
export {
  USWDS,
  USWDS_COMPILE,
  CMS_DESIGN_SYSTEM,
  CMS_DS_HEALTHCARE_GOV,
  CMS_DS_MEDICARE_GOV,
  CMS_DS_CMS_GOV,
} from "./gov-dependencies.data.js";

export function normalizePackageName(name: string): string {
  return name.trim().toLowerCase();
}

export function lookupGovDependency(name: string): ReusedCodeEntry | undefined {
  // hasOwn guard so names like "constructor"/"__proto__" don't match inherited members
  const key = normalizePackageName(name);
  return Object.hasOwn(GOV_DEPENDENCIES, key)
    ? GOV_DEPENDENCIES[key]
    : undefined;
}

// Normalize a PyPI name: lowercase, then collapse runs of -, _, . into a single -.
export function normalizePyPIName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[-_.]+/g, "-");
}

export function lookupPyPIGovDependency(
  name: string,
): ReusedCodeEntry | undefined {
  const key = normalizePyPIName(name);
  return Object.hasOwn(GOV_DEPENDENCIES_PYPI, key)
    ? GOV_DEPENDENCIES_PYPI[key]
    : undefined;
}
