import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import {
  createHelpers,
  parsePackageJSON,
  parseRequirementsTxt,
  mergeReusedCode,
  deriveRepositoryHost,
  deriveUsageType,
  deriveMaturityTier,
} from "../../helper.js";
import {
  GOV_DEPENDENCIES,
  GOV_DEPENDENCIES_PYPI,
  normalizePyPIName,
  USWDS,
  USWDS_COMPILE,
  CMS_DESIGN_SYSTEM,
  CMS_DS_HEALTHCARE_GOV,
} from "../../gov-dependencies.js";
import { createMockDeps, createMockOctokit } from "../fixtures/mock-deps.js";
import { Dependencies } from "../../types/Dependencies.js";

const CUMULUS_MESSAGE_ADAPTER = {
  name: "cumulus-message-adapter (NASA)",
  URL: "https://github.com/nasa/cumulus-message-adapter",
};

// returns a readFile mock that serves content by filepath and rejects otherwise
function readFileFrom(files: Record<string, string>) {
  return jest.fn<any>((filepath: string) =>
    filepath in files
      ? Promise.resolve(files[filepath])
      : Promise.reject(new Error("ENOENT")),
  );
}

describe("createHelpers - calculateMetaData", () => {
  let deps: Dependencies;

  beforeEach(() => {
    deps = createMockDeps();
  });

  it("returns metadata from GitHub API and SCC", async () => {
    const helpers = createHelpers(deps);
    const result = await helpers.calculateMetaData();

    expect(result.name).toBe("test-repo");
    expect(result.version).toBe("1.2.1");
    expect(result.description).toBe("A test repository");
    expect(result.repositoryURL).toBe(
      "https://github.com/test-owner/test-repo",
    );
    expect(result.repositoryVisibility).toBe("public");
    expect(result.languages).toEqual(["TypeScript", "JavaScript"]);
    expect(result.laborHours).toBeGreaterThan(0);
    expect(result.reuseFrequency?.forks).toBe(5);
    expect(result.tags).toEqual(["test", "automation"]);
  });

  it("returns an empty version when the release lookup fails", async () => {
    const mockOctokit = createMockOctokit({
      rest: {
        repos: {
          getLatestRelease: jest
            .fn<any>()
            .mockRejectedValue(new Error("rate limited")),
        },
      },
    });

    deps = createMockDeps({ octokit: mockOctokit });
    const helpers = createHelpers(deps);
    const result = await helpers.calculateMetaData();

    expect(result.version).toBe("");
    expect(deps.log.warning).toHaveBeenCalledWith(
      expect.stringContaining("Failed to fetch latest release version"),
    );
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

    expect(
      adminOctokit.rest.repos.createOrUpdateFileContents,
    ).toHaveBeenCalled();
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
      readFile: jest
        .fn<any>()
        .mockResolvedValue(
          JSON.stringify(validCodeJSON.default ?? validCodeJSON),
        ),
    });
    const helpers = createHelpers(deps);

    await helpers.validateOnly();

    expect(deps.setFailed).not.toHaveBeenCalled();
    expect(deps.log.info).toHaveBeenCalledWith("code.json is valid!");
  });
});

describe("parsePackageJSON", () => {
  it("collects dependencies and devDependencies", () => {
    const content = JSON.stringify({
      dependencies: { uswds: "^3.0.0", react: "^18.0.0" },
      devDependencies: { jest: "^29.0.0" },
    });
    expect(parsePackageJSON(content)).toEqual(["uswds", "react", "jest"]);
  });

  it("handles missing dependency sections", () => {
    expect(parsePackageJSON(JSON.stringify({ name: "x" }))).toEqual([]);
  });

  it("returns empty array for invalid JSON", () => {
    expect(parsePackageJSON("not json {{{")).toEqual([]);
  });
});

describe("parseRequirementsTxt", () => {
  it("strips version specifiers, extras, markers and comments", () => {
    const content = [
      "uswds==3.0.0",
      "requests>=2.0  # http client",
      "django[argon2]~=4.2",
      'pytz; python_version < "3.9"',
      "# a comment line",
      "",
      "-r other-requirements.txt",
      "--hash=sha256:abc",
    ].join("\n");

    expect(parseRequirementsTxt(content)).toEqual([
      "uswds",
      "requests",
      "django",
      "pytz",
    ]);
  });
});

