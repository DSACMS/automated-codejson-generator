import { CodeJSON, validateCodeJSON } from "./codejson.js";
import { BasicRepoInfo } from "./types/BasicRepoInfo.js";
import { Dependencies } from "./types/Dependencies.js";
import {
  ReusedCodeEntry,
  lookupGovDependency,
  lookupPyPIGovDependency,
} from "./gov-dependencies.js";

const HOURS_PER_MONTH = 730.001;
const WORKSPACE_PATH = "/github/workspace";

const COMMUNITY_FILE_CANDIDATES: Record<string, string[]> = {
  LICENSE: ["LICENSE", "LICENSE.md", "LICENSE.txt"],
  README: ["README.md", "README.rst", "README.txt", "README"],
  COMMUNITY: ["COMMUNITY.md", ".github/COMMUNITY.md"],
  SECURITY: ["SECURITY.md", ".github/SECURITY.md"],
  CONTRIBUTING: ["CONTRIBUTING.md", ".github/CONTRIBUTING.md"],
  CODE_OF_CONDUCT: ["CODE_OF_CONDUCT.md", ".github/CODE_OF_CONDUCT.md"],
  GOVERNANCE: ["GOVERNANCE.md", ".github/GOVERNANCE.md"],
};

const GITHUB_ORG_HOSTS: Record<string, CodeJSON["repositoryHost"]> = {
  cmsgov: "github.com/CMSgov",
  "cms-enterprise": "github.com/CMS-Enterprise",
  "enterprise-cmcs": "github.com/Enterprise-CMCS",
  dsacms: "github.com/DSACMS",
  measureauthoringtool: "github.com/MeasureAuthoringTool",
};

// both write paths go through here so the committed file is byte-identical either way
function serializeCodeJSON(codeJSON: CodeJSON): string {
  return JSON.stringify(codeJSON, null, 2) + "\n";
}

