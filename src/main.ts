import * as core from "@actions/core";
import { CodeJSON } from "./types/CodeJSONSchema.js";
import * as helpers from "./helper.js";

const baselineCodeJSON: Partial<CodeJSON> = {
  name: "",
  version: "",
  description: "",
  longDescription: "",
  status: undefined,
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
  organization: "Centers for Medicare & Medicaid Services",
  repositoryURL: "",
  repositoryHost: undefined,
  repositoryVisibility: undefined,
  homepageURL: "",
  downloadURL: "",
  disclaimerURL: "",
  disclaimerText: "",
  vcs: "git",
  laborHours: 0,
  reuseFrequency: {
    forks: 0,
    clones: 0,
  },
  platforms: [],
  categories: [],
  softwareType: undefined,
  languages: [],
  maintenance: undefined,
  contractNumber: [],
  SBOM: "",
  relatedCode: [],
  reusedCode: [],
  partners: [],
  date: {
    created: "",
    lastModified: "",
    metadataLastUpdated: "",
  },
  tags: [],
  contact: {
    email: "",
    name: "",
  },
  feedbackMechanism: "",
  AIUseCaseID: "0",
  localisation: false,
  repositoryType: undefined,
  userInput: false,
  fismaLevel: undefined,
  group: "",
  projects: [],
  systems: [],
  subsetInHealthcare: [],
  userType: [],
  maturityModelTier: 0,
};

function filterValidFields(existingCodeJSON: Record<string, unknown>): Partial<CodeJSON> {
  const validKeys = new Set(Object.keys(baselineCodeJSON));
  const filtered: Record<string, unknown> = {};

  for (const key of Object.keys(existingCodeJSON)) {
    if (validKeys.has(key)) {
      filtered[key] = existingCodeJSON[key];
    } else {
      core.info(`Removing outdated field from current code.json: ${key}`);
    }
  }

  return filtered as Partial<CodeJSON>;
}

async function getMetaData(
  existingCodeJSON?: CodeJSON | null,
): Promise<Partial<CodeJSON>> {
  const partialCodeJSON = await helpers.calculateMetaData();

  // preserve existing feedback mechanisms if they exist, otherwise default to GitHub Issues
  const feedbackMechanism =
    existingCodeJSON?.feedbackMechanism ||
    `${partialCodeJSON.repositoryURL}/issues`;

  // preserve existing SBOM link if they exist, otherwise default to GitHub SBOM link
  const SBOM =
    existingCodeJSON?.SBOM ||
    `${partialCodeJSON.repositoryURL}/network/dependencies`;

  // only use the calculated description if its not empty, otherwise keep existing
  const shouldUpdateDescription =
    partialCodeJSON.description && partialCodeJSON.description.trim() !== "";
  const description = shouldUpdateDescription
    ? partialCodeJSON.description
    : existingCodeJSON?.description || "";

  // only update tags if we have new ones from GitHub Topics, otherwise keep existing
  const shouldUpdateTags =
    partialCodeJSON.tags && partialCodeJSON.tags.length > 0;
  const tags = shouldUpdateTags
    ? partialCodeJSON.tags
    : existingCodeJSON?.tags || [];

  // handling legacy contractNumber that turned from string to array which caused validation errors
  let contractNumber: string[] = [];
  const existingContract: unknown = existingCodeJSON?.contractNumber;
  if (existingContract) {
    if (typeof existingContract === "string") {
      contractNumber = existingContract.trim() ? [existingContract.trim()] : [];
    } else if (Array.isArray(existingContract)) {
      contractNumber = existingContract;
    }
  }

  // handling archive option
  const isArchived = core.getInput("ARCHIVE", { required: false }) === "true";
  let status = existingCodeJSON?.status || undefined;

  if (isArchived) {
    status = "Archival";
    tags?.push("archived");
  }

  return {
    name: partialCodeJSON.name,
    description: description,
    status: status,
    repositoryURL: partialCodeJSON.repositoryURL,
    repositoryVisibility: partialCodeJSON.repositoryVisibility,
    laborHours: partialCodeJSON.laborHours,
    languages: partialCodeJSON.languages,
    reuseFrequency: {
      forks: partialCodeJSON.reuseFrequency?.forks ?? 0,
      clones: existingCodeJSON?.reuseFrequency?.clones ?? 0,
    },
    tags: tags,
    date: {
      created: partialCodeJSON.date?.created ?? "",
      lastModified: partialCodeJSON.date?.lastModified ?? "",
      metadataLastUpdated:
        partialCodeJSON.date?.metadataLastUpdated ?? new Date().toISOString(),
    },
    feedbackMechanism,
    SBOM,
    contractNumber,
  };
}

export async function run(): Promise<void> {
  try {
    const eventName = process.env.GITHUB_EVENT_NAME;

    if (eventName === "pull_request") {
      core.info("Detected pull_request event - validating only!");
      await helpers.validateOnly();
      return;
    }

    const currentCodeJSON = await helpers.readJSON(
      "/github/workspace/code.json",
    );
    const metaData = await getMetaData(currentCodeJSON);
    let finalCodeJSON = {} as CodeJSON;

    if (currentCodeJSON) {
      // filter out outdated fields before merging
      const filteredExisting = filterValidFields(currentCodeJSON);

      finalCodeJSON = {
        ...baselineCodeJSON,
        ...filteredExisting,
        ...metaData,
      } as CodeJSON;
    } else {
      finalCodeJSON = {
        ...baselineCodeJSON,
        ...metaData,
      } as CodeJSON;
    }

    core.info("Generated code.json successfully!");

    const baseBranchName = await helpers.getBaseBranch();
    const skipPR = core.getInput("SKIP_PR", { required: false }) === "true";
    const adminToken = core.getInput("ADMIN_TOKEN", { required: false });

    if (skipPR) {
      if (!adminToken) {
        core.warning("SKIP_PR is enabled but ADMIN_TOKEN is not provided.");
        core.warning(
          "Direct push requires a Personal Access Token with appropriate permissions.",
        );

        core.info("Falling back to pull request creation");
        await helpers.sendPR(finalCodeJSON, baseBranchName);
      } else {
        core.info("Attempting direct push to branch");
        await helpers.pushDirectlyWithFallback(finalCodeJSON, baseBranchName);
      }
    } else {
      core.info("Creating pull request with updated code.json");
      await helpers.sendPR(finalCodeJSON, baseBranchName);
    }
  } catch (error) {
    core.setFailed(`Action failed: ${error}`);
  }
}