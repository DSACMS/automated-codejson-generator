export interface ReusedCodeEntry {
  name: string;
  URL: string;
}

// each dependency gets its own entry with the repository URL where the source code is hosted
export const USWDS: ReusedCodeEntry = {
  name: "U.S. Web Design System (USWDS)",
  URL: "https://github.com/uswds/uswds",
};

export const USWDS_COMPILE: ReusedCodeEntry = {
  name: "USWDS Compile",
  URL: "https://github.com/uswds/uswds-compile",
};

export const CMS_DESIGN_SYSTEM: ReusedCodeEntry = {
  name: "CMS Design System",
  URL: "https://github.com/CMSgov/design-system",
};

export const CMS_DS_HEALTHCARE_GOV: ReusedCodeEntry = {
  name: "CMS Design System - HealthCare.gov",
  URL: "https://github.com/CMSgov/design-system/tree/main/packages/ds-healthcare-gov",
};

export const CMS_DS_MEDICARE_GOV: ReusedCodeEntry = {
  name: "CMS Design System - Medicare.gov",
  URL: "https://github.com/CMSgov/design-system/tree/main/packages/ds-medicare-gov",
};

export const CMS_DS_CMS_GOV: ReusedCodeEntry = {
  name: "CMS Design System - CMS.gov",
  URL: "https://github.com/CMSgov/design-system/tree/main/packages/ds-cms-gov",
};

// keys are lowercased package names; each maps to its own unique entry
export const GOV_DEPENDENCIES: Record<string, ReusedCodeEntry> = {
  uswds: USWDS,
  "@uswds/uswds": USWDS,
  "@uswds/compile": USWDS_COMPILE,
  "@cmsgov/design-system": CMS_DESIGN_SYSTEM,
  "@cmsgov/ds-healthcare-gov": CMS_DS_HEALTHCARE_GOV,
  "@cmsgov/ds-medicare-gov": CMS_DS_MEDICARE_GOV,
  "@cmsgov/ds-cms-gov": CMS_DS_CMS_GOV,
};

// npm names are lowercase and Python names are case-insensitive, so lowercasing suffices to match
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
