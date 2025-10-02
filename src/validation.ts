import { z } from "zod";

// Nested schemas
const DateSchema = z.object({
  created: z.string().min(1, "created date is required"),
  lastModified: z.string().min(1, "lastModified date is required"),
  metaDataLastUpdated: z
    .string()
    .min(1, "metaDataLastUpdated date is required"),
});

const ContactSchema = z.object({
  email: z.string().email("must be a valid email").min(1, "email is required"),
  name: z.string().min(1, "name is required"),
});

const LicenseSchema = z.object({
  name: z.string().min(1, "license name is required"),
  URL: z
    .string()
    .url("license URL must be valid")
    .min(1, "license URL is required"),
});

const PermissionsSchema = z
  .object({
    license: z.array(LicenseSchema).optional(),
    licenses: z.array(LicenseSchema).optional(),
    usageType: z.union([z.array(z.string()), z.string()]),
    exemptionText: z.string(),
  })
  .refine((data) => data.license || data.licenses, {
    message: "Either 'license' or 'licenses' array is required",
    path: ["license"],
  });

const ReuseFrequencySchema = z.object({
  forks: z.number({ required_error: "forks is required" }),
  clones: z.number().optional(),
});

const RelatedCodeSchema = z.object({
  name: z.string(),
  URL: z.string().url(),
  isGovernmentRepo: z.boolean(),
});

const ReusedCodeSchema = z.object({
  name: z.string(),
  URL: z.string().url(),
});

const PartnerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

// Main CodeJSON schema
export const CodeJSONSchema = z.object({
  name: z.string().min(1, "name is required"),
  version: z.string().optional(),
  description: z.string().min(1, "description is required"),
  longDescription: z.string(),
  status: z.string().min(1, "status is required"),
  permissions: PermissionsSchema,
  organization: z.string().min(1, "organization is required"),
  repositoryURL: z
    .string()
    .url("must be a valid URL")
    .min(1, "repositoryURL is required"),
  repositoryHost: z.string(),
  repositoryVisibility: z.string().min(1, "repositoryVisibility is required"),
  homepageURL: z.string().optional(),
  downloadURL: z.string().optional(),
  disclaimerURL: z.string().optional(),
  disclaimerText: z.string().optional(),
  vcs: z.string(),
  laborHours: z.number({ required_error: "laborHours is required" }),
  reuseFrequency: ReuseFrequencySchema,
  platforms: z.array(z.string()),
  categories: z.array(z.string()),
  softwareType: z.string(),
  languages: z.array(z.string()).min(1, "at least one language is required"),
  maintenance: z.string(),
  contractNumber: z.array(z.string()),
  SBOM: z.string(),
  relatedCode: z.array(RelatedCodeSchema).optional(),
  reusedCode: z.array(ReusedCodeSchema).optional(),
  partners: z.array(PartnerSchema).optional(),
  date: DateSchema,
  tags: z.array(z.string()),
  contact: ContactSchema,
  feedbackMechanism: z.string().min(1, "feedbackMechanism is required"),
  AIUseCaseID: z.string(),
  localisation: z.boolean(),
  repositoryType: z.string(),
  userInput: z.boolean(),
  fismaLevel: z.string(),
  group: z.string(),
  projects: z.array(z.string()),
  systems: z.array(z.string()),
  subsetInHealthcare: z.array(z.string()),
  userType: z.array(z.string()),
  maturityModelTier: z.number(),
});

export function validateCodeJSON(codeJSON: any): string[] {
  const result = CodeJSONSchema.safeParse(codeJSON);

  if (result.success) {
    return [];
  }

  return result.error.errors.map((err) => {
    const path = err.path.join(".");
    const field = path || "root";
    return `${field}: ${err.message}`;
  });
}