export function createHelpers(deps: Dependencies) {
  const { owner, repo, octokit, adminOctokit, log, setOutput, isArchived } =
    deps;

  //===============================================
  // Meta Data
  //===============================================
  async function calculateMetaData(): Promise<Partial<CodeJSON>> {
    try {
      const [laborHours, basicInfo, version, communityFiles] =
        await Promise.all([
          getLaborHours(),
          getBasicInfo(),
          getVersion(),
          detectCommunityFiles(),
        ]);

      const repositoryHost = deriveRepositoryHost(basicInfo.url);

      return {
        name: basicInfo.title,
        version: version,
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
        },
        maturityModelTier: deriveMaturityTier(
          communityFiles,
          basicInfo.repositoryVisibility,
        ),
        ...(repositoryHost ? { repositoryHost } : {}),
      };
    } catch (error) {
      log.error(`Failed to calculate meta data: ${error}`);
      throw error;
    }
  }

  async function getVersion(): Promise<string> {
    try {
      const release = await octokit.rest.repos.getLatestRelease({
        owner,
        repo,
      });
      const versionFromRelease = normalizeVersionString(release.data.tag_name);

      if (versionFromRelease !== "") {
        return versionFromRelease;
      }

      const releaseName = release.data.name;
      if (typeof releaseName === "string") {
        const versionFromName = normalizeVersionString(releaseName);

        if (versionFromName !== "") {
          return versionFromName;
        }
      }

      log.warning("Latest release did not include a usable version string.");
    } catch (error) {
      log.warning(`Failed to fetch latest release version: ${error}`);
    }

    return "";
  }

  function normalizeVersionString(value: string): string {
    const trimmedValue = value.trim();

    if (trimmedValue.length > 1 && /^v\d/i.test(trimmedValue)) {
      return trimmedValue.replace(/^v/i, "");
    }

    return trimmedValue;
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
        },
      };
    } catch (error) {
      log.error(`Failed to get basic info: ${error}`);
      throw error;
    }
  }

  async function getLaborHours(): Promise<number> {
    try {
      const { stdout } = await deps.exec(
        `scc /github/workspace --format json2`,
      );
      const sccData = JSON.parse(stdout);

      const laborHours = Math.ceil(
        sccData["estimatedScheduleMonths"] * HOURS_PER_MONTH,
      );
      return laborHours;
    } catch (error) {
      log.error(`Failed to get labor hours: ${error}`);
      throw error;
    }
  }

  //===============================================
  // Reused Code
  //===============================================
  async function detectReusedCode(): Promise<ReusedCodeEntry[]> {
    const [packageJSON, requirements] = await Promise.all([
      readManifest("/github/workspace/package.json"),
      readManifest("/github/workspace/requirements.txt"),
    ]);

    // npm and PyPI normalize package names differently, so each ecosystem is
    // resolved through its own lookup.
    const detected: Array<ReusedCodeEntry | undefined> = [];
    if (packageJSON) {
      for (const name of parsePackageJSON(packageJSON)) {
        detected.push(lookupGovDependency(name));
      }
    }
    if (requirements) {
      for (const name of parseRequirementsTxt(requirements)) {
        detected.push(lookupPyPIGovDependency(name));
      }
    }

    const entries: ReusedCodeEntry[] = [];
    const seen = new Set<string>();
    for (const entry of detected) {
      if (entry && !seen.has(entry.URL)) {
        seen.add(entry.URL);
        entries.push(entry);
      }
    }
    return entries;
  }

  async function readManifest(filepath: string): Promise<string | null> {
    try {
      return await deps.readFile(filepath);
    } catch {
      return null;
    }
  }

  async function detectCommunityFiles(): Promise<Set<string>> {
    const found = await Promise.all(
      Object.entries(COMMUNITY_FILE_CANDIDATES).map(
        async ([document, candidates]) => {
          for (const candidate of candidates) {
            const content = await readManifest(
              `${WORKSPACE_PATH}/${candidate}`,
            );
            if (content !== null) {
              return document;
            }
          }
          return null;
        },
      ),
    );

    return new Set(
      found.filter((document): document is string => document !== null),
    );
  }

  async function readREADME(): Promise<string | null> {
    for (const candidate of COMMUNITY_FILE_CANDIDATES.README) {
      const content = await readManifest(`${WORKSPACE_PATH}/${candidate}`);
      if (content !== null) {
        return content;
      }
    }

    return null;
  }

  //===============================================
  // Fork Upstream
  //===============================================
  async function detectForkParent(): Promise<ReusedCodeEntry | null> {
    try {
      const repoData = await octokit.rest.repos.get({ owner, repo });
      const { fork, parent } = repoData.data;

      if (!fork || !parent) return null;

      return {
        name: parent.full_name,
        URL: parent.html_url,
      };
    } catch (error) {
      log.error(`Failed to detect fork parent: ${error}`);
      return null;
    }
  }

  async function getBaseBranch(): Promise<string> {
    if (deps.branch) {
      return deps.branch;
    }

    try {
      const repoData = await octokit.rest.repos.get({ owner, repo });
      return repoData.data.default_branch;
    } catch (error) {
      log.error(`Failed to get Base Branch Name: ${error}`);
      throw error;
    }
  }

  //===============================================
  // Validation
  //===============================================
  async function validateOnly(): Promise<void> {
    try {
      const codeJSON = await readJSON("/github/workspace/code.json");

      if (!codeJSON) {
        deps.setFailed(
          "code.json file not found, is empty, or contains invalid JSON syntax...",
        );
        return;
      }

      const validationErrors = validateCodeJSON(codeJSON);

      if (validationErrors.length > 0) {
        const errorMessage = `code.json validation failed with ${validationErrors.length} error(s):\n\n${validationErrors.map((err, idx) => `${idx + 1}. ${err}`).join("\n")}`;
        deps.setFailed(errorMessage);
        return;
      }

      log.info("code.json is valid!");
    } catch (error) {
      deps.setFailed(`validation error: ${error}`);
    }
  }

  //===============================================
  // Data Handling
  //===============================================
  async function readJSON(filepath: string): Promise<CodeJSON | null> {
    try {
      const fileContent = await deps.readFile(filepath);
      return JSON.parse(fileContent) as CodeJSON;
    } catch (error) {
      console.log(`Error with reading JSON file: ${error}`);
      return null;
    }
  }

  async function sendPR(updatedCodeJSON: CodeJSON, baseBranchName: string) {
    try {
      const formattedContent = serializeCodeJSON(updatedCodeJSON);
      const headBranchName = `code-json-${new Date().getTime()}`;

      const PR = await octokit.createPullRequest({
        owner,
        repo,
        title: isArchived
          ? "Update code.json for archival"
          : "Update code.json",
        body: isArchived ? bodyOfArchivalPR() : bodyOfPR(),
        base: baseBranchName,
        head: headBranchName,
        labels: isArchived ? ["archived"] : ["codejson-initialized"],
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
        log.info(`Successfully created PR: ${PR.data.html_url}`);

        setOutput("updated", true);
        setOutput("pr_url", PR.data.html_url);
        setOutput("method_used", "pull_request");
      } else {
        log.error(`Failed to create PR because of PR object`);
        setOutput("updated", false);
      }
    } catch (error) {
      log.error(`Failed to create PR: ${error}`);
    }
  }

  async function pushDirectlyWithPAT(
    updatedCodeJSON: CodeJSON,
    baseBranchName: string,
  ): Promise<boolean> {
    if (!adminOctokit) {
      log.error("Admin token not provided for direct push");
      return false;
    }

    try {
      const formattedContent = serializeCodeJSON(updatedCodeJSON);

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
        log.info(`code.json doesn't exist yet, will create new file ${error}`);
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

      log.info(
        `Successfully pushed commit with PAT: ${result.data.commit.sha}`,
      );

      setOutput("updated", true);
      setOutput("commit_sha", result.data.commit.sha);
      setOutput("method_used", "direct_push");
      return true;
    } catch (error) {
      log.error(`Failed to push directly with PAT: ${error}`);
      return false;
    }
  }

  async function pushDirectlyWithFallback(
    updatedCodeJSON: CodeJSON,
    baseBranchName: string,
  ) {
    if (!deps.adminToken) {
      log.error(
        "SKIP_PR is enabled but ADMIN_TOKEN is not provided. Direct push requires an admin PAT.",
      );
      log.info("Falling back to creating a pull request");

      await sendPR(updatedCodeJSON, baseBranchName);
      return;
    }

    log.info("Attempting direct push with admin PAT!");

    const directPushSuccess = await pushDirectlyWithPAT(
      updatedCodeJSON,
      baseBranchName,
    );

    if (!directPushSuccess) {
      log.info(
        "Direct push with PAT failed, falling back to creating a pull request",
      );
      await sendPR(updatedCodeJSON, baseBranchName);
    }
  }

  return {
    calculateMetaData,
    detectCommunityFiles,
    readREADME,
    detectReusedCode,
    detectForkParent,
    mergeReusedCode,
    getBaseBranch,
    validateOnly,
    validateCodeJSON,
    readJSON,
    sendPR,
    pushDirectlyWithFallback,
    mergeTags,
  };
}

