import * as core from "@actions/core";
import * as fs from "fs/promises";

import { Octokit as ActionKit } from "@octokit/action";
import { createPullRequest } from "octokit-plugin-create-pull-request";
import { exec } from "child_process";
import { promisify } from "util";

import { CodeJSON, BasicRepoInfo } from "./model.js";
import { validateCodeJSON } from "./validation.js";

const execAsync = promisify(exec);

const TOKEN = core.getInput("GITHUB_TOKEN", { required: true });
const ADMIN_TOKEN = core.getInput("ADMIN_TOKEN", { required: false });

const MyOctoKit = ActionKit.plugin(createPullRequest);
const octokit = new MyOctoKit({
  auth: TOKEN,
  log: {
    debug: core.debug,
    info: core.info,
    warn: core.warning,
    error: core.error,
  },
});

const adminOctokit = ADMIN_TOKEN
  ? new MyOctoKit({
      auth: ADMIN_TOKEN,
      log: {
        debug: core.debug,
        info: core.info,
        warn: core.warning,
        error: core.error,
      },
    })
  : null;

const owner = process.env.GITHUB_REPOSITORY_OWNER ?? "";
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";

const HOURS_PER_MONTH = 730.001;

//===============================================
// Meta Data
//===============================================
export async function calculateMetaData(): Promise<Partial<CodeJSON>> {
  try {
    const [laborHours, basicInfo] = await Promise.all([
      getLaborHours(),
      getBasicInfo(),
    ]);

    return {
      name: basicInfo.title,
      description: basicInfo.description,
      repositoryURL: basicInfo.url,
      repositoryVisibility: basicInfo.repositoryVisibility,
      laborHours: laborHours,
      languages: basicInfo.languages,
      reuseFrequency: {
        forks: basicInfo.forks,
        clones: 0,
      },
      tags: basicInfo.tags,
      date: {
        created: basicInfo.date.created,
        lastModified: basicInfo.date.lastModified,
        metaDataLastUpdated: basicInfo.date.metaDataLastUpdated,
      },
    };
  } catch (error) {
    core.error(`Failed to calculate meta data: ${error}`);
    throw error;
  }
}

async function getBasicInfo(): Promise<BasicRepoInfo> {
  try {
    const [repoData, languagesData] = await Promise.all([
      octokit.rest.repos.get({ owner, repo }),
      octokit.rest.repos.listLanguages({ owner, repo }),
    ]);

    const languages = Object.keys(languagesData.data);
    const topics = repoData.data.topics || [];
    const tags = topics.filter(
      (topic) => typeof topic === "string" && topic.trim() !== "",
    );

    return {
      title: repoData.data.name,
      description: repoData.data.description ?? "",
      url: repoData.data.html_url,
      repositoryVisibility: repoData.data.private ? "private" : "public",
      languages: languages,
      forks: repoData.data.forks_count,
      tags: tags,
      date: {
        created: repoData.data.created_at,
        lastModified: repoData.data.updated_at,
        metaDataLastUpdated: new Date().toISOString(),
      },
    };
  } catch (error) {
    core.error(`Failed to get basic info: ${error}`);
    throw error;
  }
}

async function getLaborHours(): Promise<number> {
  try {
    const { stdout } = await execAsync(`scc /github/workspace --format json2`);
    const sccData = JSON.parse(stdout);

    const laborHours = Math.ceil(
      sccData["estimatedScheduleMonths"] * HOURS_PER_MONTH,
    );
    return laborHours;
  } catch (error) {
    core.error(`Failed to get labor hours: ${error}`);
    throw error;
  }
}

export async function getBaseBranch(): Promise<string> {
  const BRANCH = core.getInput("BRANCH", { required: false });

  if (BRANCH) {
    return BRANCH;
  } else {
    try {
      const repoData = await octokit.rest.repos.get({ owner, repo });
      return repoData.data.default_branch;
    } catch (error) {
      core.error(`Failed to get Base Branch Name: ${error}`);
      throw error;
    }
  }
}

//===============================================
// Validation
//===============================================

// Used when triggered by pull request events
export async function validateOnly(): Promise<void> {
  core.info("🔍 Running in validation-only mode");

  try {
    const codeJSON = await readJSON("/github/workspace/code.json");

    if (!codeJSON) {
      core.setFailed(
        "code.json file not found, is empty, or contains invalid JSON syntax...",
      );
      return;
    }

    core.info("code.json file successfully parsed!");

    const validationErrors = validateCodeJSON(codeJSON);

    if (validationErrors.length > 0) {
      const errorMessage = `code.json validation failed with following errors:\n\n${validationErrors.map((err, idx) => `${idx + 1}. ${err}`).join("\n")}`;
      core.setFailed(errorMessage);
      return;
    }

    core.info("code.json is valid!");
  } catch (error) {
    core.setFailed(`Validation error: ${error}`);
  }
}

export { validateCodeJSON };

