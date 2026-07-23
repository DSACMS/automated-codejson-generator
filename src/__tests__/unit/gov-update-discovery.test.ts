import { describe, it, expect, jest } from "@jest/globals";
import { mkdtempSync, rmSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import path from "path";
import {
  emptyCache,
  loadCache,
  saveCache,
  UpdateCache,
} from "../../gov-update/cache.js";
import {
  listOrgRepos,
  discoverRepoCandidates,
  discoverFromGithub,
} from "../../gov-update/discovery-github.js";
import {
  listNpmOrgPackages,
  discoverFromNpmOrgs,
} from "../../gov-update/discovery-npm-org.js";
import { FetchFn } from "../../gov-update/http.js";

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

const repoResponse = (name: string, extra: object = {}) => ({
  name,
  pushed_at: "2026-01-01T00:00:00Z",
  fork: false,
  archived: false,
  ...extra,
});

describe("cache", () => {
  it("round-trips through disk and survives a missing file", () => {
    const dir = mkdtempSync(path.join(tmpdir(), "gov-cache-"));
    const file = path.join(dir, "nested", "cache.json");
    expect(loadCache(file)).toEqual(emptyCache());
    const cache: UpdateCache = {
      repos: {
        "nasa/batchee": { pushedAt: "2026-01-01T00:00:00Z", candidates: [] },
      },
    };
    saveCache(file, cache);
    expect(loadCache(file)).toEqual(cache);
    rmSync(dir, { recursive: true, force: true });
  });

  it("returns an empty cache for corrupt content", () => {
    const dir = mkdtempSync(path.join(tmpdir(), "gov-cache-"));
    const file = path.join(dir, "cache.json");
    writeFileSync(file, "not json {");
    expect(loadCache(file)).toEqual(emptyCache());
    writeFileSync(file, '{"unexpected": true}');
    expect(loadCache(file)).toEqual(emptyCache());
    rmSync(dir, { recursive: true, force: true });
  });
});

describe("listOrgRepos", () => {
  it("paginates until a short page", async () => {
    const pageOne = Array.from({ length: 100 }, (_, i) =>
      repoResponse(`repo-${i}`),
    );
    const pageTwo = [repoResponse("last-repo", { archived: true })];
    const fetchFn = fetchFrom({
      "&page=1": pageOne,
      "&page=2": pageTwo,
    });
    const repos = await listOrgRepos(fetchFn, "nasa");
    expect(repos).toHaveLength(101);
    expect(repos[100]).toEqual({
      name: "last-repo",
      pushedAt: "2026-01-01T00:00:00Z",
      fork: false,
      archived: true,
    });
  });

  it("returns empty on API failure", async () => {
    const repos = await listOrgRepos(fetchFrom({}), "nasa");
    expect(repos).toEqual([]);
  });
});

describe("discoverRepoCandidates", () => {
  it("collects manifest and readme names across ecosystems", async () => {
    const fetchFn = fetchFrom({
      "/HEAD/package.json": '{"name": "@nasa/tool"}',
      "/HEAD/pyproject.toml": '[project]\nname = "nasa-tool"',
      "/HEAD/README.md":
        "Install:\n`npm install @nasa/tool`\n`pip install nasa-tool-extras`",
    });
    const repo = {
      name: "tool",
      pushedAt: "2026-01-01T00:00:00Z",
      fork: false,
      archived: false,
    };
    const candidates = await discoverRepoCandidates(fetchFn, "nasa", repo);
    const keys = candidates.map((c) => `${c.eco}:${c.name}:${c.source}`);
    expect(keys).toContain("npm:@nasa/tool:manifest");
    expect(keys).toContain("pypi:nasa-tool:manifest");
    expect(keys).toContain("pypi:nasa-tool-extras:readme");
    expect(keys).not.toContain("npm:@nasa/tool:readme");
  });

  it("returns empty for a repo with no manifests", async () => {
    const repo = {
      name: "docs-only",
      pushedAt: "2026-01-01T00:00:00Z",
      fork: false,
      archived: false,
    };
    expect(await discoverRepoCandidates(fetchFrom({}), "nasa", repo)).toEqual(
      [],
    );
  });
});

describe("discoverFromGithub", () => {
  it("skips unchanged repos via cache and refetches changed ones", async () => {
    const fetchFn = fetchFrom({
      "api.github.com/orgs/nasa/repos": [
        repoResponse("unchanged"),
        repoResponse("changed", { pushed_at: "2026-02-01T00:00:00Z" }),
      ],
      "raw.githubusercontent.com/nasa/changed/HEAD/package.json":
        '{"name": "fresh-pkg"}',
      "raw.githubusercontent.com/nasa/unchanged/HEAD/package.json":
        '{"name": "should-not-be-fetched"}',
    });
    const cache: UpdateCache = {
      repos: {
        "nasa/unchanged": {
          pushedAt: "2026-01-01T00:00:00Z",
          candidates: [
            {
              eco: "npm",
              name: "cached-pkg",
              org: "nasa",
              repo: "unchanged",
              source: "manifest",
              fork: false,
              archived: false,
            },
          ],
        },
        "nasa/changed": { pushedAt: "2026-01-01T00:00:00Z", candidates: [] },
      },
    };
    const candidates = await discoverFromGithub({
      orgs: ["nasa"],
      cache,
      fetchFn,
      paceMs: 0,
    });
    const names = candidates.map((c) => c.name);
    expect(names).toContain("cached-pkg");
    expect(names).toContain("fresh-pkg");
    expect(names).not.toContain("should-not-be-fetched");
    expect(cache.repos["nasa/changed"].pushedAt).toBe("2026-02-01T00:00:00Z");
    expect(cache.repos["nasa/changed"].candidates.map((c) => c.name)).toEqual([
      "fresh-pkg",
    ]);
  });
});

describe("npm org discovery", () => {
  it("lists org packages", async () => {
    const fetchFn = fetchFrom({
      "registry.npmjs.org/-/org/cmsgov/package": {
        "@cmsgov/design-system": "write",
        "qpp-style": "write",
      },
    });
    expect(await listNpmOrgPackages(fetchFn, "cmsgov")).toEqual([
      "@cmsgov/design-system",
      "qpp-style",
    ]);
  });

  it("returns null when the listing is unavailable", async () => {
    expect(await listNpmOrgPackages(fetchFrom({}), "gone")).toBeNull();
  });

  it("maps listings to npm-org candidates and skips failures", async () => {
    const fetchFn = fetchFrom({
      "registry.npmjs.org/-/org/cmsgov/package": { "qpp-style": "write" },
    });
    const progress: string[] = [];
    const candidates = await discoverFromNpmOrgs({
      npmOrgs: ["cmsgov", "missing"],
      fetchFn,
      onProgress: (m) => progress.push(m),
    });
    expect(candidates).toEqual([
      {
        eco: "npm",
        name: "qpp-style",
        org: "cmsgov",
        repo: "",
        source: "npm-org",
        fork: false,
        archived: false,
      },
    ]);
    expect(progress.some((m) => m.includes("skipped"))).toBe(true);
  });
});