describe("createHelpers - detectReusedCode", () => {
  it("matches a known gov dependency from package.json", async () => {
    const deps = createMockDeps({
      readFile: readFileFrom({
        "/github/workspace/package.json": JSON.stringify({
          dependencies: { "@uswds/uswds": "^3.0.0", react: "^18.0.0" },
        }),
      }),
    });

    expect(await createHelpers(deps).detectReusedCode()).toEqual([USWDS]);
  });

  it("matches a known gov dependency from requirements.txt", async () => {
    const deps = createMockDeps({
      readFile: readFileFrom({
        // underscore/mixed-case name should normalize to the hyphenated PyPI key
        "/github/workspace/requirements.txt":
          "Cumulus_Message_Adapter==2.0\nrequests==2.0",
      }),
    });

    expect(await createHelpers(deps).detectReusedCode()).toEqual([
      CUMULUS_MESSAGE_ADAPTER,
    ]);
  });

  it("matches multiple distinct gov dependencies in one manifest", async () => {
    const deps = createMockDeps({
      readFile: readFileFrom({
        "/github/workspace/package.json": JSON.stringify({
          dependencies: {
            "@uswds/uswds": "^3.0.0",
            "@cmsgov/design-system": "^14.0.0",
            react: "^18.0.0",
          },
        }),
      }),
    });

    expect(await createHelpers(deps).detectReusedCode()).toEqual([
      USWDS,
      CMS_DESIGN_SYSTEM,
    ]);
  });

  it("lists @uswds/compile as a separate entry from @uswds/uswds", async () => {
    const deps = createMockDeps({
      readFile: readFileFrom({
        "/github/workspace/package.json": JSON.stringify({
          dependencies: { "@uswds/uswds": "^3.0.0" },
          devDependencies: { "@uswds/compile": "^1.0.0" },
        }),
      }),
    });

    expect(await createHelpers(deps).detectReusedCode()).toEqual([
      USWDS,
      USWDS_COMPILE,
    ]);
  });

  it("lists each CMS dependency individually", async () => {
    const deps = createMockDeps({
      readFile: readFileFrom({
        "/github/workspace/package.json": JSON.stringify({
          dependencies: { "@cmsgov/design-system": "^14.0.0" },
          devDependencies: { "@cmsgov/ds-healthcare-gov": "^18.0.0" },
        }),
      }),
    });

    expect(await createHelpers(deps).detectReusedCode()).toEqual([
      CMS_DESIGN_SYSTEM,
      CMS_DS_HEALTHCARE_GOV,
    ]);
  });

  it("dedupes the same dependency found across both manifests", async () => {
    const deps = createMockDeps({
      readFile: readFileFrom({
        "/github/workspace/package.json": JSON.stringify({
          dependencies: { "@uswds/uswds": "^3.0.0" },
        }),
        "/github/workspace/requirements.txt": "uswds==3.0.0",
      }),
    });

    expect(await createHelpers(deps).detectReusedCode()).toEqual([USWDS]);
  });

  it("returns empty when no manifests are present", async () => {
    const deps = createMockDeps();
    expect(await createHelpers(deps).detectReusedCode()).toEqual([]);
  });

  it("returns empty when no known gov dependencies are found", async () => {
    const deps = createMockDeps({
      readFile: readFileFrom({
        "/github/workspace/package.json": JSON.stringify({
          dependencies: { react: "^18.0.0" },
        }),
      }),
    });

    expect(await createHelpers(deps).detectReusedCode()).toEqual([]);
  });

  it("ignores dependency names that collide with Object prototype members", async () => {
    const deps = createMockDeps({
      readFile: readFileFrom({
        "/github/workspace/package.json": JSON.stringify({
          dependencies: { constructor: "1.0.0", valueOf: "1.0.0" },
        }),
      }),
    });

    expect(await createHelpers(deps).detectReusedCode()).toEqual([]);
  });
});

