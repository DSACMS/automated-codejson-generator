import { describe, it, expect, jest } from "@jest/globals";
import {
  parseGithubUrl,
  extractClaimedRepos,
  extractManifestNames,
  extractReadmeInstallNames,
  isPrivatePackageManifest,
  verifyPackage,
  FetchFn,
} from "../../gov-update/verify.js";
import { loadAllowlist } from "../../gov-update/allowlist.js";

const ALLOWLIST_FILE = "src/gov-update/allowlist.json";

describe("parseGithubUrl", () => {
  it.each([
    [
      "git+https://github.com/cmsgov/design-system.git",
      "cmsgov",
      "design-system",
    ],
    [
      "git+ssh://git@github.com/cmsgov/design-system.git",
      "cmsgov",
      "design-system",
    ],
    ["git@github.com:cmsgov/design-system.git", "cmsgov", "design-system"],
    ["git://github.com/cmsgov/design-system", "cmsgov", "design-system"],
    ["github:cmsgov/design-system", "cmsgov", "design-system"],
    ["cmsgov/design-system", "cmsgov", "design-system"],
    ["https://GITHUB.com/CMSGOV/Design-System/", "cmsgov", "design-system"],
    [
      "https://www.github.com/cmsgov/design-system#readme",
      "cmsgov",
      "design-system",
    ],
    [
      "https://github.com/cmsgov/design-system/tree/main/packages/x",
      "cmsgov",
      "design-system",
    ],
  ])("parses %s", (url, org, repo) => {
    expect(parseGithubUrl(url)).toEqual({ org, repo });
  });

  it.each([
    ["https://github.com/cmsgov"],
    ["https://gitlab.com/cmsgov/design-system"],
    ["https://github.com.example.com/cmsgov/design-system"],
    ["https://example.com/github.com/cmsgov/design-system"],
    ["https://example.com?x=github.com/cmsgov/design-system"],
    [""],
    [null],
    [undefined],
    [42],
  ])("rejects %s", (url) => {
    expect(parseGithubUrl(url)).toBeNull();
  });
});

describe("extractClaimedRepos", () => {
  it("reads the npm repository field in object form", () => {
    const doc = {
      repository: {
        type: "git",
        url: "git+https://github.com/cfpb/amortize.git",
      },
    };
    expect(extractClaimedRepos("npm", doc)).toEqual([
      { org: "cfpb", repo: "amortize" },
    ]);
  });

  it("reads the npm repository field in string form", () => {
    expect(extractClaimedRepos("npm", { repository: "cfpb/amortize" })).toEqual(
      [{ org: "cfpb", repo: "amortize" }],
    );
  });

  it("reads recognized PyPI project_urls keys and home_page", () => {
    const doc = {
      info: {
        home_page: "https://github.com/cmsgov/design-system",
        project_urls: { Repository: "https://github.com/cmsgov/design-system" },
      },
    };
    expect(extractClaimedRepos("pypi", doc)).toEqual([
      { org: "cmsgov", repo: "design-system" },
      { org: "cmsgov", repo: "design-system" },
    ]);
  });

  it("ignores unrecognized PyPI project_urls keys", () => {
    const doc = {
      info: {
        home_page: null,
        project_urls: {
          ALIGNN: "https://github.com/usnistgov/alignn",
          Homepage: "https://github.com/otherlab/mpdd-alignn",
        },
      },
    };
    expect(extractClaimedRepos("pypi", doc)).toEqual([
      { org: "otherlab", repo: "mpdd-alignn" },
    ]);
  });

  it("returns empty for missing metadata", () => {
    expect(extractClaimedRepos("npm", {})).toEqual([]);
    expect(extractClaimedRepos("pypi", { info: {} })).toEqual([]);
  });
});

describe("extractManifestNames", () => {
  it("reads package.json names", () => {
    expect(
      extractManifestNames("package.json", '{"name": "@cfpb/design-system"}'),
    ).toEqual(["@cfpb/design-system"]);
  });

  it("returns empty for invalid or nameless package.json", () => {
    expect(extractManifestNames("package.json", "not json")).toEqual([]);
    expect(extractManifestNames("package.json", "{}")).toEqual([]);
    expect(extractManifestNames("package.json", '{"name": 3}')).toEqual([]);
  });

  it("reads pyproject and setup names", () => {
    const pyproject = '[project]\nname = "design-system"\nversion = "1.0"';
    expect(extractManifestNames("pyproject.toml", pyproject)).toEqual([
      "design-system",
    ]);
    const setup = 'setup(\n    name="fipy",\n    version="3.4",\n)';
    expect(extractManifestNames("setup.py", setup)).toEqual(["fipy"]);
  });
});

describe("isPrivatePackageManifest", () => {
  it("flags manifests marked private true", () => {
    expect(isPrivatePackageManifest('{"name": "x", "private": true}')).toBe(
      true,
    );
  });

  it("treats missing, false, and unparseable as not private", () => {
    expect(isPrivatePackageManifest('{"name": "x"}')).toBe(false);
    expect(isPrivatePackageManifest('{"name": "x", "private": false}')).toBe(
      false,
    );
    expect(isPrivatePackageManifest("not json")).toBe(false);
  });
});

