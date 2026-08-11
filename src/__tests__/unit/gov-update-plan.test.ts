import { describe, it, expect, jest } from "@jest/globals";
import {
  planUpdate,
  renderReport,
  normalizeKey,
  VerifyFn,
  ResolveUrlFn,
} from "../../gov-update/plan.js";
import { Candidate } from "../../gov-update/cache.js";
import { Allowlist } from "../../gov-update/allowlist.js";

const allowlist: Allowlist = {
  githubOrgs: { cmsgov: "CMS", usnistgov: "NIST" },
  npmOrgs: { cmsgov: "Centers for Medicare & Medicaid Services" },
};

const candidate = (over: Partial<Candidate>): Candidate => ({
  eco: "npm",
  name: "pkg",
  org: "cmsgov",
  repo: "cmsgov/pkg",
  source: "manifest",
  fork: false,
  archived: false,
  ...over,
});

const emptyExisting = () => ({
  npm: new Set<string>(),
  pypi: new Set<string>(),
});

describe("normalizeKey", () => {
  it("lowercases npm and pep503-normalizes pypi", () => {
    expect(normalizeKey("npm", "@CFPB/Amortize")).toBe("@cfpb/amortize");
    expect(normalizeKey("pypi", "Module_Utilities")).toBe("module-utilities");
  });
});

describe("planUpdate", () => {
  const resolveUrl: ResolveUrlFn = () =>
    Promise.resolve("https://github.com/cmsgov/qpp-style");

  it("adds a manifest candidate that verifies PASS", async () => {
    const verify: VerifyFn = () =>
      Promise.resolve({
        verdict: "PASS",
        reason: "root manifest",
        repo: "cmsgov/pkg",
      });
    const plan = await planUpdate({
      candidates: [candidate({})],
      existing: emptyExisting(),
      allowlist,
      verify,
      resolveUrl,
    });
    expect(plan.additions).toEqual([
      {
        eco: "npm",
        key: "pkg",
        displayName: "pkg (CMS)",
        url: "https://github.com/cmsgov/pkg",
      },
    ]);
  });

  it("flags a candidate that verifies FLAG", async () => {
    const verify: VerifyFn = () =>
      Promise.resolve({ verdict: "FLAG", reason: "no manifest declares it" });
    const plan = await planUpdate({
      candidates: [candidate({ name: "unverified-pkg" })],
      existing: emptyExisting(),
      allowlist,
      verify,
      resolveUrl,
    });
    expect(plan.additions).toHaveLength(0);
    expect(plan.flagged).toEqual([
      {
        eco: "npm",
        name: "unverified-pkg",
        org: "cmsgov",
        repo: "cmsgov/pkg",
        reason: "no manifest declares it",
      },
    ]);
  });

  it("counts REJECT verdicts without adding or flagging", async () => {
    const verify: VerifyFn = () =>
      Promise.resolve({ verdict: "REJECT", reason: "metadata elsewhere" });
    const plan = await planUpdate({
      candidates: [candidate({})],
      existing: emptyExisting(),
      allowlist,
      verify,
      resolveUrl,
    });
    expect(plan.rejected).toBe(1);
    expect(plan.additions).toHaveLength(0);
  });

  it("adds npm-org candidates without verifying", async () => {
    const verify = jest.fn<VerifyFn>();
    const plan = await planUpdate({
      candidates: [
        candidate({
          name: "@cmsgov/qpp-style",
          org: "cmsgov",
          repo: "",
          source: "npm-org",
        }),
      ],
      existing: emptyExisting(),
      allowlist,
      verify,
      resolveUrl,
    });
    expect(verify).not.toHaveBeenCalled();
    expect(plan.additions).toEqual([
      {
        eco: "npm",
        key: "@cmsgov/qpp-style",
        displayName: "qpp-style (Centers for Medicare & Medicaid Services)",
        url: "https://github.com/cmsgov/qpp-style",
      },
    ]);
  });

  it("skips candidates already present in the data file", async () => {
    const verify = jest.fn<VerifyFn>();
    const existing = emptyExisting();
    existing.npm.add("pkg");
    const plan = await planUpdate({
      candidates: [candidate({})],
      existing,
      allowlist,
      verify,
      resolveUrl,
    });
    expect(verify).not.toHaveBeenCalled();
    expect(plan.skippedExisting).toBe(1);
  });

  it("prefers npm-org source over manifest when deduping", async () => {
    const verify = jest.fn<VerifyFn>(() =>
      Promise.resolve({ verdict: "FLAG", reason: "no manifest declares it" }),
    );
    const plan = await planUpdate({
      candidates: [
        candidate({ name: "qpp-style", org: "cmsgov", source: "manifest" }),
        candidate({
          name: "qpp-style",
          org: "cmsgov",
          repo: "",
          source: "npm-org",
        }),
      ],
      existing: emptyExisting(),
      allowlist,
      verify,
      resolveUrl,
    });
    expect(verify).not.toHaveBeenCalled();
    expect(plan.additions).toHaveLength(1);
    expect(plan.additions[0].url).toBe("https://github.com/cmsgov/qpp-style");
  });
});

describe("renderReport", () => {
  it("summarizes additions and flags", () => {
    const report = renderReport({
      additions: [
        {
          eco: "npm",
          key: "pkg",
          displayName: "pkg (CMS)",
          url: "https://github.com/cmsgov/pkg",
        },
      ],
      flagged: [
        {
          eco: "pypi",
          name: "unverified-pkg",
          org: "cmsgov",
          repo: "cmsgov/unverified-pkg",
          reason: "no manifest declares it",
        },
      ],
      rejected: 3,
      skippedExisting: 10,
    });
    expect(report).toContain("1 new verified package");
    expect(report).toContain("## Verified additions");
    expect(report).toContain("pkg — https://github.com/cmsgov/pkg");
    expect(report).toContain("## Flagged for manual review");
    expect(report).toContain(
      "unverified-pkg (cmsgov/unverified-pkg): no manifest declares it",
    );
  });
});