describe("createHelpers - detectForkParent", () => {
  function mockRepoGet(data: Record<string, unknown>): Dependencies {
    return createMockDeps({
      octokit: createMockOctokit({
        rest: {
          repos: {
            get: jest.fn<any>().mockResolvedValue({ data }),
          },
        },
      }),
    });
  }

  it("returns the upstream parent when the repo is a fork", async () => {
    const deps = mockRepoGet({
      fork: true,
      parent: {
        full_name: "upstream-owner/upstream-repo",
        html_url: "https://github.com/upstream-owner/upstream-repo",
      },
    });

    expect(await createHelpers(deps).detectForkParent()).toEqual({
      name: "upstream-owner/upstream-repo",
      URL: "https://github.com/upstream-owner/upstream-repo",
    });
  });

  it("returns null when the repo is not a fork", async () => {
    const deps = mockRepoGet({ fork: false, parent: null });
    expect(await createHelpers(deps).detectForkParent()).toBeNull();
  });

  it("returns null when fork is true but parent is missing", async () => {
    const deps = mockRepoGet({ fork: true });
    expect(await createHelpers(deps).detectForkParent()).toBeNull();
  });

  it("returns null and logs when the API call fails", async () => {
    const deps = createMockDeps({
      octokit: createMockOctokit({
        rest: {
          repos: {
            get: jest.fn<any>().mockRejectedValue(new Error("API down")),
          },
        },
      }),
    });

    expect(await createHelpers(deps).detectForkParent()).toBeNull();
    expect(deps.log.error).toHaveBeenCalled();
  });
});

