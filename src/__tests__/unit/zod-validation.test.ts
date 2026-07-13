import validCodeJSON from "../fixtures/test-code.json";
import { CodeJSONSchema } from "../../types/CodeJSONSchema";
import { describe, it, expect } from "@jest/globals";

const createCodeJSON = (overrides: Record<string, unknown> = {}) => ({
  ...validCodeJSON,
  ...overrides,
});

// =============================================================================
// FIXTURE VALIDATION 
// =============================================================================
describe("CodeJSONSchema - fixture validation", () => {
  it("accepts the valid test fixture", () => {
    const result = CodeJSONSchema.safeParse(validCodeJSON);
    if (!result.success) {
      console.error("Validation errors:", JSON.stringify(result.error, null, 2));
    }
    expect(result.success).toBe(true);
  });

  it("returns typed data on successful parse", () => {
    const result = CodeJSONSchema.safeParse(validCodeJSON);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("automated-codejson-generator");
      expect(result.data.status).toBe("Production");
      expect(result.data.organization).toBe("Centers for Medicare & Medicaid Services");
    }
  });
});

// =============================================================================
// REQUIRED FIELDS 
// =============================================================================
describe("CodeJSONSchema - required fields", () => {
  it("rejects missing name", () => {
    const { name, ...rest } = validCodeJSON;
    const result = CodeJSONSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it("rejects missing description", () => {
    const { description, ...rest } = validCodeJSON;
    const result = CodeJSONSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it("rejects missing longDescription", () => {
    const { longDescription, ...rest } = validCodeJSON;
    const result = CodeJSONSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it("rejects missing status", () => {
    const { status, ...rest } = validCodeJSON;
    const result = CodeJSONSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it("rejects missing permissions", () => {
    const { permissions, ...rest } = validCodeJSON;
    const result = CodeJSONSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it("rejects missing organization", () => {
    const { organization, ...rest } = validCodeJSON;
    const result = CodeJSONSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it("rejects missing repositoryURL", () => {
    const { repositoryURL, ...rest } = validCodeJSON;
    const result = CodeJSONSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it("rejects missing feedbackMechanism", () => {
    const { feedbackMechanism, ...rest } = validCodeJSON;
    const result = CodeJSONSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it("rejects missing maturityModelTier", () => {
    const { maturityModelTier, ...rest } = validCodeJSON;
    const result = CodeJSONSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });
});

// =============================================================================
// ENUM VALIDATIONS
// =============================================================================
describe("CodeJSONSchema - status enum", () => {
  const validStatuses = [
    "Ideation",
    "Development",
    "Alpha",
    "Beta",
    "Release Candidate",
    "Production",
    "Archival",
  ];

  validStatuses.forEach((status) => {
    it(`accepts status: ${status}`, () => {
      const input = createCodeJSON({ status });
      const result = CodeJSONSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  it("rejects invalid status", () => {
    const input = createCodeJSON({ status: "InvalidStatus" });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

describe("CodeJSONSchema - repositoryHost enum", () => {
  const validHosts = [
    "github.com/CMSgov",
    "github.com/CMS-Enterprise",
    "github.com/Enterprise-CMCS",
    "github.com/DSACMS",
    "github.cms.gov",
    "CCSQ GitHub",
  ];

  validHosts.forEach((host) => {
    it(`accepts repositoryHost: ${host}`, () => {
      const input = createCodeJSON({ repositoryHost: host });
      const result = CodeJSONSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  it("rejects invalid repositoryHost", () => {
    const input = createCodeJSON({ repositoryHost: "github" });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

describe("CodeJSONSchema - repositoryVisibility enum", () => {
  it("accepts public visibility", () => {
    const input = createCodeJSON({ repositoryVisibility: "public" });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts private visibility", () => {
    const input = createCodeJSON({ repositoryVisibility: "private" });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects invalid visibility", () => {
    const input = createCodeJSON({ repositoryVisibility: "hidden" });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

describe("CodeJSONSchema - vcs enum", () => {
  const validVcs = ["git", "hg", "svn", "rcs", "bzr", "none"];

  validVcs.forEach((vcs) => {
    it(`accepts vcs: ${vcs}`, () => {
      const input = createCodeJSON({ vcs });
      const result = CodeJSONSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  it("rejects invalid vcs", () => {
    const input = createCodeJSON({ vcs: "perforce" });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

describe("CodeJSONSchema - softwareType enum", () => {
  const validTypes = [
    "standalone/mobile",
    "standalone/iot",
    "standalone/desktop",
    "standalone/web",
    "standalone/backend",
    "standalone/other",
    "addon",
    "library",
    "configurationFiles",
  ];

  validTypes.forEach((type) => {
    it(`accepts softwareType: ${type}`, () => {
      const input = createCodeJSON({ softwareType: type });
      const result = CodeJSONSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  it("rejects invalid softwareType", () => {
    const input = createCodeJSON({ softwareType: "tool" });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

describe("CodeJSONSchema - maintenance enum", () => {
  const validMaintenance = ["internal", "contract", "community", "none"];

  validMaintenance.forEach((maintenance) => {
    it(`accepts maintenance: ${maintenance}`, () => {
      const input = createCodeJSON({ maintenance });
      const result = CodeJSONSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  it("rejects invalid maintenance", () => {
    const input = createCodeJSON({ maintenance: "active" });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

describe("CodeJSONSchema - repositoryType enum", () => {
  const validTypes = [
    "package",
    "website",
    "standards",
    "libraries",
    "data",
    "application",
    "tools",
    "APIs",
  ];

  validTypes.forEach((type) => {
    it(`accepts repositoryType: ${type}`, () => {
      const input = createCodeJSON({ repositoryType: type });
      const result = CodeJSONSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  it("rejects invalid repositoryType", () => {
    const input = createCodeJSON({ repositoryType: "source" });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

describe("CodeJSONSchema - fismaLevel enum", () => {
  const validLevels = ["low", "moderate", "high"];

  validLevels.forEach((level) => {
    it(`accepts fismaLevel: ${level}`, () => {
      const input = createCodeJSON({ fismaLevel: level });
      const result = CodeJSONSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  it("rejects invalid fismaLevel", () => {
    const input = createCodeJSON({ fismaLevel: "critical" });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

describe("CodeJSONSchema - maturityModelTier enum", () => {
  [0, 1, 2, 3, 4].forEach((tier) => {
    it(`accepts maturityModelTier: ${tier}`, () => {
      const input = createCodeJSON({ maturityModelTier: tier });
      const result = CodeJSONSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  it("rejects invalid maturityModelTier", () => {
    const input = createCodeJSON({ maturityModelTier: 5 });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects negative maturityModelTier", () => {
    const input = createCodeJSON({ maturityModelTier: -1 });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// =============================================================================
// PLATFORMS ENUM ARRAY
// =============================================================================
describe("CodeJSONSchema - platforms enum array", () => {
  const validPlatforms = ["web", "windows", "mac", "linux", "ios", "android", "other"];

  it("accepts all valid platform values", () => {
    const input = createCodeJSON({ platforms: validPlatforms });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects invalid platform value", () => {
    const input = createCodeJSON({ platforms: ["github-actions"] });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects duplicate platforms", () => {
    const input = createCodeJSON({ platforms: ["web", "web"] });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// =============================================================================
// SUBSET IN HEALTHCARE ENUM ARRAY
// =============================================================================
describe("CodeJSONSchema - subsetInHealthcare enum array", () => {
  const validSubsets = ["policy", "operational", "medicare", "medicaid"];

  it("accepts all valid subset values", () => {
    const input = createCodeJSON({ subsetInHealthcare: validSubsets });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts single subset value", () => {
    const input = createCodeJSON({ subsetInHealthcare: ["medicare"] });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects invalid subset value", () => {
    const input = createCodeJSON({ subsetInHealthcare: ["invalid"] });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects duplicate subsets", () => {
    const input = createCodeJSON({ subsetInHealthcare: ["medicare", "medicare"] });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// =============================================================================
// USER TYPE ENUM ARRAY
// =============================================================================
describe("CodeJSONSchema - userType enum array", () => {
  const validUserTypes = ["providers", "patients", "government"];

  it("accepts all valid userType values", () => {
    const input = createCodeJSON({ userType: validUserTypes });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects invalid userType value", () => {
    const input = createCodeJSON({ userType: ["developer"] });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects duplicate userTypes", () => {
    const input = createCodeJSON({ userType: ["providers", "providers"] });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// =============================================================================
// LICENSE NAME ENUM
// =============================================================================
describe("CodeJSONSchema - license name enum", () => {
  const validLicenses = [
    "CC0-1.0",
    "Apache-2.0",
    "MIT",
    "MPL-2.0",
    "GPL-2.0-only",
    "GPL-3.0-only",
    "GPL-3.0-or-later",
    "LGPL-2.1-only",
    "LGPL-3.0-only",
    "BSD-2-Clause",
    "BSD-3-Clause",
    "EPL-2.0",
    "Other",
    "None",
  ];

  validLicenses.forEach((license) => {
    it(`accepts license name: ${license}`, () => {
      const input = createCodeJSON({
        permissions: {
          licenses: [
            {
              name: license,
              URL: "https://opensource.org/licenses/MIT",
            },
          ],
          usageType: ["openSource"],
          exemptionText: null,
        },
      });
      const result = CodeJSONSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  it("rejects invalid license name", () => {
    const input = createCodeJSON({
      permissions: {
        licenses: [
          {
            name: "CC0 1.0 Universal",
            URL: "https://creativecommons.org/publicdomain/zero/1.0/",
          },
        ],
        usageType: ["openSource"],
        exemptionText: null,
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// =============================================================================
// USAGE TYPE ENUM
// =============================================================================
describe("CodeJSONSchema - usageType enum", () => {
  const validUsageTypes = [
    "openSource",
    "governmentWideReuse",
    "exemptByNationalSecurity",
    "exemptByNationalIntelligence",
    "exemptByFOIA",
    "exemptByEAR",
    "exemptByITAR",
    "exemptByTSA",
    "exemptByClassifiedInformation",
    "exemptByPrivacyRisk",
    "exemptByIPRestriction",
    "exemptByAgencySystem",
    "exemptByAgencyMission",
    "exemptByCIO",
    "exemptByPolicyDate",
  ];

  it("accepts openSource without exemptionText", () => {
    const input = createCodeJSON({
      permissions: {
        licenses: [{ name: "MIT", URL: "https://opensource.org/licenses/MIT" }],
        usageType: ["openSource"],
        exemptionText: null,
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts governmentWideReuse without exemptionText", () => {
    const input = createCodeJSON({
      permissions: {
        licenses: [{ name: "MIT", URL: "https://opensource.org/licenses/MIT" }],
        usageType: ["governmentWideReuse"],
        exemptionText: null,
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  // Test each exemption type requires exemptionText
  const exemptionTypes = validUsageTypes.filter((t) => t.startsWith("exemptBy"));
  exemptionTypes.forEach((exemption) => {
    it(`requires exemptionText for ${exemption}`, () => {
      const input = createCodeJSON({
        permissions: {
          licenses: [{ name: "MIT", URL: "https://opensource.org/licenses/MIT" }],
          usageType: [exemption],
          exemptionText: null,
        },
      });
      const result = CodeJSONSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it(`accepts ${exemption} with valid exemptionText`, () => {
      const input = createCodeJSON({
        permissions: {
          licenses: [{ name: "MIT", URL: "https://opensource.org/licenses/MIT" }],
          usageType: [exemption],
          exemptionText: "Valid exemption justification text",
        },
      });
      const result = CodeJSONSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  it("rejects invalid usageType", () => {
    const input = createCodeJSON({
      permissions: {
        licenses: [{ name: "MIT", URL: "https://opensource.org/licenses/MIT" }],
        usageType: ["invalidType"],
        exemptionText: null,
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// =============================================================================
// ORGANIZATION LITERAL
// =============================================================================
describe("CodeJSONSchema - organization literal", () => {
  it("accepts exact organization value", () => {
    const input = createCodeJSON({
      organization: "Centers for Medicare & Medicaid Services",
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects incorrect organization", () => {
    const input = createCodeJSON({ organization: "DSACMS" });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects similar but incorrect organization", () => {
    const input = createCodeJSON({ organization: "CMS" });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// =============================================================================
// LONG DESCRIPTION LENGTH VALIDATION
// =============================================================================
describe("CodeJSONSchema - longDescription length", () => {
  it("rejects longDescription under 150 characters", () => {
    const input = createCodeJSON({ longDescription: "Too short" });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("accepts longDescription at exactly 150 characters", () => {
    const input = createCodeJSON({ longDescription: "a".repeat(150) });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts longDescription at 10000 characters", () => {
    const input = createCodeJSON({ longDescription: "a".repeat(10000) });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects longDescription over 10000 characters", () => {
    const input = createCodeJSON({ longDescription: "a".repeat(10001) });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// =============================================================================
// URL VALIDATIONS
// =============================================================================
describe("CodeJSONSchema - URL validations", () => {
  it("accepts valid repositoryURL", () => {
    const input = createCodeJSON({
      repositoryURL: "https://github.com/DSACMS/repo",
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects invalid repositoryURL", () => {
    const input = createCodeJSON({ repositoryURL: "not-a-url" });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("accepts valid feedbackMechanism URL", () => {
    const input = createCodeJSON({
      feedbackMechanism: "https://github.com/org/repo/issues",
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects invalid feedbackMechanism URL", () => {
    const input = createCodeJSON({ feedbackMechanism: "not-a-url" });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("accepts valid homepageURL", () => {
    const input = createCodeJSON({ homepageURL: "https://example.com" });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects invalid homepageURL", () => {
    const input = createCodeJSON({ homepageURL: "not-a-url" });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("accepts valid downloadURL", () => {
    const input = createCodeJSON({
      downloadURL: "https://github.com/org/repo/releases",
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts valid disclaimerURL", () => {
    const input = createCodeJSON({
      disclaimerURL: "https://example.com/disclaimer",
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });
});

// =============================================================================
// NUMERIC VALIDATIONS
// =============================================================================
describe("CodeJSONSchema - numeric validations", () => {
  it("accepts zero laborHours", () => {
    const input = createCodeJSON({ laborHours: 0 });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts positive laborHours", () => {
    const input = createCodeJSON({ laborHours: 10000 });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects negative laborHours", () => {
    const input = createCodeJSON({ laborHours: -100 });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// =============================================================================
// BOOLEAN FIELDS
// =============================================================================
describe("CodeJSONSchema - boolean fields", () => {
  it("accepts localisation true", () => {
    const input = createCodeJSON({ localisation: true });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts localisation false", () => {
    const input = createCodeJSON({ localisation: false });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts userInput true", () => {
    const input = createCodeJSON({ userInput: true });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts userInput false", () => {
    const input = createCodeJSON({ userInput: false });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });
});

// =============================================================================
// STRICT MODE - Extra properties rejected
// =============================================================================
describe("CodeJSONSchema - strict mode", () => {
  it("rejects unknown top-level properties", () => {
    const input = createCodeJSON({ unknownField: "value" });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects unknown properties in permissions", () => {
    const input = createCodeJSON({
      permissions: {
        ...validCodeJSON.permissions,
        unknownField: "value",
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects unknown properties in date", () => {
    const input = createCodeJSON({
      date: {
        ...validCodeJSON.date,
        unknownField: "value",
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects unknown properties in contact", () => {
    const input = createCodeJSON({
      contact: {
        ...validCodeJSON.contact,
        unknownField: "value",
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// =============================================================================
// OPTIONAL FIELDS
// =============================================================================
describe("CodeJSONSchema - optional fields", () => {
  it("accepts missing version", () => {
    const { version, ...rest } = validCodeJSON;
    const input = { ...rest };
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts missing homepageURL", () => {
    const { homepageURL, ...rest } = validCodeJSON as any;
    const result = CodeJSONSchema.safeParse(rest);
    expect(result.success).toBe(true);
  });

  it("accepts missing downloadURL", () => {
    const { downloadURL, ...rest } = validCodeJSON as any;
    const result = CodeJSONSchema.safeParse(rest);
    expect(result.success).toBe(true);
  });

  it("accepts missing relatedCode", () => {
    const { relatedCode, ...rest } = validCodeJSON as any;
    const result = CodeJSONSchema.safeParse(rest);
    expect(result.success).toBe(true);
  });

  it("accepts missing reusedCode", () => {
    const { reusedCode, ...rest } = validCodeJSON as any;
    const result = CodeJSONSchema.safeParse(rest);
    expect(result.success).toBe(true);
  });

  it("accepts missing partners", () => {
    const { partners, ...rest } = validCodeJSON as any;
    const result = CodeJSONSchema.safeParse(rest);
    expect(result.success).toBe(true);
  });

  it("accepts missing systems", () => {
    const { systems, ...rest } = validCodeJSON;
    const result = CodeJSONSchema.safeParse(rest);
    expect(result.success).toBe(true);
  });
});

// =============================================================================
// LICENSES VALIDATION (through permissions)
// =============================================================================
describe("CodeJSONSchema - licenses validation", () => {
  it("accepts valid license with name and URL", () => {
    const input = createCodeJSON({
      permissions: {
        licenses: [
          {
            name: "MIT",
            URL: "https://opensource.org/licenses/MIT",
          },
        ],
        usageType: ["openSource"],
        exemptionText: null,
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts multiple licenses", () => {
    const input = createCodeJSON({
      permissions: {
        licenses: [
          {
            name: "MIT",
            URL: "https://opensource.org/licenses/MIT",
          },
          {
            name: "Apache-2.0",
            URL: "https://www.apache.org/licenses/LICENSE-2.0",
          },
        ],
        usageType: ["openSource"],
        exemptionText: null,
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects invalid license URL", () => {
    const input = createCodeJSON({
      permissions: {
        licenses: [
          {
            name: "MIT",
            URL: "not-a-url",
          },
        ],
        usageType: ["openSource"],
        exemptionText: null,
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// =============================================================================
// PERMISSIONS - exemptionText conditional logic
// =============================================================================
describe("CodeJSONSchema - permissions exemptionText logic", () => {
  it("accepts openSource usageType with null exemptionText", () => {
    const input = createCodeJSON({
      permissions: {
        licenses: [{ name: "MIT", URL: "https://opensource.org/licenses/MIT" }],
        usageType: ["openSource"],
        exemptionText: null,
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts exemption usageType with valid exemptionText", () => {
    const input = createCodeJSON({
      permissions: {
        licenses: [{ name: "MIT", URL: "https://opensource.org/licenses/MIT" }],
        usageType: ["exemptByFOIA"],
        exemptionText: "Exempted because of FOIA status",
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects exemption usageType with empty exemptionText", () => {
    const input = createCodeJSON({
      permissions: {
        licenses: [{ name: "MIT", URL: "https://opensource.org/licenses/MIT" }],
        usageType: ["exemptByFOIA"],
        exemptionText: "",
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects exemption usageType with null exemptionText", () => {
    const input = createCodeJSON({
      permissions: {
        licenses: [{ name: "MIT", URL: "https://opensource.org/licenses/MIT" }],
        usageType: ["exemptByNationalSecurity"],
        exemptionText: null,
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("accepts multiple usageTypes including exemption with valid exemptionText", () => {
    const input = createCodeJSON({
      permissions: {
        licenses: [{ name: "MIT", URL: "https://opensource.org/licenses/MIT" }],
        usageType: ["openSource", "exemptByPrivacyRisk"],
        exemptionText: "Contains PII that cannot be shared",
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects whitespace-only exemptionText for exemption usageType", () => {
    const input = createCodeJSON({
      permissions: {
        licenses: [{ name: "MIT", URL: "https://opensource.org/licenses/MIT" }],
        usageType: ["exemptByAgencyMission"],
        exemptionText: "   ",
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// =============================================================================
// CONTACT VALIDATION
// =============================================================================
describe("CodeJSONSchema - contact validation", () => {
  it("accepts valid contact with email and name", () => {
    const input = createCodeJSON({
      contact: {
        email: "opensource@cms.hhs.gov",
        name: "CMS Open Source Team",
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects invalid email format", () => {
    const input = createCodeJSON({
      contact: {
        email: "not-an-email",
        name: "CMS Open Source Team",
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("accepts contact with only email", () => {
    const input = createCodeJSON({
      contact: {
        email: "opensource@cms.hhs.gov",
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts contact with only name", () => {
    const input = createCodeJSON({
      contact: {
        name: "CMS Open Source Team",
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts empty contact object", () => {
    const input = createCodeJSON({
      contact: {},
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });
});

// =============================================================================
// DATE VALIDATION
// =============================================================================
describe("CodeJSONSchema - date validation", () => {
  it("accepts valid ISO datetime strings", () => {
    const input = createCodeJSON({
      date: {
        created: "2024-01-15T00:00:00Z",
        lastModified: "2024-06-20T12:30:00Z",
        metadataLastUpdated: "2024-06-21T08:00:00Z",
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts date with only created field", () => {
    const input = createCodeJSON({
      date: {
        created: "2024-01-15T00:00:00Z",
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts empty date object", () => {
    const input = createCodeJSON({
      date: {},
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects invalid datetime format", () => {
    const input = createCodeJSON({
      date: {
        created: "not-a-date",
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects date-only format (requires datetime)", () => {
    const input = createCodeJSON({
      date: {
        created: "2024-01-15",
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("accepts datetime with timezone offset", () => {
    const input = createCodeJSON({
      date: {
        created: "2024-01-15T00:00:00+05:00",
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });
});

// =============================================================================
// REUSE FREQUENCY VALIDATION
// =============================================================================
describe("CodeJSONSchema - reuseFrequency validation", () => {
  it("accepts valid forks and clones", () => {
    const input = createCodeJSON({
      reuseFrequency: {
        forks: 25,
        clones: 150,
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts forks without clones", () => {
    const input = createCodeJSON({
      reuseFrequency: {
        forks: 25,
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts zero values", () => {
    const input = createCodeJSON({
      reuseFrequency: {
        forks: 0,
        clones: 0,
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects negative forks", () => {
    const input = createCodeJSON({
      reuseFrequency: {
        forks: -5,
        clones: 150,
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects negative clones", () => {
    const input = createCodeJSON({
      reuseFrequency: {
        forks: 5,
        clones: -150,
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("accepts empty reuseFrequency object", () => {
    const input = createCodeJSON({
      reuseFrequency: {},
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts additional properties in reuseFrequency (catchall)", () => {
    const input = createCodeJSON({
      reuseFrequency: {
        forks: 25,
        clones: 150,
        downloads: 1000,
      },
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });
});

// =============================================================================
// RELATED CODE VALIDATION
// =============================================================================
describe("CodeJSONSchema - relatedCode validation", () => {
  it("accepts valid relatedCode array", () => {
    const input = createCodeJSON({
      relatedCode: [
        {
          name: "gov-codejson",
          URL: "https://github.com/DSACMS/gov-codejson",
          isGovernmentRepo: true,
        },
      ],
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts relatedCode with partial fields", () => {
    const input = createCodeJSON({
      relatedCode: [
        {
          name: "gov-codejson",
        },
      ],
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts empty relatedCode object", () => {
    const input = createCodeJSON({
      relatedCode: [{}],
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects invalid URL in relatedCode", () => {
    const input = createCodeJSON({
      relatedCode: [
        {
          name: "gov-codejson",
          URL: "not-a-valid-url",
          isGovernmentRepo: true,
        },
      ],
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects unknown properties in relatedCode (strict)", () => {
    const input = createCodeJSON({
      relatedCode: [
        {
          name: "gov-codejson",
          unknownField: "value",
        },
      ],
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// =============================================================================
// REUSED CODE VALIDATION
// =============================================================================
describe("CodeJSONSchema - reusedCode validation", () => {
  it("accepts valid reusedCode array", () => {
    const input = createCodeJSON({
      reusedCode: [
        {
          name: "octokit",
          URL: "https://github.com/octokit/octokit.js",
        },
      ],
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts reusedCode with only name", () => {
    const input = createCodeJSON({
      reusedCode: [
        {
          name: "octokit",
        },
      ],
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects invalid URL in reusedCode", () => {
    const input = createCodeJSON({
      reusedCode: [
        {
          name: "octokit",
          URL: "not-a-url",
        },
      ],
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// =============================================================================
// PARTNERS VALIDATION
// =============================================================================
describe("CodeJSONSchema - partners validation", () => {
  it("accepts valid partners array", () => {
    const input = createCodeJSON({
      partners: [
        {
          name: "CMS Digital Service",
          email: "digitalservice@cms.hhs.gov",
        },
      ],
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts partners with only name", () => {
    const input = createCodeJSON({
      partners: [
        {
          name: "CMS Digital Service",
        },
      ],
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts empty partners array", () => {
    const input = createCodeJSON({
      partners: [],
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });
});

// =============================================================================
// UNIQUE ARRAYS VALIDATION
// =============================================================================
describe("CodeJSONSchema - unique array validation", () => {
  it("accepts unique languages", () => {
    const input = createCodeJSON({
      languages: ["TypeScript", "JavaScript", "Python"],
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects duplicate languages", () => {
    const input = createCodeJSON({
      languages: ["TypeScript", "JavaScript", "TypeScript"],
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("accepts unique tags", () => {
    const input = createCodeJSON({
      tags: ["healthcare", "government", "open-source"],
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects duplicate tags", () => {
    const input = createCodeJSON({
      tags: ["healthcare", "government", "healthcare"],
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("accepts unique contractNumbers", () => {
    const input = createCodeJSON({
      contractNumber: ["CONTRACT-001", "CONTRACT-002"],
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects duplicate contractNumbers", () => {
    const input = createCodeJSON({
      contractNumber: ["CONTRACT-001", "CONTRACT-001"],
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("accepts unique categories", () => {
    const input = createCodeJSON({
      categories: ["compliance", "automation", "healthcare"],
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects duplicate categories", () => {
    const input = createCodeJSON({
      categories: ["compliance", "compliance"],
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("accepts unique projects", () => {
    const input = createCodeJSON({
      projects: ["ProjectA", "ProjectB"],
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects duplicate projects", () => {
    const input = createCodeJSON({
      projects: ["ProjectA", "ProjectA"],
    });
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});