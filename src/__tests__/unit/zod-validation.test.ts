import validCodeJSON from "../fixtures/test-code.json";
import { describe, it, expect } from "@jest/globals";
import {
  LicenseSchema,
  PermissionsSchema,
  ContactSchema,
  DateSchema,
  ReuseFrequencySchema,
  RelatedCodeSchema,
  ReusedCodeSchema,
  PartnerSchema,
  CodeJSONSchema,
} from "../../zod-validation.js";

// LICENSE
describe("LicenseSchema", () => {
  it("accepts valid license with name and URL", () => {
    const input = {
      name: "CC0 1.0 Universal",
      URL: "https://creativecommons.org/publicdomain/zero/1.0/",
    };
    const result = LicenseSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const input = {
      name: "",
      URL: "https://creativecommons.org/publicdomain/zero/1.0/",
    };
    const result = LicenseSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects invalid URL", () => {
    const input = {
      name: "CC0 1.0 Universal",
      URL: "not-an-actual-url-",
    };
    const result = LicenseSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// PERMISSIONS
describe("PermissionsSchema", () => {
  it("accepts 1 valid license and usageType and exemptionText", () => {
    const input = {
      licenses: [
        {
          name: "CC0 1.0 Universal",
          URL: "https://creativecommons.org/publicdomain/zero/1.0/",
        },
      ],
      usageType: ["exemptByFOIA"],
      exemptionText: "Exempted because of FOIA status",
    };
    const result = PermissionsSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts 1 valid license and an empty usageType and exemptionText", () => {
    const input = {
      licenses: [
        {
          name: "CC0 1.0 Universal",
          URL: "https://creativecommons.org/publicdomain/zero/1.0/",
        },
      ],
      usageType: [""],
      exemptionText: "Exempted because of FOIA status",
    };
    const result = PermissionsSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts a usageType with openSource and empty exemptionText", () => {
    const input = {
      licenses: [
        {
          name: "CC0 1.0 Universal",
          URL: "https://creativecommons.org/publicdomain/zero/1.0/",
        },
      ],
      usageType: ["openSource"],
      exemptionText: "",
    };
    const result = PermissionsSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects an empty license", () => {
    const input = {
      licenses: [
        {
          name: "",
          URL: "",
        },
      ],
      usageType: ["exemptByFOIA"],
      exemptionText: "Exempted because of FOIA status",
    };
    const result = PermissionsSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects an incorrect license", () => {
    const input = {
      licenses: [
        {
          name: "",
          URL: "not-a-url-here",
        },
      ],
      usageType: ["exemptByFOIA"],
      exemptionText: "Exempted because of FOIA status",
    };
    const result = PermissionsSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects a usageType with exempt and empty exemptionText", () => {
    const input = {
      licenses: [
        {
          name: "CC0 1.0 Universal",
          URL: "https://creativecommons.org/publicdomain/zero/1.0/",
        },
      ],
      usageType: ["exemptByFOIA"],
      exemptionText: "",
    };
    const result = PermissionsSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// CONTACT
describe("ContactSchema", () => {
  it("accepts valid contact with email and name", () => {
    const input = {
      email: "opensource@cms.hhs.gov",
      name: "CMS Open Source Team",
    };
    const result = ContactSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects empty email", () => {
    const input = {
      email: "",
      name: "CMS Open Source Team",
    };
    const result = ContactSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects invalid email format", () => {
    const input = {
      email: "not-an-email",
      name: "CMS Open Source Team",
    };
    const result = ContactSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects empty name", () => {
    const input = {
      email: "opensource@cms.hhs.gov",
      name: "",
    };
    const result = ContactSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// DATE
describe("DateSchema", () => {
  it("accepts valid dates", () => {
    const input = {
      created: "2024-01-15T00:00:00Z",
      lastModified: "2024-06-20T12:30:00Z",
      metadataLastUpdated: "2024-06-21T08:00:00Z",
    };
    const result = DateSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects empty created date", () => {
    const input = {
      created: "",
      lastModified: "2024-06-20T12:30:00Z",
      metadataLastUpdated: "2024-06-21T08:00:00Z",
    };
    const result = DateSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects empty lastModified date", () => {
    const input = {
      created: "2024-01-15T00:00:00Z",
      lastModified: "",
      metadataLastUpdated: "2024-06-21T08:00:00Z",
    };
    const result = DateSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects empty metadataLastUpdated date", () => {
    const input = {
      created: "2024-01-15T00:00:00Z",
      lastModified: "2024-06-20T12:30:00Z",
      metadataLastUpdated: "",
    };
    const result = DateSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// REUSE FREQUENCY
describe("ReuseFrequencySchema", () => {
  it("accepts valid forks and clones", () => {
    const input = {
      forks: 25,
      clones: 150,
    };
    const result = ReuseFrequencySchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts forks without clones (clones is optional)", () => {
    const input = {
      forks: 25,
    };
    const result = ReuseFrequencySchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts zero values", () => {
    const input = {
      forks: 0,
      clones: 0,
    };
    const result = ReuseFrequencySchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects non-numeric forks", () => {
    const input = {
      forks: "twenty-five",
      clones: 150,
    };
    const result = ReuseFrequencySchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// RELATED CODE
describe("RelatedCodeSchema", () => {
  it("accepts valid related code entry", () => {
    const input = {
      name: "gov-codejson",
      URL: "https://github.com/DSACMS/gov-codejson",
      isGovernmentRepo: true,
    };
    const result = RelatedCodeSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts non-government repo", () => {
    const input = {
      name: "zod",
      URL: "https://github.com/colinhacks/zod",
      isGovernmentRepo: false,
    };
    const result = RelatedCodeSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects invalid URL", () => {
    const input = {
      name: "gov-codejson",
      URL: "not-a-valid-url",
      isGovernmentRepo: true,
    };
    const result = RelatedCodeSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects missing isGovernmentRepo", () => {
    const input = {
      name: "gov-codejson",
      URL: "https://github.com/DSACMS/gov-codejson",
    };
    const result = RelatedCodeSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// REUSED CODE
describe("ReusedCodeSchema", () => {
  it("accepts valid reused code entry", () => {
    const input = {
      name: "octokit",
      URL: "https://github.com/octokit/octokit.js",
    };
    const result = ReusedCodeSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects invalid URL", () => {
    const input = {
      name: "octokit",
      URL: "not-a-url",
    };
    const result = ReusedCodeSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// PARTNER
describe("PartnerSchema", () => {
  it("accepts valid partner", () => {
    const input = {
      name: "CMS Digital Service",
      email: "digitalservice@cms.hhs.gov",
    };
    const result = PartnerSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const input = {
      name: "CMS Digital Service",
      email: "not-an-email",
    };
    const result = PartnerSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

// CODEJSON (full schema)
describe("CodeJSONSchema", () => {
  it("accepts valid complete code.json", () => {
    const result = CodeJSONSchema.safeParse(validCodeJSON);
    expect(result.success).toBe(true);
  });

  it("rejects missing required name", () => {
    const input = { ...validCodeJSON, name: "" };
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects missing required description", () => {
    const input = { ...validCodeJSON, description: "" };
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects missing required status", () => {
    const input = { ...validCodeJSON, status: "" };
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects missing required organization", () => {
    const input = { ...validCodeJSON, organization: "" };
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects missing required repositoryVisibility", () => {
    const input = { ...validCodeJSON, repositoryVisibility: "" };
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects invalid repositoryURL", () => {
    const input = { ...validCodeJSON, repositoryURL: "not-a-url" };
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects empty languages array", () => {
    const input = { ...validCodeJSON, languages: [] };
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects missing contact email", () => {
    const input = {
      ...validCodeJSON,
      contact: { email: "", name: "CMS Open Source Team" },
    };
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects invalid contact email format", () => {
    const input = {
      ...validCodeJSON,
      contact: { email: "not-an-email", name: "CMS Open Source Team" },
    };
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects missing contact name", () => {
    const input = {
      ...validCodeJSON,
      contact: { email: "opensource@cms.hhs.gov", name: "" },
    };
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects missing feedbackMechanism", () => {
    const input = { ...validCodeJSON, feedbackMechanism: "" };
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects permissions with exemption usageType but empty exemptionText", () => {
    const input = {
      ...validCodeJSON,
      permissions: {
        licenses: [
          {
            name: "CC0 1.0 Universal",
            URL: "https://creativecommons.org/publicdomain/zero/1.0/",
          },
        ],
        usageType: ["exemptByLaw"],
        exemptionText: "",
      },
    };
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("accepts permissions with exemption usageType and valid exemptionText", () => {
    const input = {
      ...validCodeJSON,
      permissions: {
        licenses: [
          {
            name: "CC0 1.0 Universal",
            URL: "https://creativecommons.org/publicdomain/zero/1.0/",
          },
        ],
        usageType: ["exemptByLaw"],
        exemptionText: "Exempted under national security provisions",
      },
    };
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("rejects empty licenses array in permissions", () => {
    const input = {
      ...validCodeJSON,
      permissions: {
        licenses: [],
        usageType: ["openSource"],
        exemptionText: "",
      },
    };
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("rejects invalid license URL in permissions", () => {
    const input = {
      ...validCodeJSON,
      permissions: {
        licenses: [
          {
            name: "CC0 1.0 Universal",
            URL: "not-a-url",
          },
        ],
        usageType: ["openSource"],
        exemptionText: "",
      },
    };
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("accepts optional fields as undefined", () => {
    const input = {
      ...validCodeJSON,
      version: undefined,
      homepageURL: undefined,
      downloadURL: undefined,
      disclaimerURL: undefined,
      disclaimerText: undefined,
      relatedCode: undefined,
      reusedCode: undefined,
      partners: undefined,
    };
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts valid relatedCode array", () => {
    const input = {
      ...validCodeJSON,
      relatedCode: [
        {
          name: "gov-codejson",
          URL: "https://github.com/DSACMS/gov-codejson",
          isGovernmentRepo: true,
        },
      ],
    };
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts valid reusedCode array", () => {
    const input = {
      ...validCodeJSON,
      reusedCode: [
        {
          name: "octokit",
          URL: "https://github.com/octokit/octokit.js",
        },
      ],
    };
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("accepts valid partners array", () => {
    const input = {
      ...validCodeJSON,
      partners: [
        {
          name: "CMS Digital Service",
          email: "digitalservice@cms.hhs.gov",
        },
      ],
    };
    const result = CodeJSONSchema.safeParse(input);
    expect(result.success).toBe(true);
  });
});
