import { describe, it, expect } from "@jest/globals";
import {
  CodeJSON,
  assembleDraft,
  draftBaseline,
  droppedFields,
  validateCodeJSON,
} from "../../codejson.js";
import validCodeJSON from "../fixtures/test-code.json";

// The schema itself is owned and exhaustively tested by codejson-core. What follows
// pins the contract this action depends on: that we're bound to the CMS variant, that
// assembly never rejects an incomplete draft, and that the merge rules we handed over
// to core still behave the way this action needs them to.

const FIXED_NOW = new Date("2026-01-01T00:00:00.000Z");
const existing = validCodeJSON as unknown as CodeJSON;

const observed: Partial<CodeJSON> = {
  name: "test-repo",
  repositoryURL: "https://github.com/test-owner/test-repo",
  repositoryVisibility: "public",
};

describe("validateCodeJSON", () => {
  it("accepts a complete CMS code.json", () => {
    expect(validateCodeJSON(validCodeJSON)).toEqual([]);
  });

  it("reports a missing required field", () => {
    const { maturityModelTier: _omitted, ...withoutTier } = validCodeJSON;

    const errors = validateCodeJSON(withoutTier);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors.join("\n")).toContain("maturityModelTier");
  });

  it("enforces the CMS-only fields, so it is not bound to the neutral schema", () => {
    const { fismaLevel: _omitted, ...withoutFismaLevel } = validCodeJSON;

    expect(validateCodeJSON(withoutFismaLevel).join("\n")).toContain(
      "fismaLevel",
    );
  });

  it("requires exemptionText when usageType contains an exemption", () => {
    const exempt = {
      ...validCodeJSON,
      permissions: {
        ...validCodeJSON.permissions,
        usageType: ["exemptByAgencySystem"],
        exemptionText: null,
      },
    };

    expect(validateCodeJSON(exempt).join("\n")).toContain("exemptionText");
  });
});

describe("draftBaseline", () => {
  it("keeps enum fields present so they survive JSON.stringify", () => {
    const serialized = JSON.parse(JSON.stringify(draftBaseline));

    for (const field of [
      "status",
      "repositoryHost",
      "repositoryVisibility",
      "softwareType",
      "maintenance",
      "repositoryType",
      "fismaLevel",
    ]) {
      expect(serialized).toHaveProperty(field, "");
    }
  });

  it("defaults to CMS as the organization and CC0 as the license", () => {
    expect(draftBaseline.organization).toBe(
      "Centers for Medicare & Medicaid Services",
    );
    expect(draftBaseline.permissions?.licenses).toEqual([
      { name: "CC0-1.0", URL: "" },
    ]);
  });

  it("carries the CMS-only fields", () => {
    expect(draftBaseline).toHaveProperty("longDescription");
    expect(draftBaseline).toHaveProperty("maturityModelTier");
    expect(draftBaseline).toHaveProperty("subsetInHealthcare");
  });
});

describe("assembleDraft", () => {
  it("does not throw on an incomplete draft", () => {
    const result = assembleDraft(observed, null, { now: () => FIXED_NOW });

    expect(result.name).toBe("test-repo");
    expect(result.status).toBe("");
    expect(validateCodeJSON(result).length).toBeGreaterThan(0);
  });

  it("derives feedbackMechanism and SBOM from the repository URL", () => {
    const result = assembleDraft(observed, null);

    expect(result.feedbackMechanism).toBe(
      "https://github.com/test-owner/test-repo/issues",
    );
    expect(result.SBOM).toBe(
      "https://github.com/test-owner/test-repo/network/dependencies",
    );
  });

  it("keeps an existing feedbackMechanism and SBOM", () => {
    const result = assembleDraft(observed, existing);

    expect(result.feedbackMechanism).toBe(existing.feedbackMechanism);
    expect(result.SBOM).toBe(existing.SBOM);
  });

  it("stamps metadataLastUpdated from the injected clock", () => {
    const result = assembleDraft(observed, existing, { now: () => FIXED_NOW });

    expect(result.date.metadataLastUpdated).toBe("2026-01-01T00:00:00.000Z");
  });

  it("drops fields that are no longer part of the schema", () => {
    const stale = { ...existing, retiredField: "stale" };

    const result = assembleDraft(observed, stale as unknown as CodeJSON);

    expect(result).not.toHaveProperty("retiredField");
  });

  it("migrates a legacy string contractNumber to an array", () => {
    const legacy = { ...existing, contractNumber: "CONTRACT-001" };

    const result = assembleDraft(observed, legacy as unknown as CodeJSON);

    expect(result.contractNumber).toEqual(["CONTRACT-001"]);
  });

  it("preserves clones from the existing file and takes forks from observation", () => {
    const result = assembleDraft(
      { ...observed, reuseFrequency: { forks: 42 } },
      existing,
    );

    expect(result.reuseFrequency).toEqual({ forks: 42, clones: 50 });
  });

  it("marks the repository archived without duplicating the tag", () => {
    const archived = { ...existing, tags: ["archived"] };

    const result = assembleDraft(observed, archived as unknown as CodeJSON, {
      isArchived: true,
    });

    expect(result.status).toBe("Archival");
    expect(result.tags.filter((tag) => tag === "archived")).toHaveLength(1);
  });
});

describe("droppedFields", () => {
  it("reports keys that are not part of the schema", () => {
    expect(droppedFields({ name: "test", retiredField: "stale" })).toEqual([
      "retiredField",
    ]);
  });

  it("returns nothing when there is no existing file", () => {
    expect(droppedFields(null)).toEqual([]);
  });
});
