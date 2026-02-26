import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { createHelpers } from "../../helper.js";
import { createMockDeps, createMockOctokit } from "../fixtures/mock-deps.js";
import { Dependencies } from "../../types/Dependencies.js";

describe("createHelpers - calculateMetaData", () => {
  let deps: Dependencies;

  beforeEach(() => {
    deps = createMockDeps();
  });

  it("returns metadata from GitHub API and SCC", async () => {
    const helpers = createHelpers(deps);
    const result = await helpers.calculateMetaData();

    expect(result.name).toBe("test-repo");
    expect(result.description).toBe("A test repository");
    expect(result.repositoryURL).toBe("https://github.com/test-owner/test-repo");
    expect(result.repositoryVisibility).toBe("public");
    expect(result.languages).toEqual(["TypeScript", "JavaScript"]);
    expect(result.laborHours).toBeGreaterThan(0);
    expect(result.reuseFrequency?.forks).toBe(5);
    expect(result.tags).toEqual(["test", "automation"]);
  });

  it("reports private visibility for private repos", async () => {
    const mockOctokit = createMockOctokit({
      rest: {
        repos: {
          get: jest.fn<any>().mockResolvedValue({
            data: {
              name: "private-repo",
              description: "Secret stuff",
              html_url: "https://github.com/test-owner/private-repo",
              private: true,
              forks_count: 0,
              topics: [],
              created_at: "2024-01-01T00:00:00Z",
              updated_at: "2024-06-01T00:00:00Z",
              default_branch: "main",
            },
          }),
        },
      },
    });

    deps = createMockDeps({ octokit: mockOctokit });
    const helpers = createHelpers(deps);
    const result = await helpers.calculateMetaData();

    expect(result.repositoryVisibility).toBe("private");
  });

  it("handles SCC failure gracefully", async () => {
    deps = createMockDeps({
      exec: jest.fn<any>().mockRejectedValue(new Error("scc not found")),
    });

    const helpers = createHelpers(deps);
    await expect(helpers.calculateMetaData()).rejects.toThrow("scc not found");
    expect(deps.log.error).toHaveBeenCalled();
  });
});

describe("createHelpers - getBaseBranch", () => {
  it("returns configured branch when provided", async () => {
    const deps = createMockDeps({ branch: "develop" });
    const helpers = createHelpers(deps);

    expect(await helpers.getBaseBranch()).toBe("develop");
  });

  it("fetches default branch from API when not configured", async () => {
    const deps = createMockDeps({ branch: "" });
    const helpers = createHelpers(deps);

    expect(await helpers.getBaseBranch()).toBe("main");
    expect(deps.octokit.rest.repos.get).toHaveBeenCalled();
  });
});

describe("createHelpers - readJSON", () => {
  it("parses valid JSON from file", async () => {
    const mockData = { name: "test", version: "1.0" };
    const deps = createMockDeps({
      readFile: jest.fn<any>().mockResolvedValue(JSON.stringify(mockData)),
    });
    const helpers = createHelpers(deps);

    const result = await helpers.readJSON("/some/path/code.json");
    expect(result).toEqual(mockData);
  });

  it("returns null for missing files", async () => {
    const deps = createMockDeps({
      readFile: jest.fn<any>().mockRejectedValue(new Error("ENOENT")),
    });
    const helpers = createHelpers(deps);

    const result = await helpers.readJSON("/missing/code.json");
    expect(result).toBeNull();
  });

  it("returns null for invalid JSON", async () => {
    const deps = createMockDeps({
      readFile: jest.fn<any>().mockResolvedValue("not json {{{"),
    });
    const helpers = createHelpers(deps);

    const result = await helpers.readJSON("/bad/code.json");
    expect(result).toBeNull();
  });
});

describe("createHelpers - sendPR", () => {
  it("creates a PR and sets outputs", async () => {
    const deps = createMockDeps();
    const helpers = createHelpers(deps);

    const fakeCodeJSON = { name: "test" } as any;
    await helpers.sendPR(fakeCodeJSON, "main");

    expect(deps.octokit.createPullRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        owner: "test-owner",
        repo: "test-repo",
        base: "main",
        title: "Update code.json",
      }),
    );
    expect(deps.setOutput).toHaveBeenCalledWith("updated", true);
    expect(deps.setOutput).toHaveBeenCalledWith("method_used", "pull_request");
  });

  it("uses archival title and labels when archived", async () => {
    const deps = createMockDeps({ isArchived: true });
    const helpers = createHelpers(deps);

    await helpers.sendPR({ name: "test" } as any, "main");

    expect(deps.octokit.createPullRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Update code.json for archival",
        labels: ["archived"],
      }),
    );
  });
});

describe("createHelpers - pushDirectlyWithFallback", () => {
  it("falls back to PR when no admin token", async () => {
    const deps = createMockDeps({ adminToken: "" });
    const helpers = createHelpers(deps);

    await helpers.pushDirectlyWithFallback({ name: "test" } as any, "main");

    // Should have fallen back to PR
    expect(deps.octokit.createPullRequest).toHaveBeenCalled();
    expect(deps.log.error).toHaveBeenCalledWith(
      expect.stringContaining("ADMIN_TOKEN is not provided"),
    );
  });

  it("pushes directly when admin token is available", async () => {
    const adminOctokit = createMockOctokit();
    const deps = createMockDeps({
      adminToken: "admin-pat-token",
      adminOctokit,
    });
    const helpers = createHelpers(deps);

    await helpers.pushDirectlyWithFallback({ name: "test" } as any, "main");

    expect(adminOctokit.rest.repos.createOrUpdateFileContents).toHaveBeenCalled();
    expect(deps.setOutput).toHaveBeenCalledWith("method_used", "direct_push");
  });
});

describe("createHelpers - validateOnly", () => {
  it("fails when code.json is missing", async () => {
    const deps = createMockDeps({
      readFile: jest.fn<any>().mockRejectedValue(new Error("ENOENT")),
    });
    const helpers = createHelpers(deps);

    await helpers.validateOnly();

    expect(deps.setFailed).toHaveBeenCalledWith(
      expect.stringContaining("code.json file not found"),
    );
  });

  it("succeeds for valid code.json", async () => {
    const validCodeJSON = await import("../fixtures/test-code.json");
    const deps = createMockDeps({
      readFile: jest.fn<any>().mockResolvedValue(JSON.stringify(validCodeJSON.default ?? validCodeJSON)),
    });
    const helpers = createHelpers(deps);

    await helpers.validateOnly();

    expect(deps.setFailed).not.toHaveBeenCalled();
    expect(deps.log.info).toHaveBeenCalledWith("code.json is valid!");
  });
});