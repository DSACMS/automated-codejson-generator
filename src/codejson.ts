import { z } from "zod";
import {
  CMS_SCHEMA_VERSION,
  cmsBaselineCodeJSON,
  cmsProfile,
  createCodeJSONProfile,
  type CMSCodeJSON,
} from "codejson-core";

// this action targets the CMS variant of the schema, so everything here binds to cmsProfile.
// we could make this generic / agency agnostic in the future but for now, the CMS variant is the only one that has been implemented in codejson-core.
export type CodeJSON = CMSCodeJSON;

// sort of a hack since codejson-core validates against the CMS schema, but we want to generate a draft that is inherently not valid.
// this allows us to use the same assemble and validate functions without having to create a separate profile for invalid drafts.
const blankEnumValue = "" as never;

export const draftBaseline: Partial<CodeJSON> = {
  ...cmsBaselineCodeJSON,
  status: blankEnumValue,
  repositoryHost: blankEnumValue,
  repositoryVisibility: blankEnumValue,
  softwareType: blankEnumValue,
  maintenance: blankEnumValue,
  repositoryType: blankEnumValue,
  fismaLevel: blankEnumValue,
  // core's CMS baseline ships an empty license list; CMS repositories default to CC0
  permissions: {
    licenses: [
      {
        name: "CC0-1.0",
        URL: "",
      },
    ],
    usageType: [],
    exemptionText: "",
  },
};

// again, a hack to support drafts but we should change this upstream so that it can accept drafts.
// we need this because the CMS schema is strict and does not allow blank enum values, but we want to generate a draft that is inherently invalid.
const draftProfile = createCodeJSONProfile(
  z.custom<CodeJSON>(),
  draftBaseline,
  CMS_SCHEMA_VERSION,
);

// merges a freshly observed repository state over the existing file: drops unknown
// fields, migrates legacy shapes, and derives feedbackMechanism, SBOM, description,
// tags, reuseFrequency, dates and archival status.
// the options shape is spelled out because codejson-core does not export its
// AssembleOptions type, leaving the inferred signature unnameable.
export const assembleDraft: (
  observed: Partial<CodeJSON>,
  existing: CodeJSON | null,
  options?: { isArchived?: boolean; now?: () => Date },
) => CodeJSON = draftProfile.assemble;

// validates against the full CMS schema. an empty array means valid
export const validateCodeJSON = cmsProfile.validate;

// core drops unknown fields silently, but this action has always reported them
export function droppedFields(
  existingCodeJSON: Record<string, unknown> | null,
): string[] {
  if (!existingCodeJSON) {
    return [];
  }

  const validKeys = new Set(Object.keys(draftBaseline));
  return Object.keys(existingCodeJSON).filter((key) => !validKeys.has(key));
}
