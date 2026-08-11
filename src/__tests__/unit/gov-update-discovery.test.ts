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

// Serves a body when the request URL contains a route substring, 404 otherwise.
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
        "cmsgov/design-system": {
          pushedAt: "2026-01-01T00:00:00Z",
          candidates: [],
        },
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
    const { repos, complete } = await listOrgRepos(fetchFn, "cmsgov");
    expect(repos).toHaveLength(101);
    expect(complete).toBe(true);
    expect(repos[100]).toEqual({
      name: "last-repo",
      pushedAt: "2026-01-01T00:00:00Z",
      fork: false,
      archived: true,
    });
  });

  // Fake timers here so the retry backoff in http.ts resolves instantly.
  it("reports incomplete when a page fetch errors mid-pagination", async () => {
    jest.useFakeTimers();
    try {
      const pageOne = Array.from({ length: 100 }, (_, i) =>
        repoResponse(`repo-${i}`),
      );
      const fetchFn = jest.fn<FetchFn>((input) => {
        const url = String(input);
        if (url.includes("&page=1")) {
          return Promise.resolve(new Response(JSON.stringify(pageOne)));
        }
        return Promise.resolve(new Response("error", { status: 503 }));
      }) as unknown as FetchFn;
      const promise = listOrgRepos(fetchFn, "cmsgov");
      await jest.runAllTimersAsync();
      const { repos, complete } = await promise;
      expect(repos).toHaveLength(100);
      expect(complete).toBe(false);
    } finally {
      jest.useRealTimers();
    }
  });

  it("reports empty and complete when the org has no repos", async () => {
    const { repos, complete } = await listOrgRepos(fetchFrom({}), "cmsgov");
    expect(repos).toEqual([]);
    expect(complete).toBe(true);
  });
});

describe("discoverRepoCandidates", () => {
  it("collects manifest and readme names across ecosystems", async () => {
    const fetchFn = fetchFrom({
      "/HEAD/package.json": '{"name": "@cmsgov/tool"}',
      "/HEAD/pyproject.toml": '[project]\nname = "cmsgov-tool"',
      "/HEAD/README.md":
        "Install:\n`npm install @cmsgov/tool`\n`pip install cmsgov-tool-extras`",
    });
    const repo = {
      name: "tool",
      pushedAt: "2026-01-01T00:00:00Z",
      fork: false,
      archived: false,
    };
    const { candidates, failed } = await discoverRepoCandidates(
      fetchFn,
      "cmsgov",
      repo,
    );
    expect(failed).toBe(false);
    const keys = candidates.map((c) => `${c.eco}:${c.name}:${c.source}`);
    expect(keys).toContain("npm:@cmsgov/tool:manifest");
    expect(keys).toContain("pypi:cmsgov-tool:manifest");
    expect(keys).toContain("pypi:cmsgov-tool-extras:readme");
    expect(keys).not.toContain("npm:@cmsgov/tool:readme");
  });

  it("returns empty for a repo with no manifests", async () => {
    const repo = {
      name: "docs-only",
      pushedAt: "2026-01-01T00:00:00Z",
      fork: false,
      archived: false,
    };
    expect(await discoverRepoCandidates(fetchFrom({}), "cmsgov", repo)).toEqual(
      {
        candidates: [],
        failed: false,
      },
    );
  });

  it("skips a package.json marked private", async () => {
    const fetchFn = fetchFrom({
      "/HEAD/package.json": '{"name": "internal-site", "private": true}',
    });
    const repo = {
      name: "website",
      pushedAt: "2026-01-01T00:00:00Z",
      fork: false,
      archived: false,
    };
    const { candidates } = await discoverRepoCandidates(
      fetchFn,
      "cmsgov",
      repo,
    );
    expect(candidates).toEqual([]);
  });

  it("marks failed when a manifest fetch errors", async () => {
    jest.useFakeTimers();
    try {
      const fetchFn = jest.fn<FetchFn>(() =>
        Promise.resolve(new Response("error", { status: 502 })),
      ) as unknown as FetchFn;
      const repo = {
        name: "flaky",
        pushedAt: "2026-01-01T00:00:00Z",
        fork: false,
        archived: false,
      };
      const promise = discoverRepoCandidates(fetchFn, "cmsgov", repo);
      await jest.runAllTimersAsync();
      const { candidates, failed } = await promise;
      expect(candidates).toEqual([]);
      expect(failed).toBe(true);
    } finally {
      jest.useRealTimers();
    }
  });
});

describe("discoverFromGithub", () => {
  it("skips unchanged repos via cache and refetches changed ones", async () => {
    const fetchFn = fetchFrom({
      "api.github.com/orgs/cmsgov/repos": [
        repoResponse("unchanged"),
        repoResponse("changed", { pushed_at: "2026-02-01T00:00:00Z" }),
      ],
      "raw.githubusercontent.com/cmsgov/changed/HEAD/package.json":
        '{"name": "fresh-pkg"}',
      "raw.githubusercontent.com/cmsgov/unchanged/HEAD/package.json":
        '{"name": "should-not-be-fetched"}',
    });
    const cache: UpdateCache = {
      repos: {
        "cmsgov/unchanged": {
          pushedAt: "2026-01-01T00:00:00Z",
          candidates: [
            {
              eco: "npm",
              name: "cached-pkg",
              org: "cmsgov",
              repo: "unchanged",
              source: "manifest",
              fork: false,
              archived: false,
            },
          ],
        },
        "cmsgov/changed": { pushedAt: "2026-01-01T00:00:00Z", candidates: [] },
      },
    };
    const candidates = await discoverFromGithub({
      orgs: ["cmsgov"],
      cache,
      fetchFn,
      paceMs: 0,
    });
    const names = candidates.map((c) => c.name);
    expect(names).toContain("cached-pkg");
    expect(names).toContain("fresh-pkg");
    expect(names).not.toContain("should-not-be-fetched");
    expect(cache.repos["cmsgov/changed"].pushedAt).toBe("2026-02-01T00:00:00Z");
    expect(cache.repos["cmsgov/changed"].candidates.map((c) => c.name)).toEqual(
      ["fresh-pkg"],
    );
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
