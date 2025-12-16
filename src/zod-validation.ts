import { z } from "zod";

export const DateSchema = z.object({
  created: z.string().min(1, "created date is required"),
  lastModified: z.string().min(1, "lastModified date is required"),
  metadataLastUpdated: z
    .string()
    .min(1, "metadataLastUpdated date is required"),
});

export const ContactSchema = z.object({
  email: z.email("must be a valid email").min(1, "email is required"),
  name: z.string().min(1, "name is required"),
});

export const LicenseSchema = z.object({
  name: z.string().min(1, "license name is required"),
  URL: z.url("license URL must be valid").min(1, "license URL is required"),
});

export const PermissionsSchema = z
  .object({
    licenses: z.array(LicenseSchema).min(1, "at least one license is required"),
    usageType: z.union([z.array(z.string()), z.string()]),
    exemptionText: z.string(),
  })
  .refine(
    (data) => {
      const usageTypes = Array.isArray(data.usageType)
        ? data.usageType
        : [data.usageType];

      const hasExemption = usageTypes.some(
        (type) => typeof type === "string" && type.startsWith("exemptBy"),
      );

      if (hasExemption) {
        return data.exemptionText && data.exemptionText.trim().length > 0;
      }

      return true;
    },
    {
      message: "exemptionText is required when usageType contains an exemption",
      path: ["exemptionText"],
    },
  );

export const ReuseFrequencySchema = z.object({
  forks: z.number(),
  clones: z.number().optional(),
});

export const RelatedCodeSchema = z.object({
  name: z.string(),
  URL: z.url(),
  isGovernmentRepo: z.boolean(),
});

export const ReusedCodeSchema = z.object({
  name: z.string(),
  URL: z.url(),
});

export const PartnerSchema = z.object({
  name: z.string(),
  email: z.email(),
});

// we define our final runtime code.json schema here
export const CodeJSONSchema = z.object({
  name: z.string().min(1, "name is required"),
  version: z.string().optional(),
  description: z.string().min(1, "description is required"),
  longDescription: z.string(),
  status: z.string().min(1, "status is required"),
  permissions: PermissionsSchema,
  organization: z.string().min(1, "organization is required"),
  repositoryURL: z
    .url("must be a valid URL")
    .min(1, "repositoryURL is required"),
  repositoryHost: z.string(),
  repositoryVisibility: z.string().min(1, "repositoryVisibility is required"),
  homepageURL: z.string().optional(),
  downloadURL: z.string().optional(),
  disclaimerURL: z.string().optional(),
  disclaimerText: z.string().optional(),
  vcs: z.string(),
  laborHours: z.number(),
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

  return result.error.issues.map((err: z.ZodIssue) => {
    const path = err.path.join(".");
    const field = path || "root";
    return `${field}: ${err.message}`;
  });
}

export type Date = z.infer<typeof DateSchema>;
export type CodeJSON = z.infer<typeof CodeJSONSchema>; // we create our compile time code.json type inferance here
