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

describe("getMetaData", () => {
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

    const deps = createMockDeps({ octokit: releaseOctokit });
    const helpers = createHelpers(deps);

    const existing = {
      ...validCodeJSON,
      version: "7.8.9",
    } as any;
    const result = await getMetaData(helpers, existing);

    expect(result.version).toBe("7.8.9");
  });

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

    const result = await getMetaData(helpers, null);

    expect(result.version).toBe("2.4.6");
  });

  it("preserves existing languages over GitHub-detected languages", async () => {
    const deps = createMockDeps();
    const helpers = createHelpers(deps);

    const existing = {
      ...validCodeJSON,
      languages: ["TypeScript", "Markdown"],
    } as any;
    const result = await getMetaData(helpers, existing);

    expect(result.languages).toEqual(["TypeScript", "Markdown"]);
  });

  it("falls back to GitHub-detected languages when none exist", async () => {
    const deps = createMockDeps();
    const helpers = createHelpers(deps);

    const result = await getMetaData(helpers, null);

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

    const result = await getMetaData(helpers, null);

    expect(result.reusedCode).toContainEqual({
      name: "upstream-owner/upstream-repo",
      URL: "https://github.com/upstream-owner/upstream-repo",
    });
  });

  it("preserves existing tags that are not repository topics", async () => {
    const deps = createMockDeps();
    const helpers = createHelpers(deps);

    const existing = {
      ...validCodeJSON,
      tags: ["featured"],
    } as any;

    const result = await getMetaData(helpers, existing);

    expect(result.tags).toEqual(["test", "automation", "featured"]);
  });

  it("does not duplicate tags that already exist as repository topics", async () => {
    const deps = createMockDeps();
    const helpers = createHelpers(deps);

    const existing = {
      ...validCodeJSON,
      tags: ["test", "featured"],
    } as any;

    const result = await getMetaData(helpers, existing);

    expect(result.tags).toEqual(["test", "automation", "featured"]);
  });

  it("uses repository topics when no existing code.json is present", async () => {
    const deps = createMockDeps();
    const helpers = createHelpers(deps);

    const result = await getMetaData(helpers, null);

    expect(result.tags).toEqual(["test", "automation"]);
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
