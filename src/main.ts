import {
  CodeJSON,
  assembleDraft,
  droppedFields,
  validateCodeJSON,
} from "./codejson.js";
import { Dependencies } from "./types/Dependencies.js";
import { createHelpers, Helpers } from "./helper.js";
import { createProductionDeps } from "./create-deps.js";

// gathers what can be observed about the repository right now. anything that is a
// merge rule rather than an observation (feedbackMechanism, SBOM, dates, archival
// status, legacy field shapes) belongs to codejson-core and is left out on purpose.
async function getMetaData(
  helpers: Helpers,
  existingCodeJSON?: CodeJSON | null,
): Promise<Partial<CodeJSON>> {
  const partialCodeJSON = await helpers.calculateMetaData();

  // preserve a manually set version, only fall back to the latest release
  const version = existingCodeJSON?.version || partialCodeJSON.version;

  // preserve manually curated languages when they already exist in code.json,
  // and only fall back to GitHub detected languages for new repositories.
  const languages =
    existingCodeJSON?.languages && existingCodeJSON.languages.length > 0
      ? existingCodeJSON.languages
      : partialCodeJSON.languages;

  // preserve existing tags and append repository topics, de-duped
  const tags = helpers.mergeTags(
    partialCodeJSON.tags ?? [],
    existingCodeJSON?.tags ?? [],
  );

  // detect the fork upstream and government-made dependencies, then merge with any existing reusedCode
  const [forkParent, detectedDeps] = await Promise.all([
    helpers.detectForkParent(),
    helpers.detectReusedCode(),
  ]);
  const reusedCode = helpers.mergeReusedCode(
    existingCodeJSON?.reusedCode ?? [],
    [...(forkParent ? [forkParent] : []), ...detectedDeps],
  );

  return {
    name: partialCodeJSON.name,
    version: version,
    description: partialCodeJSON.description,
    repositoryURL: partialCodeJSON.repositoryURL,
    repositoryVisibility: partialCodeJSON.repositoryVisibility,
    laborHours: partialCodeJSON.laborHours,
    languages: languages,
    reuseFrequency: {
      forks: partialCodeJSON.reuseFrequency?.forks ?? 0,
    },
    tags: tags,
    date: {
      created: partialCodeJSON.date?.created ?? "",
      lastModified: partialCodeJSON.date?.lastModified ?? "",
    },
    reusedCode,
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

    const metaData = await getMetaData(helpers, currentCodeJSON);
    const finalCodeJSON = assembleDraft(metaData, currentCodeJSON, {
      isArchived: deps.isArchived,
    });

    // a generated code.json is a draft: fields we can't observe are left blank for a
    // human to complete on the pull request, so report what's missing without failing
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

    if (deps.skipPR) {
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
      await helpers.sendPR(finalCodeJSON, baseBranchName);
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
