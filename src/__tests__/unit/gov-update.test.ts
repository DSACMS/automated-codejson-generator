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

describe("parseGithubUrl", () => {
  it.each([
    ["git+https://github.com/nasa/batchee.git", "nasa", "batchee"],
    ["git+ssh://git@github.com/nasa/batchee.git", "nasa", "batchee"],
    ["git@github.com:nasa/batchee.git", "nasa", "batchee"],
    ["git://github.com/nasa/batchee", "nasa", "batchee"],
    ["github:nasa/batchee", "nasa", "batchee"],
    ["nasa/batchee", "nasa", "batchee"],
    ["https://GITHUB.com/NASA/Batchee/", "nasa", "batchee"],
    ["https://www.github.com/nasa/batchee#readme", "nasa", "batchee"],
    ["https://github.com/nasa/batchee/tree/main/packages/x", "nasa", "batchee"],
  ])("parses %s", (url, org, repo) => {
    expect(parseGithubUrl(url)).toEqual({ org, repo });
  });

  it.each([
    ["https://github.com/nasa"],
    ["https://gitlab.com/nasa/batchee"],
    ["https://github.com.example.com/nasa/batchee"],
    ["https://example.com/github.com/nasa/batchee"],
    ["https://example.com?x=github.com/nasa/batchee"],
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
        home_page: "https://github.com/nasa/batchee",
        project_urls: { Repository: "https://github.com/nasa/batchee" },
      },
    };
    expect(extractClaimedRepos("pypi", doc)).toEqual([
      { org: "nasa", repo: "batchee" },
      { org: "nasa", repo: "batchee" },
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
    const pyproject = '[project]\nname = "batchee"\nversion = "1.0"';
    expect(extractManifestNames("pyproject.toml", pyproject)).toEqual([
      "batchee",
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
    const readme = "Run `pip install batchee[harmony]` to get started";
    expect(extractReadmeInstallNames("pypi", readme)).toEqual(["batchee"]);
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
    const allowlist = loadAllowlist();
    expect(allowlist.githubOrgs["cdcgov"]).toBe(
      "Centers for Disease Control and Prevention",
    );
    expect(allowlist.npmOrgs["cmsgov"]).toBeDefined();
    for (const key of Object.keys(allowlist.githubOrgs)) {
      expect(key).toBe(key.toLowerCase());
    }
  });
});

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
  const allowedOrgs = new Set(["nasa", "usnistgov"]);

  it("passes a package whose claimed repo declares its name", async () => {
    const fetchFn = fetchFrom({
      "registry.npmjs.org/good-pkg": {
        repository: { url: "https://github.com/nasa/good-pkg" },
      },
      "raw.githubusercontent.com/nasa/good-pkg/HEAD/package.json":
        '{"name": "good-pkg"}',
    });
    const result = await verifyPackage({
      eco: "npm",
      name: "good-pkg",
      allowedOrgs,
      fetchFn,
    });
    expect(result.verdict).toBe("PASS");
    expect(result.repo).toBe("nasa/good-pkg");
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
