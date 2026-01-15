// DO NOT EDIT - AUTOMATICALLY GENERATED FILE!!!

import { z } from "zod";

export const CodeJSONSchema = z
  .object({
    name: z.string().describe("Name of the project or software"),
    version: z
      .string()
      .describe("The version for this release. For example, '1.0.0'.")
      .optional(),
    description: z
      .string()
      .describe("A one or two sentence description of the software."),
    longDescription: z
      .string()
      .min(150)
      .max(10000)
      .describe(
        "Provide longer description of the software, between 150 and 10000 chars. It is meant to provide an overview of the capabilities of the software for a potential user.",
      ),
    status: z
      .enum([
        "Ideation",
        "Development",
        "Alpha",
        "Beta",
        "Release Candidate",
        "Production",
        "Archival",
      ])
      .describe("Development status of the project"),
    permissions: z
      .object({
        licenses: z
          .array(
            z
              .object({
                name: z
                  .enum([
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
                  ])
                  .describe("An abbreviation for the name of the license"),
                URL: z
                  .string()
                  .url()
                  .or(z.literal(""))
                  .describe("The URL of the release license in the repository"),
              })
              .strict(),
          )
          .describe("License(s) for the release"),
        usageType: z
          .array(
            z.enum([
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
            ]),
          )
          .describe(
            "A list of enumerated values which describes the usage permissions for the release: (1) openSource: Open source; (2) governmentWideReuse: Government-wide reuse; (3) exemptByNationalSecurity: The source code is primarily for use in national security system as defined in section 11103 of title 40, USC; (4) exemptByNationalIntelligence: The source code is developed by an agency or part of an agency that is an element of the intelligence community, as defined in section 3(4) of the National Security Act of 1947; (5) exemptByFOIA: The source code is exempt under the Freedom of Information Act; (6) exemptByEAR: The source code is exempt under the Export Administration Regulations; (7) exemptByITAR: The source code is exempt under the the International Traffic in Arms Regulations; (8) exemptByTSA: The source code is exempt under the regulations of the Transportation Security Administration relating to the protection of Sensitive Security Information; (9) exemptByClassifiedInformation: The source code is exempt under the Federal laws and regulations governing the sharing of classified information not covered by exemptByNationalSecurity, exemptByNationalIntelligence, exemptbyFOIA, exemptByEAR, exemptByITAR, and exemptByTSA; (10) exemptByPrivacyRisk: The sharing or public accessibility of the source code would create an identifiable risk to the privacy of an individual; (11) exemptByIPRestriction: The sharing of the source code is limited by patent or intellectual property restrictions; (12) exemptByAgencySystem: The sharing of the source code would create an identifiable risk to the stability, security, or integrity of the agency's systems or personnel; (13) exemptByAgencyMission: The sharing of the source code would create an identifiable risk to agency mission, programs, or operations;  (14) exemptByCIO: The CIO believes it is in the national interest to exempt sharing the source code;  (15) exemptByPolicyDate: The release was created prior to the M-16-21 policy (August 8, 2016)",
          ),
        exemptionText: z
          .union([
            z
              .string()
              .describe(
                "If an exemption is listed in the 'usageType' field, this field should include a one- or two- sentence justification for the exemption used.",
              ),
            z
              .null()
              .describe(
                "If an exemption is listed in the 'usageType' field, this field should include a one- or two- sentence justification for the exemption used.",
              ),
          ])
          .describe(
            "If an exemption is listed in the 'usageType' field, this field should include a one- or two- sentence justification for the exemption used.",
          )
          .optional(),
      })
      .strict()
      .describe(
        "An object containing description of the usage/restrictions regarding the release",
      ),
    organization: z
      .literal("Centers for Medicare & Medicaid Services")
      .describe(
        "The organization or component within the agency to which the releases listed belong.",
      ),
    repositoryURL: z
      .string()
      .url()
      .or(z.literal(""))
      .describe(
        "The URL of the public release repository for open source repositories. This field is not required for repositories that are only available as government-wide reuse or are closed (pursuant to one of the exemptions). It can be listed as 'private' for repositories that are closed.",
      ),
    repositoryHost: z
      .enum([
        "github.com/CMSgov",
        "github.com/CMS-Enterprise",
        "github.com/Enterprise-CMCS",
        "github.com/DSACMS",
        "github.cms.gov",
        "CCSQ GitHub",
      ])
      .describe("Location where source code is hosted"),
    repositoryVisibility: z
      .enum(["public", "private"])
      .describe("Visibility of repository"),
    homepageURL: z
      .string()
      .url()
      .or(z.literal(""))
      .describe("The URL of the public release homepage.")
      .optional(),
    downloadURL: z
      .string()
      .url()
      .or(z.literal(""))
      .describe("The URL where a distribution of the release can be found.")
      .optional(),
    disclaimerURL: z
      .string()
      .url()
      .or(z.literal(""))
      .describe(
        "The URL where disclaimer language regarding the release can be found.",
      )
      .optional(),
    disclaimerText: z
      .string()
      .describe(
        "Short paragraph that includes disclaimer language to accompany the release.",
      )
      .optional(),
    vcs: z
      .enum(["git", "hg", "svn", "rcs", "bzr", "none"])
      .describe("Version control system used"),
    laborHours: z
      .number()
      .gte(0)
      .describe(
        "Labor hours invested in the project. Calculated using COCOMO measured by the SCC tool: https://github.com/boyter/scc?tab=readme-ov-file#cocomo",
      ),
    reuseFrequency: z
      .object({
        forks: z.number().int().gte(0).optional(),
        clones: z.number().int().gte(0).optional(),
      })
      .catchall(z.any())
      .describe(
        "Measures frequency of code reuse in various forms. (e.g. forks, downloads, clones)",
      ),
    platforms: z
      .array(
        z.enum(["web", "windows", "mac", "linux", "ios", "android", "other"]),
      )
      .refine((items) => new Set(items).size === items.length, {
        message: "Array must contain unique values",
      })
      .describe("Platforms supported by the project"),
    categories: z
      .array(z.string())
      .refine((items) => new Set(items).size === items.length, {
        message: "Array must contain unique values",
      })
      .describe(
        "Categories the project belongs to. Select from: https://yml.publiccode.tools/categories-list.html",
      ),
    softwareType: z
      .enum([
        "standalone/mobile",
        "standalone/iot",
        "standalone/desktop",
        "standalone/web",
        "standalone/backend",
        "standalone/other",
        "addon",
        "library",
        "configurationFiles",
      ])
      .describe("Type of software"),
    languages: z
      .array(z.string())
      .refine((items) => new Set(items).size === items.length, {
        message: "Array must contain unique values",
      })
      .describe("Programming languages that make up the codebase"),
    maintenance: z
      .enum(["internal", "contract", "community", "none"])
      .describe(
        "The dedicated staff that keeps the software up-to-date, if any",
      ),
    contractNumber: z
      .array(z.string())
      .refine((items) => new Set(items).size === items.length, {
        message: "Array must contain unique values",
      })
      .describe("Contract number(s) under which the project was developed"),
    SBOM: z
      .string()
      .describe(
        "Link of the upstream repositories and dependencies used, in the form of a Software Bill of Materials/SBOM. If the software does not have a SBOM, enter 'None'. (i.e. Github provides an SBOM: https://github.com/$ORG_NAME/$REPO_NAME/network/dependencies)",
      ),
    relatedCode: z
      .array(
        z
          .object({
            name: z
              .string()
              .describe(
                "The name of the code repository, project, library or release.",
              )
              .optional(),
            URL: z
              .string()
              .url()
              .or(z.literal(""))
              .describe(
                "The URL where the code repository, project, library or release can be found.",
              )
              .optional(),
            isGovernmentRepo: z
              .boolean()
              .describe(
                "True or False. Is the code repository owned or managed by a federal agency?",
              )
              .optional(),
          })
          .strict(),
      )
      .describe(
        "An array of affiliated government repositories that may be a part of the same project. For example,  relatedCode for 'code-gov-front-end' would include 'code-gov-api' and 'code-gov-api-client'.",
      )
      .optional(),
    reusedCode: z
      .array(
        z
          .object({
            name: z
              .string()
              .describe("The name of the software used in this release.")
              .optional(),
            URL: z
              .string()
              .url()
              .or(z.literal(""))
              .describe("The URL where the software can be found.")
              .optional(),
          })
          .strict(),
      )
      .describe(
        "An array of government source code, libraries, frameworks, APIs, platforms or other software used in this release. For example, US Web Design Standards, cloud.gov, Federalist, Digital Services Playbook, Analytics Reporter.",
      )
      .optional(),
    partners: z
      .array(
        z
          .object({
            name: z
              .string()
              .describe("The acronym describing the partner agency.")
              .optional(),
            email: z
              .string()
              .describe(
                "The email address for the point of contact at the partner agency.",
              )
              .optional(),
          })
          .strict(),
      )
      .describe(
        "An array of objects including an acronym for each agency partnering on the release and the contact email at such agency.",
      )
      .optional(),
    date: z
      .object({
        created: z
          .string()
          .datetime({ offset: true })
          .describe("Creation date of project.")
          .optional(),
        lastModified: z
          .string()
          .datetime({ offset: true })
          .describe("Date when the project was last modified")
          .optional(),
        metadataLastUpdated: z
          .string()
          .datetime({ offset: true })
          .describe("Date when metadata was last updated")
          .optional(),
      })
      .strict()
      .describe("A date object describing the release"),
    tags: z
      .array(z.string())
      .refine((items) => new Set(items).size === items.length, {
        message: "Array must contain unique values",
      })
      .describe(
        "Topics and keywords associated with the project to improve search and discoverability",
      ),
    contact: z
      .object({
        email: z
          .string()
          .email()
          .describe("Email address of the point of contact")
          .optional(),
        name: z.string().describe("Name of the point of contact").optional(),
      })
      .strict()
      .describe("Point of contact for the release"),
    feedbackMechanism: z
      .string()
      .url()
      .or(z.literal(""))
      .describe(
        "Method a repository receives feedback from the community (i.e. URL to GitHub repository issues page)",
      ),
    AIUseCaseID: z
      .string()
      .describe(
        "The software's ID in the AI Use Case Inventory. If the software is not currently listed in the inventory, enter '0'.",
      ),
    localisation: z
      .boolean()
      .describe("Indicates if the project supports multiple languages"),
    repositoryType: z
      .enum([
        "package",
        "website",
        "standards",
        "libraries",
        "data",
        "application",
        "tools",
        "APIs",
      ])
      .describe("Purpose and functionality of the repository"),
    userInput: z.boolean().describe("Does the software accept user input?"),
    fismaLevel: z
      .enum(["low", "moderate", "high"])
      .describe(
        "Level of security categorization assigned to an information system under the Federal Information Security Modernization Act (FISMA): https://security.cms.gov/learn/federal-information-security-modernization-act-fisma",
      ),
    group: z
      .string()
      .describe("Home Department / Org / Group associated with the project"),
    projects: z
      .array(z.string())
      .refine((items) => new Set(items).size === items.length, {
        message: "Array must contain unique values",
      })
      .describe(
        "Project(s) that is associated or related to the repository, if any (e.g. Bluebutton, MPSM)",
      ),
    systems: z
      .array(z.string())
      .refine((items) => new Set(items).size === items.length, {
        message: "Array must contain unique values",
      })
      .describe(
        "CMS systems that the repository interfaces with or depends on, if any (e.g. IDR, PECOS)",
      )
      .optional(),
    subsetInHealthcare: z
      .array(z.enum(["policy", "operational", "medicare", "medicaid"]))
      .refine((items) => new Set(items).size === items.length, {
        message: "Array must contain unique values",
      })
      .describe("Healthcare-related subset"),
    userType: z
      .array(z.enum(["providers", "patients", "government"]))
      .refine((items) => new Set(items).size === items.length, {
        message: "Array must contain unique values",
      })
      .describe("Types of users who interact with the software"),
    maturityModelTier: z
      .union([
        z.literal(0),
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
      ])
      .describe(
        "Maturity model tier according to the CMS Open Source Repository Maturity Model Framework: https://github.com/DSACMS/repo-scaffolder/blob/main/maturity-model-tiers.md",
      ),
  })
  .strict()
  .describe("A metadata standard for software repositories of CMS")
  .refine(
    (data) => {
      const usageTypes = data.permissions?.usageType ?? [];
      const hasExemption = usageTypes.some(
        (type) => typeof type === "string" && type.startsWith("exemptBy"),
      );

      if (hasExemption) {
        return (
          data.permissions?.exemptionText != null &&
          data.permissions.exemptionText.trim().length > 0
        );
      }

      return true;
    },
    {
      message: "exemptionText is required when usageType contains an exemption",
      path: ["permissions", "exemptionText"],
    },
  );

export type CodeJSON = z.infer<typeof CodeJSONSchema>;
