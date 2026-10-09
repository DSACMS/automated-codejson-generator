import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { runWithDeps, getMetaData } from "../../main.js";
import { createHelpers } from "../../helper.js";
import { Dependencies } from "../../types/Dependencies.js";
import { createMockDeps, createMockOctokit } from "../fixtures/mock-deps.js";
import validCodeJSON from "../fixtures/test-code.json";

// reads back the code.json this action actually shipped in its pull request
function generatedCodeJSON(deps: Dependencies): any {
  const createPullRequestMock = deps.octokit.createPullRequest as jest.Mock;
  const pullRequestArgs = createPullRequestMock.mock.calls[0][0] as any;
  return JSON.parse(pullRequestArgs.changes[0].files["code.json"]);
}

// runs the action against an existing code.json plus any other repository files and returns the code.json it shipped
async function generateFrom(
  existing: object | null,
  files: Record<string, string> = {},
  overrides: Partial<Dependencies> = {},
): Promise<any> {
  process.env.GITHUB_EVENT_NAME = "schedule";
  const repoFiles: Record<string, string> = {
    ...(existing
      ? { "/github/workspace/code.json": JSON.stringify(existing) }
      : {}),
    ...files,
  };
  const deps = createMockDeps({
    readFile: jest.fn<any>((filepath: string) =>
      filepath in repoFiles
        ? Promise.resolve(repoFiles[filepath])
        : Promise.reject(new Error("ENOENT")),
    ),
    ...overrides,
  });

  await runWithDeps(deps);

  return generatedCodeJSON(deps);
}

describe("getMetaData", () => {
  it("uses the latest release version when available", async () => {
    const releaseOctokit = createMockOctokit({
      rest: {
        repos: {
          getLatestRelease: jest.fn<any>().mockResolvedValue({
            data: {
              tag_name: "v2.4.6",
              name: "Release 2.4.6",
            },
          }),
        },
      },
    });

    const deps = createMockDeps({ octokit: releaseOctokit });
    const helpers = createHelpers(deps);

    const result = await getMetaData(helpers);

    expect(result.version).toBe("2.4.6");
  });

  it("reports GitHub-detected languages", async () => {
    const deps = createMockDeps();
    const helpers = createHelpers(deps);

    const result = await getMetaData(helpers);

    expect(result.languages).toEqual(["TypeScript", "JavaScript"]);
  });

  it("adds the fork upstream to reusedCode", async () => {
    const forkOctokit = createMockOctokit({
      rest: {
        repos: {
          get: jest.fn<any>().mockResolvedValue({
            data: {
              name: "test-repo",
              description: "A forked repository",
              html_url: "https://github.com/test-owner/test-repo",
              private: false,
              forks_count: 0,
              topics: [],
              created_at: "2024-01-01T00:00:00Z",
              updated_at: "2024-06-01T00:00:00Z",
              default_branch: "main",
              fork: true,
              parent: {
                full_name: "upstream-owner/upstream-repo",
                html_url: "https://github.com/upstream-owner/upstream-repo",
              },
            },
          }),
        },
      },
    });
    const deps = createMockDeps({ octokit: forkOctokit });
    const helpers = createHelpers(deps);

    const result = await getMetaData(helpers);

    expect(result.reusedCode).toContainEqual({
      name: "upstream-owner/upstream-repo",
      URL: "https://github.com/upstream-owner/upstream-repo",
    });
  });

  it("reports repository topics as tags", async () => {
    const deps = createMockDeps();
    const helpers = createHelpers(deps);

    const result = await getMetaData(helpers);

    expect(result.tags).toEqual(["test", "automation"]);
  });

  it("marks a public repository as open source", async () => {
    const result = await getMetaData(createHelpers(createMockDeps()));

    expect(result.permissions?.usageType).toEqual(["openSource"]);
  });

  // licenses and exemptionText are not observations, so core fills them from the existing file or the baseline
  it("reports only usageType under permissions", async () => {
    const result = await getMetaData(createHelpers(createMockDeps()));

    expect(result.permissions).toEqual({ usageType: ["openSource"] });
  });

  it("derives the maturity tier from the community health files present", async () => {
    const deps = createMockDeps({
      readFile: jest.fn<any>((filepath: string) =>
        filepath === "/github/workspace/GOVERNANCE.md"
          ? Promise.resolve("how this project is governed")
          : Promise.reject(new Error("ENOENT")),
      ),
    });

    const result = await getMetaData(createHelpers(deps));

    expect(result.maturityModelTier).toBe(4);
  });

  it("omits repositoryHost when the repository is not under a known organization", async () => {
    const result = await getMetaData(createHelpers(createMockDeps()));

    expect(result).not.toHaveProperty("repositoryHost");
  });

  it("derives repositoryHost from a recognised organization", async () => {
    const dsacmsOctokit = createMockOctokit({
      rest: {
        repos: {
          get: jest.fn<any>().mockResolvedValue({
            data: {
              name: "test-repo",
              description: "A test repository",
              html_url: "https://github.com/DSACMS/test-repo",
              private: false,
              forks_count: 5,
              topics: [],
              created_at: "2024-01-01T00:00:00Z",
              updated_at: "2024-06-01T00:00:00Z",
              default_branch: "main",
              fork: false,
              parent: null,
            },
          }),
        },
      },
    });

    const deps = createMockDeps({ octokit: dsacmsOctokit });
    const result = await getMetaData(createHelpers(deps));

    expect(result.repositoryHost).toBe("github.com/DSACMS");
  });
});