// export the type for convenience
export type Helpers = ReturnType<typeof createHelpers>;

export function parsePackageJSON(content: string): string[] {
  try {
    const pkg = JSON.parse(content);
    return [
      ...Object.keys(pkg.dependencies ?? {}),
      ...Object.keys(pkg.devDependencies ?? {}),
    ];
  } catch {
    return [];
  }
}

// strips version specifiers, extras, markers and comments, leaving the bare package name
export function parseRequirementsTxt(content: string): string[] {
  const names: string[] = [];
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.split("#")[0].trim();
    if (!line || line.startsWith("-")) continue;
    const match = line.match(/^[A-Za-z0-9._-]+/);
    if (match) names.push(match[0]);
  }
  return names;
}

// keeps existing entries (manual edits) and appends detected ones, de-duped by name and URL
export function mergeReusedCode(
  existing: Array<{ name?: string; URL?: string }>,
  detected: ReusedCodeEntry[],
): Array<{ name?: string; URL?: string }> {
  const base = Array.isArray(existing) ? existing : [];
  const merged = [...base];
  const seenURLs = new Set(
    base.map((e) => e.URL?.toLowerCase()).filter(Boolean),
  );
  const seenNames = new Set(
    base.map((e) => e.name?.toLowerCase()).filter(Boolean),
  );

  for (const entry of detected) {
    const url = entry.URL.toLowerCase();
    const name = entry.name.toLowerCase();
    if (seenURLs.has(url) || seenNames.has(name)) continue;
    merged.push(entry);
    seenURLs.add(url);
    seenNames.add(name);
  }

  return merged;
}