describe("extractReadmeInstallNames", () => {
  it("extracts npm install commands including scopes", () => {
    const readme = "Install with:\n```\nnpm install @uswds/uswds --save\n```";
    expect(extractReadmeInstallNames("npm", readme)).toEqual(["@uswds/uswds"]);
  });

  it("extracts pip install commands and strips extras", () => {
    const readme = "Run `pip install design-system[harmony]` to get started";
    expect(extractReadmeInstallNames("pypi", readme)).toEqual([
      "design-system",
    ]);
  });

  it("skips flags, files, and bare installs", () => {
    const readme = [
      "pip install -r requirements.txt",
      "pip install .",
      "npm install",
      "npm install -g yarn",
    ].join("\n");
    expect(extractReadmeInstallNames("pypi", readme)).toEqual([]);
    expect(extractReadmeInstallNames("npm", readme)).toEqual(["yarn"]);
  });
});

describe("loadAllowlist", () => {
  it("loads and lowercases org keys", () => {
    const allowlist = loadAllowlist(ALLOWLIST_FILE);
    expect(allowlist.githubOrgs["cdcgov"]).toBe(
      "Centers for Disease Control and Prevention",
    );
    expect(allowlist.npmOrgs["cmsgov"]).toBeDefined();
    for (const key of Object.keys(allowlist.githubOrgs)) {
      expect(key).toBe(key.toLowerCase());
    }
  });
});

// Serves a body when the request URL contains a route substring, 404 otherwise.
// A route left out is a file that does not exist in the repo being verified.
function fetchFrom(routes: Record<string, unknown>): FetchFn {
  return jest.fn<FetchFn>((input) => {
    const url = String(input);
    for (const [route, body] of Object.entries(routes)) {
      if (url.includes(route)) {
        const text = typeof body === "string" ? body : JSON.stringify(body);
        return Promise.resolve(new Response(text, { status: 200 }));
      }
    }
    return Promise.resolve(new Response("not found", { status: 404 }));
  }) as unknown as FetchFn;
}

describe("verifyPackage", () => {
  const allowedOrgs = new Set(["cmsgov", "usnistgov"]);

  it("passes a package whose claimed repo declares its name", async () => {
    const fetchFn = fetchFrom({
      "registry.npmjs.org/good-pkg": {
        repository: { url: "https://github.com/cmsgov/good-pkg" },
      },
      "raw.githubusercontent.com/cmsgov/good-pkg/HEAD/package.json":
        '{"name": "good-pkg"}',
    });
    const result = await verifyPackage({
      eco: "npm",
      name: "good-pkg",
      allowedOrgs,
      fetchFn,
    });
    expect(result.verdict).toBe("PASS");
    expect(result.repo).toBe("cmsgov/good-pkg");
  });

  it("flags a spoof whose claimed gov repo declares a different name", async () => {
    const fetchFn = fetchFrom({
      "registry.npmjs.org/mismatched-pkg": {
        repository: { url: "https://github.com/usnistgov/h5wasm" },
      },
      "raw.githubusercontent.com/usnistgov/h5wasm/HEAD/package.json":
        '{"name": "h5wasm"}',
      "api.github.com/repos/usnistgov/h5wasm": { tree: [] },
    });
    const result = await verifyPackage({
      eco: "npm",
      name: "mismatched-pkg",
      allowedOrgs,
      fetchFn,
    });
    expect(result.verdict).toBe("FLAG");
  });

  it("rejects a package whose metadata points outside the allowlist", async () => {
    const fetchFn = fetchFrom({
      "registry.npmjs.org/react": {
        repository: { url: "https://github.com/facebook/react" },
      },
    });
    const result = await verifyPackage({
      eco: "npm",
      name: "react",
      allowedOrgs,
      fetchFn,
    });
    expect(result.verdict).toBe("REJECT");
    expect(result.reason).toContain("facebook/react");
  });

  it("rejects a package with no repo metadata", async () => {
    const fetchFn = fetchFrom({ "registry.npmjs.org/bare-pkg": {} });
    const result = await verifyPackage({
      eco: "npm",
      name: "bare-pkg",
      allowedOrgs,
      fetchFn,
    });
    expect(result.verdict).toBe("REJECT");
    expect(result.reason).toBe("no repo in registry metadata");
  });

  it("rejects a name that is not published to the public registry", async () => {
    const fetchFn = fetchFrom({});
    const result = await verifyPackage({
      eco: "npm",
      name: "consumerfinance.gov",
      allowedOrgs,
      fetchFn,
    });
    expect(result.verdict).toBe("REJECT");
    expect(result.reason).toBe("not published to the public registry");
  });

  it("passes via README install command when the manifest name differs", async () => {
    const fetchFn = fetchFrom({
      "pypi.org/pypi/cdcs/json": {
        info: {
          project_urls: { Repository: "https://github.com/usnistgov/pycdcs" },
        },
      },
      "raw.githubusercontent.com/usnistgov/pycdcs/HEAD/README.md":
        "Install:\n\n    pip install cdcs\n",
    });
    const result = await verifyPackage({
      eco: "pypi",
      name: "cdcs",
      allowedOrgs,
      fetchFn,
    });
    expect(result.verdict).toBe("PASS");
    expect(result.reason).toContain("README");
  });

  it("flags scoped registry names that only scope-strip match the repo", async () => {
    const fetchFn = fetchFrom({
      "registry.npmjs.org/%40otherscope%2Fh5wasm": {
        repository: { url: "https://github.com/usnistgov/h5wasm" },
      },
      "raw.githubusercontent.com/usnistgov/h5wasm/HEAD/package.json":
        '{"name": "h5wasm"}',
      "api.github.com/repos/usnistgov/h5wasm": { tree: [] },
    });
    const result = await verifyPackage({
      eco: "npm",
      name: "@otherscope/h5wasm",
      allowedOrgs,
      fetchFn,
    });
    expect(result.verdict).toBe("FLAG");
    expect(result.reason).toContain("scope mismatch");
  });
});