describe("merging with an existing code.json", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("preserves an existing version when the latest release is unavailable", async () => {
    const releaseOctokit = createMockOctokit({
      rest: {
        repos: {
          getLatestRelease: jest
            .fn<any>()
            .mockRejectedValue(new Error("not found")),
        },
      },
    });

    const generated = await generateFrom(
      { ...validCodeJSON, version: "7.8.9" },
      {},
      { octokit: releaseOctokit },
    );

    expect(generated.version).toBe("7.8.9");
  });

  it("preserves existing languages over GitHub-detected languages", async () => {
    const generated = await generateFrom({
      ...validCodeJSON,
      languages: ["TypeScript", "Markdown"],
    });

    expect(generated.languages).toEqual(["TypeScript", "Markdown"]);
  });

  it("preserves existing tags that are not repository topics", async () => {
    const generated = await generateFrom({
      ...validCodeJSON,
      tags: ["featured"],
    });

    expect(generated.tags).toEqual(["featured", "test", "automation"]);
  });

  it("does not duplicate tags that already exist as repository topics", async () => {
    const generated = await generateFrom({
      ...validCodeJSON,
      tags: ["test", "featured"],
    });

    expect(generated.tags).toEqual(["test", "featured", "automation"]);
  });

  it("preserves an existing usageType rather than reclassifying it", async () => {
    const generated = await generateFrom({
      ...validCodeJSON,
      permissions: {
        licenses: [{ name: "MIT", URL: "https://example.gov/license" }],
        usageType: ["exemptByAgencyMission"],
        exemptionText: "sharing would risk agency operations",
      },
    });

    expect(generated.permissions.usageType).toEqual(["exemptByAgencyMission"]);
  });

  it("carries existing licenses and exemption text through untouched", async () => {
    const generated = await generateFrom({
      ...validCodeJSON,
      permissions: {
        licenses: [{ name: "MIT", URL: "https://example.gov/license" }],
        usageType: [],
        exemptionText: "left over from an earlier exemption",
      },
    });

    expect(generated.permissions).toEqual({
      licenses: [{ name: "MIT", URL: "https://example.gov/license" }],
      usageType: ["openSource"],
      exemptionText: "left over from an earlier exemption",
    });
  });

  it("defaults licenses to the draft baseline for a new repository", async () => {
    const generated = await generateFrom(null);

    expect(generated.permissions.licenses).toEqual([
      { name: "CC0-1.0", URL: "" },
    ]);
  });

  it("preserves a maturity tier a human has already set", async () => {
    const generated = await generateFrom({
      ...validCodeJSON,
      maturityModelTier: 2,
    });

    expect(generated.maturityModelTier).toBe(2);
  });

  // every file this action has generated before carries the baseline 0, so a zero has to
  // count as unset or the field could never be filled on a later run
  it("treats a maturity tier of 0 as unset", async () => {
    const generated = await generateFrom(
      { ...validCodeJSON, maturityModelTier: 0 },
      { "/github/workspace/SECURITY.md": "report issues here" },
    );

    expect(generated.maturityModelTier).toBe(1);
  });

  it("preserves an existing repositoryHost the URL cannot confirm", async () => {
    const generated = await generateFrom({
      ...validCodeJSON,
      repositoryHost: "CCSQ GitHub",
    });

    expect(generated.repositoryHost).toBe("CCSQ GitHub");
  });
});

