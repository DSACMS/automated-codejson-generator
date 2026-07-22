import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { runWithDeps, filterValidFields, getMetaData } from "../../main.js";
import { createHelpers } from "../../helper.js";
import { createMockDeps, createMockOctokit } from "../fixtures/mock-deps.js";
import validCodeJSON from "../fixtures/test-code.json";

describe("filterValidFields", () => {
  it("keeps known fields", () => {
    const result = filterValidFields({
      name: "test",
      version: "1.0",
      description: "hi",
    });
    expect(result).toHaveProperty("name", "test");
    expect(result).toHaveProperty("version", "1.0");
  });

  it("strips unknown fields", () => {
    const result = filterValidFields({ name: "test", unknownField: "bad" });
    expect(result).toHaveProperty("name");
    expect(result).not.toHaveProperty("unknownField");
  });
});

describe("getMetaData", () => {
  it("preserves existing feedbackMechanism", async () => {
    const deps = createMockDeps();
    const helpers = createHelpers(deps);

    const existing = {
      ...validCodeJSON,
      feedbackMechanism: "https://custom.example.com/feedback",
    } as any;
    const result = await getMetaData(helpers, deps, existing);

    expect(result.feedbackMechanism).toBe(
      "https://custom.example.com/feedback",
    );
  });

  it("defaults feedbackMechanism to issues URL", async () => {
    const deps = createMockDeps();
    const helpers = createHelpers(deps);

    const result = await getMetaData(helpers, deps, null);

    expect(result.feedbackMechanism).toContain("/issues");
  });

  it("sets Archival status when isArchived", async () => {
    const deps = createMockDeps({ isArchived: true });
    const helpers = createHelpers(deps);

    const result = await getMetaData(helpers, deps, validCodeJSON as any);

    expect(result.status).toBe("Archival");
    expect(result.tags).toContain("archived");
  });

  it("converts legacy string contractNumber to array", async () => {
    const deps = createMockDeps();
    const helpers = createHelpers(deps);

    const existing = { ...validCodeJSON, contractNumber: "LEGACY-001" } as any;
    const result = await getMetaData(helpers, deps, existing);

    expect(result.contractNumber).toEqual(["LEGACY-001"]);
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

    const result = await getMetaData(helpers, deps, null);

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

    const result = await getMetaData(helpers, deps, existing);

    expect(result.tags).toEqual(["test", "automation", "featured"]);
  });

  it("does not duplicate tags that already exist as repository topics", async () => {
    const deps = createMockDeps();
    const helpers = createHelpers(deps);

    const existing = {
      ...validCodeJSON,
      tags: ["test", "featured"],
    } as any;

    const result = await getMetaData(helpers, deps, existing);

    expect(result.tags).toEqual(["test", "automation", "featured"]);
  });

  it("uses repository topics when no existing code.json is present", async () => {
    const deps = createMockDeps();
    const helpers = createHelpers(deps);

    const result = await getMetaData(helpers, deps, null);

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

  it("attempts direct push when skipPR is true with admin token", async () => {
    process.env.GITHUB_EVENT_NAME = "workflow_dispatch";

    const adminOctokit = {
      rest: {
        repos: {
          get: jest
            .fn<any>()
            .mockResolvedValue({ data: { default_branch: "main" } }),
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