// reads the hosting organization off the repository URL
export function deriveRepositoryHost(
  repositoryURL: string,
): CodeJSON["repositoryHost"] | undefined {
  let url: URL;
  try {
    url = new URL(repositoryURL);
  } catch {
    return undefined;
  }

  if (url.hostname === "github.cms.gov") {
    return "github.cms.gov";
  }

  if (url.hostname !== "github.com" && url.hostname !== "www.github.com") {
    return undefined;
  }

  const organization = url.pathname.split("/").filter(Boolean)[0];
  if (!organization) {
    return undefined;
  }

  return GITHUB_ORG_HOSTS[organization.toLowerCase()];
}

export function deriveUsageType(
  repositoryVisibility: "public" | "private" | undefined,
): CodeJSON["permissions"]["usageType"] {
  return repositoryVisibility === "public" ? ["openSource"] : [];
}

export function deriveMaturityTier(
  presentFiles: Set<string>,
  repositoryVisibility: "public" | "private" | undefined,
): 0 | 1 | 2 | 3 | 4 {
  if (presentFiles.has("GOVERNANCE")) {
    return 4;
  }

  if (presentFiles.has("CONTRIBUTING") && presentFiles.has("CODE_OF_CONDUCT")) {
    return repositoryVisibility === "public" ? 3 : 2;
  }

  if (presentFiles.has("SECURITY")) {
    return 1;
  }

  return 0;
}

// combines repository topics with existing manually added tags, de-duped
export function mergeTags(
  repositoryTopics: string[] = [],
  existingTags: string[] = [],
): string[] {
  return Array.from(new Set([...repositoryTopics, ...existingTags]));
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

function bodyOfArchivalPR(): string {
  return `
  ## Archiving the Repository

  Hello, and thank you for your contributions to the Federal Open Source Community. 🙏
  
  As part of preparing the repository for archival, this pull request marks the repository for archival and ensures code.json repository metadata is up-to-date.

  If you have questions, please file an issue [here](https://github.com/DSACMS/automated-codejson-generator/issues) or join our #cms-ospo slack channel [here](https://cmsgov.enterprise.slack.com/archives/C07HM92S9QQ).

  ## Next Steps
  ### Verify project metadata in code.json
  - Review all fields to ensure metadata is correct and accurate
  - We have automatically updated some fields but some require manual input. Please update fields by directly editing code.json in Files Changed tab on your pull-request
  - We also have a [form](https://dsacms.github.io/codejson-generator/) where you can create your code.json via a website, and then download directly to your local machine, and then you can copy and paste into here.

  If you would like additional information about the code.json metadata requirements, please visit the repository [here](https://github.com/DSACMS/gov-codejson).
  `;
}
