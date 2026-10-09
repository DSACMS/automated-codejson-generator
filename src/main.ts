import {
  CodeJSON,
  draftCodeJSON,
  droppedFields,
  validateCodeJSON,
} from "./codejson.js";
import { Dependencies } from "./types/Dependencies.js";
import { createHelpers, deriveUsageType, Helpers } from "./helper.js";
import { createProductionDeps } from "./create-deps.js";
import { enrichCodeJSON, enrichedFields } from "./enrich.js";

// gathers what can be observed about the repository right now. merging with the existing code.json belongs to codejson-core
async function getMetaData(helpers: Helpers): Promise<Partial<CodeJSON>> {
  const partialCodeJSON = await helpers.calculateMetaData();

  const [forkParent, detectedDeps] = await Promise.all([
    helpers.detectForkParent(),
    helpers.detectReusedCode(),
  ]);

  return {
    name: partialCodeJSON.name,
    version: partialCodeJSON.version,
    description: partialCodeJSON.description,
    repositoryURL: partialCodeJSON.repositoryURL,
    repositoryVisibility: partialCodeJSON.repositoryVisibility,
    laborHours: partialCodeJSON.laborHours,
    languages: partialCodeJSON.languages,
    reuseFrequency: {
      forks: partialCodeJSON.reuseFrequency?.forks ?? 0,
    },
    tags: partialCodeJSON.tags,
    date: {
      created: partialCodeJSON.date?.created ?? "",
      lastModified: partialCodeJSON.date?.lastModified ?? "",
    },
    reusedCode: [...(forkParent ? [forkParent] : []), ...detectedDeps],
    // only usageType is observed. core fills licenses and exemptionText from the existing file or the baseline
    permissions: {
      usageType: deriveUsageType(partialCodeJSON.repositoryVisibility),
    } as CodeJSON["permissions"],
    maturityModelTier: partialCodeJSON.maturityModelTier,
    ...(partialCodeJSON.repositoryHost
      ? { repositoryHost: partialCodeJSON.repositoryHost }
      : {}),
  };
}

export { getMetaData };

export async function runWithDeps(deps: Dependencies): Promise<void> {
  const helpers = createHelpers(deps);

  try {
    const eventName = process.env.GITHUB_EVENT_NAME;

    if (eventName === "pull_request") {
      deps.log.info("Detected pull_request event - validating only!");
      await helpers.validateOnly();
      return;
    }

    const currentCodeJSON = await helpers.readJSON(
      "/github/workspace/code.json",
    );

    for (const field of droppedFields(currentCodeJSON)) {
      deps.log.info(`Removing outdated field from current code.json: ${field}`);
    }

    const metaData = await getMetaData(helpers);
    const draft = draftCodeJSON(metaData, currentCodeJSON, {
      isArchived: deps.isArchived,
    });
    const finalCodeJSON = deps.enableAI
      ? await enrichCodeJSON(
          draft,
          {
            readme: await helpers.readREADME(),
            secrets: [deps.githubToken, deps.adminToken],
          },
          deps.log,
          deps.runModel,
        )
      : draft;

    const aiGeneratedFields = enrichedFields(draft, finalCodeJSON);

    // a generated code.json is a draft so we must report what fields are missing
    const validationErrors = validateCodeJSON(finalCodeJSON);

    if (validationErrors.length > 0) {
      deps.log.warning(
        "Generated code.json still needs manual input before it will validate:",
      );
      validationErrors.forEach((error) => deps.log.warning(error));
    } else {
      deps.log.info("Generated code.json successfully!");
    }

    const baseBranchName = await helpers.getBaseBranch();

    if (deps.skipPR && aiGeneratedFields.length > 0) {
      deps.log.info(
        "AI-generated fields need human review, creating a pull request instead of pushing directly",
      );
      await helpers.sendPR(finalCodeJSON, baseBranchName, aiGeneratedFields);
    } else if (deps.skipPR) {
      if (!deps.adminToken) {
        deps.log.warning("SKIP_PR is enabled but ADMIN_TOKEN is not provided.");
        deps.log.warning(
          "Direct push requires a Personal Access Token with appropriate permissions.",
        );

        deps.log.info("Falling back to pull request creation");
        await helpers.sendPR(finalCodeJSON, baseBranchName);
      } else {
        deps.log.info("Attempting direct push to branch");
        await helpers.pushDirectlyWithFallback(finalCodeJSON, baseBranchName);
      }
    } else {
      deps.log.info("Creating pull request with updated code.json");
      await helpers.sendPR(finalCodeJSON, baseBranchName, aiGeneratedFields);
    }
  } catch (error) {
    deps.setFailed(`Action failed: ${error}`);
  }
}

// prod entry point
export async function run(): Promise<void> {
  const deps = createProductionDeps();
  return runWithDeps(deps);
}