describe("mergeReusedCode", () => {
  it("appends detected entries to existing ones", () => {
    const existing = [{ name: "Other Gov Tool", URL: "https://example.gov" }];
    expect(mergeReusedCode(existing, [USWDS])).toEqual([...existing, USWDS]);
  });

  it("does not duplicate an entry already present by URL", () => {
    const existing = [{ name: "USWDS (manual)", URL: USWDS.URL }];
    expect(mergeReusedCode(existing, [USWDS])).toEqual(existing);
  });

  it("does not duplicate an entry already present by name", () => {
    const existing = [{ name: USWDS.name, URL: "https://old.example" }];
    expect(mergeReusedCode(existing, [USWDS])).toEqual(existing);
  });

  it("returns existing unchanged when nothing is detected", () => {
    const existing = [{ name: "Gov Tool", URL: "https://example.gov" }];
    expect(mergeReusedCode(existing, [])).toEqual(existing);
  });

  it("tolerates a non-array existing value", () => {
    expect(mergeReusedCode(undefined as any, [USWDS])).toEqual([USWDS]);
  });
});
describe("GOV_DEPENDENCIES integrity", () => {
  const entries = Object.entries(GOV_DEPENDENCIES);

  it.each(entries)("%s has a lowercase key and a valid entry", (key, entry) => {
    expect(key).toBe(key.toLowerCase());
    expect(entry.name.trim()).not.toBe("");
    expect(entry.URL).toMatch(/^https:\/\//);
  });
});

describe("GOV_DEPENDENCIES_PYPI integrity", () => {
  const entries = Object.entries(GOV_DEPENDENCIES_PYPI);

  it.each(entries)(
    "%s has a normalized key and a valid entry",
    (key, entry) => {
      expect(key).toBe(normalizePyPIName(key));
      expect(entry.name.trim()).not.toBe("");
      expect(entry.URL).toMatch(/^https:\/\//);
    },
  );
});

describe("deriveRepositoryHost", () => {
  it.each([
    ["https://github.com/CMSgov/some-repo", "github.com/CMSgov"],
    [
      "https://github.com/CMS-Enterprise/some-repo",
      "github.com/CMS-Enterprise",
    ],
    [
      "https://github.com/Enterprise-CMCS/some-repo",
      "github.com/Enterprise-CMCS",
    ],
    ["https://github.com/DSACMS/some-repo", "github.com/DSACMS"],
    [
      "https://github.com/MeasureAuthoringTool/some-repo",
      "github.com/MeasureAuthoringTool",
    ],
    ["https://github.cms.gov/some-org/some-repo", "github.cms.gov"],
  ])("maps %s to %s", (url, expected) => {
    expect(deriveRepositoryHost(url)).toBe(expected);
  });

  it("matches the organization regardless of case", () => {
    expect(deriveRepositoryHost("https://github.com/dsacms/some-repo")).toBe(
      "github.com/DSACMS",
    );
  });

  it("returns undefined for an organization outside the enum", () => {
    expect(
      deriveRepositoryHost("https://github.com/some-vendor/some-repo"),
    ).toBeUndefined();
  });

  it("returns undefined for a host outside the enum", () => {
    expect(
      deriveRepositoryHost("https://gitlab.com/DSACMS/some-repo"),
    ).toBeUndefined();
  });

  it("returns undefined when the URL has no organization segment", () => {
    expect(deriveRepositoryHost("https://github.com/")).toBeUndefined();
  });

  it("returns undefined for a value that is not a URL", () => {
    expect(deriveRepositoryHost("")).toBeUndefined();
    expect(deriveRepositoryHost("private")).toBeUndefined();
  });
});

describe("deriveUsageType", () => {
  it("treats a public repository as open source", () => {
    expect(deriveUsageType("public")).toEqual(["openSource"]);
  });

  // every remaining usageType value is an exemption needing a written justification
  it("leaves a private repository for a human to classify", () => {
    expect(deriveUsageType("private")).toEqual([]);
    expect(deriveUsageType(undefined)).toEqual([]);
  });
});

describe("deriveMaturityTier", () => {
  const tier3Files = new Set([
    "LICENSE",
    "README",
    "COMMUNITY",
    "SECURITY",
    "CONTRIBUTING",
    "CODE_OF_CONDUCT",
  ]);

  it("reports tier 4 when the repository documents its governance", () => {
    expect(
      deriveMaturityTier(new Set([...tier3Files, "GOVERNANCE"]), "public"),
    ).toBe(4);
  });

  it("reports tier 3 for a public repository open to contribution", () => {
    expect(deriveMaturityTier(tier3Files, "public")).toBe(3);
  });

  // tiers 2 and 3 require the same documents, so visibility is the only separator
  it("reports tier 2 for the same documents in a private repository", () => {
    expect(deriveMaturityTier(tier3Files, "private")).toBe(2);
  });

  it("reports tier 1 when only a security policy is present", () => {
    expect(
      deriveMaturityTier(new Set(["LICENSE", "README", "SECURITY"]), "public"),
    ).toBe(1);
  });

  it("reports tier 0 when the distinguishing documents are absent", () => {
    expect(deriveMaturityTier(new Set(["LICENSE", "README"]), "public")).toBe(
      0,
    );
    expect(deriveMaturityTier(new Set(), "public")).toBe(0);
  });

  // a contributing guide on its own does not reach the tier 2 checklist
  it("requires both a contributing guide and a code of conduct", () => {
    expect(
      deriveMaturityTier(new Set(["LICENSE", "CONTRIBUTING"]), "public"),
    ).toBe(0);
  });
});

describe("createHelpers - detectCommunityFiles", () => {
  it("reports the documents the repository ships", async () => {
    const deps = createMockDeps({
      readFile: readFileFrom({
        "/github/workspace/LICENSE": "CC0",
        "/github/workspace/README.md": "# Project",
        "/github/workspace/CONTRIBUTING.md": "how to contribute",
      }),
    });

    const files = await createHelpers(deps).detectCommunityFiles();

    expect(files).toEqual(new Set(["LICENSE", "README", "CONTRIBUTING"]));
  });

  it("accepts community health files stored under .github", async () => {
    const deps = createMockDeps({
      readFile: readFileFrom({
        "/github/workspace/.github/SECURITY.md": "report issues here",
        "/github/workspace/.github/CODE_OF_CONDUCT.md": "be kind",
      }),
    });

    const files = await createHelpers(deps).detectCommunityFiles();

    expect(files).toEqual(new Set(["SECURITY", "CODE_OF_CONDUCT"]));
  });

  it("accepts alternate LICENSE extensions", async () => {
    const deps = createMockDeps({
      readFile: readFileFrom({ "/github/workspace/LICENSE.md": "CC0" }),
    });

    const files = await createHelpers(deps).detectCommunityFiles();

    expect(files).toEqual(new Set(["LICENSE"]));
  });

  it("returns an empty set for a repository with no documents", async () => {
    const files = await createHelpers(createMockDeps()).detectCommunityFiles();

    expect(files).toEqual(new Set());
  });
});

describe("createHelpers - readREADME", () => {
  it("reads README.md", async () => {
    const deps = createMockDeps({
      readFile: readFileFrom({ "/github/workspace/README.md": "# Project" }),
    });

    expect(await createHelpers(deps).readREADME()).toBe("# Project");
  });

  it("falls back to other README spellings", async () => {
    const deps = createMockDeps({
      readFile: readFileFrom({ "/github/workspace/README.rst": "Project" }),
    });

    expect(await createHelpers(deps).readREADME()).toBe("Project");
  });

  it("returns null when the repository has no README", async () => {
    expect(await createHelpers(createMockDeps()).readREADME()).toBeNull();
  });
});
