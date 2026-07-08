// abstracting external dependencies
export interface Dependencies {
  owner: string;
  repo: string;

  githubToken: string;
  adminToken: string;
  branch: string;
  skipPR: boolean;
  isArchived: boolean;

  octokit: OctokitClient;
  adminOctokit: OctokitClient | null;

  exec: (command: string) => Promise<{ stdout: string; stderr: string }>;
  readFile: (filepath: string) => Promise<string>;

  log: Logger;

  setOutput: (name: string, value: unknown) => void;
  setFailed: (message: string) => void;
}

export interface Logger {
  info: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  debug: (message: string) => void;
}

export interface OctokitClient {
  rest: {
    repos: {
      get: (params: { owner: string; repo: string }) => Promise<RepoResponse>;
      listLanguages: (params: { owner: string; repo: string }) => Promise<LanguagesResponse>;
      getContent: (params: { owner: string; repo: string; path: string; ref: string }) => Promise<ContentResponse>;
      createOrUpdateFileContents: (params: {
        owner: string;
        repo: string;
        path: string;
        message: string;
        content: string;
        branch: string;
        sha?: string;
      }) => Promise<CommitResponse>;
    };
  };
  createPullRequest: (params: {
    owner: string;
    repo: string;
    title: string;
    body: string;
    base: string;
    head: string;
    labels: string[];
    changes: Array<{
      files: Record<string, string>;
      commit: string;
    }>;
  }) => Promise<{ data: { html_url: string } } | null>;
}

export interface RepoResponse {
  data: {
    name: string;
    description: string | null;
    html_url: string;
    private: boolean;
    forks_count: number;
    topics?: string[];
    created_at: string;
    updated_at: string;
    default_branch: string;
    fork?: boolean;
    parent?: {
      full_name: string;
      html_url: string;
    } | null;
  };
}

export interface LanguagesResponse {
  data: Record<string, number>;
}

export interface ContentResponse {
  data: { sha?: string } | Array<unknown>;
}

export interface CommitResponse {
  data: {
    commit: { sha: string };
  };
}