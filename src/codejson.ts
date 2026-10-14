import {
  profiles,
  type CodeJSON as NeutralCodeJSON,
  type CMSCodeJSON,
  type CodeJSONProfile,
  type ProfileName,
} from "codejson-core";

export type AgencyName = ProfileName;

// neutral fields are always present; fields only some agencies define are optional
export type CodeJSON = NeutralCodeJSON & Partial<CMSCodeJSON>;

export function resolveProfile(agency: string): CodeJSONProfile<CodeJSON> {
  if (!Object.hasOwn(profiles, agency)) {
    throw new Error(
      `Unknown AGENCY "${agency}". Use one of: ${Object.keys(profiles).join(", ")}`,
    );
  }
  return profiles[agency as AgencyName] as unknown as CodeJSONProfile<CodeJSON>;
}