//===============================================
// Data Handling
//===============================================
export async function readJSON(filepath: string): Promise<CodeJSON | null> {
  try {
    const fileContent = await fs.readFile(filepath, "utf8");
    return JSON.parse(fileContent) as CodeJSON;
  } catch (error) {
    console.log(`Error with reading JSON file: ${error}`);
    return null;
  }
}

export async function sendPR(
  updatedCodeJSON: CodeJSON,
  baseBranchName: string,
) {
  try {
    const formattedContent = JSON.stringify(updatedCodeJSON, null, 2) + "\n";
    const headBranchName = `code-json-${new Date().getTime()}`;

    const PR = await octokit.createPullRequest({
      owner,
      repo,
      title: "Update code.json",
      body: bodyOfPR(),
      base: baseBranchName,
      head: headBranchName,
      labels: ["codejson-initialized"],
      changes: [
        {
          files: {
            "code.json": formattedContent,
          },
          commit: "Update code.json metadata",
        },
      ],
    });

    if (PR) {
      core.info(`Successfully created PR: ${PR.data.html_url}`);

      core.setOutput("updated", true);
      core.setOutput("pr_url", PR.data.html_url);
      core.setOutput("method_used", "pull_request");
    } else {
      core.error(`Failed to create PR because of PR object`);
      core.setOutput("updated", false);
    }
  } catch (error) {
    core.error(`Failed to create PR: ${error}`);
  }
}

async function pushDirectlyWithPAT(
  updatedCodeJSON: CodeJSON,
  baseBranchName: string,
): Promise<boolean> {
  if (!adminOctokit) {
    core.error("Admin token not provided for direct push");
    return false;
  }

  try {
    const formattedContent = JSON.stringify(updatedCodeJSON, null, 2);

    let currentFileSha: string | undefined;
    try {
      const currentFile = await adminOctokit.rest.repos.getContent({
        owner,
        repo,
        path: "code.json",
        ref: baseBranchName,
      });

      if ("sha" in currentFile.data) {
        currentFileSha = currentFile.data.sha;
      }
    } catch (error) {
      core.info("code.json doesn't exist yet, will create new file");
    }

    const result = await adminOctokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: "code.json",
      message: "Update code.json metadata",
      content: Buffer.from(formattedContent).toString("base64"),
      branch: baseBranchName,
      sha: currentFileSha,
    });

    core.info(`Successfully pushed commit with PAT: ${result.data.commit.sha}`);

    core.setOutput("updated", true);
    core.setOutput("commit_sha", result.data.commit.sha);
    core.setOutput("method_used", "direct_push");
    return true;
  } catch (error) {
    core.error(`Failed to push directly with PAT: ${error}`);
    return false;
  }
}

export async function pushDirectlyWithFallback(
  updatedCodeJSON: CodeJSON,
  baseBranchName: string,
) {
  if (!ADMIN_TOKEN) {
    core.error(
      "SKIP_PR is enabled but ADMIN_TOKEN is not provided. Direct push requires an admin PAT.",
    );
    core.info("Falling back to creating a pull request");

    await sendPR(updatedCodeJSON, baseBranchName);
    return;
  }

  core.info("Attempting direct push with admin PAT!");

  const directPushSuccess = await pushDirectlyWithPAT(
    updatedCodeJSON,
    baseBranchName,
  );

  if (!directPushSuccess) {
    core.info(
      "Direct push with PAT failed, falling back to creating a pull request",
    );
    await sendPR(updatedCodeJSON, baseBranchName);
  }
}

function bodyOfPR(): string {
  return `
  ## Welcome to the Federal Open Source Community!

  Hello, and thank you for your contributions to the Federal Open Source Community. 🙏

  This pull request adding [code.json repository metadata](https://github.com/DSACMS/gov-codejson/blob/main/docs/metadata.md) is being sent on behalf of the CMS Source Code Stewardship Taskforce, in compliance with [The Federal Source Code Inventory Policy](https://code.gov/agency-compliance/compliance/inventory-code), [M-16-21](https://obamawhitehouse.archives.gov/sites/default/files/omb/memoranda/2016/m_16_21.pdf), and in preparation for the [SHARE IT Act of 2024](https://www.congress.gov/bill/118th-congress/house-bill/9566). If you have questions, please file an issue [here](https://github.com/DSACMS/automated-codejson-generator/issues) or join our #cms-ospo slack channel [here](https://cmsgov.enterprise.slack.com/archives/C07HM92S9QQ).

  ## Next Steps
  ### Add Missing Information to code.json
  - We have automatically calculated some fields but many require manual input
  - Please enter the missing fields by directly editing code.json in Files Changed tab on your pull-request
  - We also have a [form](https://dsacms.github.io/codejson-generator/) where you can create your code.json via a website, and then download directly to your local machine, and then you can copy and paste into here.

  If you would like additional information about the code.json metadata requirements, please visit the repository [here](https://github.com/DSACMS/gov-codejson).
  `;
}