describe("runWithDeps", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("validates only on pull_request events", async () => {
    process.env.GITHUB_EVENT_NAME = "pull_request";

    const deps = createMockDeps({
      readFile: jest.fn<any>().mockResolvedValue(JSON.stringify(validCodeJSON)),
    });

    await runWithDeps(deps);

    expect(deps.log.info).toHaveBeenCalledWith(
      expect.stringContaining("validating only"),
    );
    // Should not attempt to create PR
    expect(deps.octokit.createPullRequest).not.toHaveBeenCalled();
  });

  it("creates PR on schedule event", async () => {
    process.env.GITHUB_EVENT_NAME = "schedule";

    const deps = createMockDeps({
      readFile: jest.fn<any>().mockRejectedValue(new Error("no file")),
      skipPR: false,
    });

    await runWithDeps(deps);

    expect(deps.octokit.createPullRequest).toHaveBeenCalled();
    expect(deps.setOutput).toHaveBeenCalledWith("method_used", "pull_request");
  });

  it("includes enum keys in the generated blank code.json", async () => {
    process.env.GITHUB_EVENT_NAME = "schedule";

    const deps = createMockDeps({
      readFile: jest.fn<any>().mockRejectedValue(new Error("no file")),
      skipPR: false,
    });

    await runWithDeps(deps);

    const generated = generatedCodeJSON(deps);

    expect(generated).toHaveProperty("status");
    expect(generated).toHaveProperty("repositoryHost");
    expect(generated).toHaveProperty("repositoryVisibility");
    expect(generated).toHaveProperty("softwareType");
    expect(generated).toHaveProperty("maintenance");
    expect(generated).toHaveProperty("repositoryType");
    expect(generated).toHaveProperty("fismaLevel");
  });

  it("reports what is still missing but ships the draft anyway", async () => {
    process.env.GITHUB_EVENT_NAME = "schedule";

    const deps = createMockDeps({
      readFile: jest.fn<any>().mockRejectedValue(new Error("no file")),
    });

    await runWithDeps(deps);

    expect(deps.log.warning).toHaveBeenCalledWith(
      expect.stringContaining("still needs manual input"),
    );
    expect(deps.setFailed).not.toHaveBeenCalled();
    expect(deps.octokit.createPullRequest).toHaveBeenCalled();
  });

  it("skips AI enrichment when no model is available, logging why", async () => {
    process.env.GITHUB_EVENT_NAME = "schedule";

    const deps = createMockDeps({
      enableAI: true,
      readFile: jest.fn<any>().mockRejectedValue(new Error("no file")),
    });

    await runWithDeps(deps);

    expect(deps.log.info).toHaveBeenCalledWith(
      expect.stringContaining("No model found at"),
    );
    expect(deps.octokit.createPullRequest).toHaveBeenCalled();
  });

  it("skips model generation entirely when the existing code.json has nothing left to enrich", async () => {
    process.env.GITHUB_EVENT_NAME = "schedule";

    const deps = createMockDeps({
      enableAI: true,
      readFile: jest.fn<any>().mockResolvedValue(JSON.stringify(validCodeJSON)),
    });

    await runWithDeps(deps);

    expect(deps.log.info).toHaveBeenCalledWith(
      expect.stringContaining("No AI-enrichable fields are missing"),
    );
    expect(generatedCodeJSON(deps).longDescription).toBe(
      validCodeJSON.longDescription,
    );
  });

  it("never runs the model when AI is not enabled", async () => {
    process.env.GITHUB_EVENT_NAME = "schedule";

    const runModel = jest.fn<any>();
    const deps = createMockDeps({ runModel });

    await runWithDeps(deps);

    expect(runModel).not.toHaveBeenCalled();
    expect(deps.octokit.createPullRequest).toHaveBeenCalled();
  });

  it("defaults feedbackMechanism and SBOM to the repository URL", async () => {
    process.env.GITHUB_EVENT_NAME = "schedule";

    const deps = createMockDeps({
      readFile: jest.fn<any>().mockRejectedValue(new Error("no file")),
    });

    await runWithDeps(deps);

    const generated = generatedCodeJSON(deps);

    expect(generated.feedbackMechanism).toBe(
      "https://github.com/test-owner/test-repo/issues",
    );
    expect(generated.SBOM).toBe(
      "https://github.com/test-owner/test-repo/network/dependencies",
    );
  });

  it("preserves an existing feedbackMechanism", async () => {
    process.env.GITHUB_EVENT_NAME = "schedule";

    const existing = {
      ...validCodeJSON,
      feedbackMechanism: "https://custom.example.com/feedback",
    };
    const deps = createMockDeps({
      readFile: jest.fn<any>().mockResolvedValue(JSON.stringify(existing)),
    });

    await runWithDeps(deps);

    expect(generatedCodeJSON(deps).feedbackMechanism).toBe(
      "https://custom.example.com/feedback",
    );
  });

  it("converts a legacy string contractNumber to an array", async () => {
    process.env.GITHUB_EVENT_NAME = "schedule";

    const existing = { ...validCodeJSON, contractNumber: "LEGACY-001" };
    const deps = createMockDeps({
      readFile: jest.fn<any>().mockResolvedValue(JSON.stringify(existing)),
    });

    await runWithDeps(deps);

    expect(generatedCodeJSON(deps).contractNumber).toEqual(["LEGACY-001"]);
  });

  it("drops and reports fields that are no longer part of the schema", async () => {
    process.env.GITHUB_EVENT_NAME = "schedule";

    const existing = { ...validCodeJSON, retiredField: "stale" };
    const deps = createMockDeps({
      readFile: jest.fn<any>().mockResolvedValue(JSON.stringify(existing)),
    });

    await runWithDeps(deps);

    expect(deps.log.info).toHaveBeenCalledWith(
      expect.stringContaining("Removing outdated field"),
    );
    expect(generatedCodeJSON(deps)).not.toHaveProperty("retiredField");
  });

  it("sets Archival status and tags the repository when archived", async () => {
    process.env.GITHUB_EVENT_NAME = "workflow_dispatch";

    const deps = createMockDeps({
      readFile: jest.fn<any>().mockResolvedValue(JSON.stringify(validCodeJSON)),
      isArchived: true,
    });

    await runWithDeps(deps);

    const generated = generatedCodeJSON(deps);

    expect(generated.status).toBe("Archival");
    expect(generated.tags).toContain("archived");
  });

  it("attempts direct push when skipPR is true with admin token", async () => {
    process.env.GITHUB_EVENT_NAME = "workflow_dispatch";

    const adminOctokit = {
      rest: {
        repos: {
          get: jest
            .fn<any>()
            .mockResolvedValue({ data: { default_branch: "main" } }),
          getLatestRelease: jest.fn<any>().mockResolvedValue({
            data: {
              tag_name: "v1.2.1",
              name: "v1.2.1",
            },
          }),
          listLanguages: jest.fn<any>().mockResolvedValue({ data: {} }),
          getContent: jest
            .fn<any>()
            .mockResolvedValue({ data: { sha: "abc" } }),
          createOrUpdateFileContents: jest.fn<any>().mockResolvedValue({
            data: { commit: { sha: "pushed123" } },
          }),
        },
      },
      createPullRequest: jest.fn<any>(),
    };

    const deps = createMockDeps({
      skipPR: true,
      adminToken: "admin-token",
      adminOctokit,
    });

    await runWithDeps(deps);

    expect(
      adminOctokit.rest.repos.createOrUpdateFileContents,
    ).toHaveBeenCalled();
    expect(deps.setOutput).toHaveBeenCalledWith("method_used", "direct_push");
  });

  it("opens a PR instead of pushing directly when the model filled a field", async () => {
    process.env.GITHUB_EVENT_NAME = "workflow_dispatch";

    const runModel = jest.fn<any>(async (_log: unknown, run: any) =>
      run({
        generateText: jest.fn<any>().mockResolvedValue(""),
        generateJSON: jest.fn<any>().mockResolvedValue({
          tags: ["alpha", "beta", "gamma", "delta", "epsilon"],
        }),
      }),
    );
    const adminOctokit = createMockOctokit();
    const deps = createMockDeps({
      skipPR: true,
      adminToken: "admin-token-value",
      adminOctokit,
      enableAI: true,
      runModel,
    });

    await runWithDeps(deps);

    expect(runModel).toHaveBeenCalled();
    expect(
      adminOctokit.rest.repos.createOrUpdateFileContents,
    ).not.toHaveBeenCalled();
    expect(deps.setOutput).toHaveBeenCalledWith("method_used", "pull_request");
    const pullRequestArgs = (deps.octokit.createPullRequest as jest.Mock).mock
      .calls[0][0] as any;
    expect(pullRequestArgs.body).toContain("`tags`");
  });

  it("falls back to PR when skipPR but no admin token", async () => {
    process.env.GITHUB_EVENT_NAME = "schedule";

    const deps = createMockDeps({
      skipPR: true,
      adminToken: "",
    });

    await runWithDeps(deps);

    expect(deps.log.warning).toHaveBeenCalledWith(
      expect.stringContaining("ADMIN_TOKEN is not provided"),
    );
    expect(deps.octokit.createPullRequest).toHaveBeenCalled();
  });

  it("sets failed on unexpected errors", async () => {
    process.env.GITHUB_EVENT_NAME = "schedule";

    const deps = createMockDeps({
      exec: jest.fn<any>().mockRejectedValue(new Error("catastrophic failure")),
    });

    await runWithDeps(deps);

    expect(deps.setFailed).toHaveBeenCalledWith(
      expect.stringContaining("Action failed"),
    );
  });
});
