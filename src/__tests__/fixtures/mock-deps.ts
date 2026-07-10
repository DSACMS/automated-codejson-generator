import { jest } from "@jest/globals";
import {
  Dependencies,
  OctokitClient,
  Logger,
} from "../../types/Dependencies.js";

export function createMockLogger(): Logger & {
  [K in keyof Logger]: jest.Mock;
} {
  return {
    info: jest.fn<any>(),
    error: jest.fn<any>(),
    warning: jest.fn<any>(),
    debug: jest.fn<any>(),
  };
}

// creates a mock OctokitClient with sensible defaults
export function createMockOctokit(
  overrides: Partial<DeepPartial<OctokitClient>> = {},
): OctokitClient {
  return {
    rest: {
      repos: {
        get:
          (overrides.rest?.repos
            ?.get as OctokitClient["rest"]["repos"]["get"]) ??
          jest.fn<any>().mockResolvedValue({
            data: {
              name: "test-repo",
              description: "A test repository",
              html_url: "https://github.com/test-owner/test-repo",
              private: false,
              forks_count: 5,
              topics: ["test", "automation"],
              created_at: "2024-01-01T00:00:00Z",
              updated_at: "2024-06-01T00:00:00Z",
              default_branch: "main",
              fork: false,
              parent: null,
            },
          }),
        listLanguages:
          (overrides.rest?.repos
            ?.listLanguages as OctokitClient["rest"]["repos"]["listLanguages"]) ??
          jest.fn<any>().mockResolvedValue({
            data: { TypeScript: 5000, JavaScript: 2000 },
          }),
        getContent:
          (overrides.rest?.repos
            ?.getContent as OctokitClient["rest"]["repos"]["getContent"]) ??
          jest.fn<any>().mockResolvedValue({
            data: { sha: "abc123" },
          }),
        createOrUpdateFileContents:
          (overrides.rest?.repos
            ?.createOrUpdateFileContents as OctokitClient["rest"]["repos"]["createOrUpdateFileContents"]) ??
          jest.fn<any>().mockResolvedValue({
            data: { commit: { sha: "def456" } },
          }),
      },
    },
    createPullRequest:
      (overrides.createPullRequest as OctokitClient["createPullRequest"]) ??
      jest.fn<any>().mockResolvedValue({
        data: { html_url: "https://github.com/test-owner/test-repo/pull/1" },
      }),
  };
}

// creates a full mock Dependencies object with sensible defaults
export function createMockDeps(
  overrides: Partial<Dependencies> = {},
): Dependencies {
  const mockOctokit = createMockOctokit();

  return {
    owner: "test-owner",
    repo: "test-repo",
    githubToken: "fake-github-token",
    adminToken: "",
    branch: "main",
    skipPR: false,
    isArchived: false,

    octokit: mockOctokit,
    adminOctokit: null,

    exec: jest.fn<any>().mockResolvedValue({
      stdout: JSON.stringify({ estimatedScheduleMonths: 2.5 }),
      stderr: "",
    }),
    readFile: jest.fn<any>().mockRejectedValue(new Error("File not found")),

    log: createMockLogger(),
    setOutput: jest.fn<any>(),
    setFailed: jest.fn<any>(),

    ...overrides,
  };
}

// helper type for deep partial overrides
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
