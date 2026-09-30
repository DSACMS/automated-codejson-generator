import { describe, it, expect } from "@jest/globals";
import { droppedFields, validateCodeJSON } from "../../codejson.js";
import validCodeJSON from "../fixtures/test-code.json";

// The schema itself is owned and exhaustively tested by codejson-core. What follows
// pins the contract this action depends on: that we're bound to the CMS variant.

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
