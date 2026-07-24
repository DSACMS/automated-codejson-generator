import { describe, it, expect } from "@jest/globals";
import {
  addEntries,
  existingKeys,
  DataFileEntry,
} from "../../gov-update/codegen.js";

const FIXTURE = `export interface ReusedCodeEntry {
  name: string;
  URL: string;
}

const BATCHEE: ReusedCodeEntry = {
  name: "batchee (NASA)",
  URL: "https://github.com/nasa/batchee",
};

const NGX_TOOL: ReusedCodeEntry = {
  name: "ngx-tool (GSA)",
  URL: "https://github.com/gsa/ngx-tool",
};

export const GOV_DEPENDENCIES: Record<string, ReusedCodeEntry> = {
  "@gsa/ngx-tool": NGX_TOOL,
  batchee: BATCHEE,
};

export const GOV_DEPENDENCIES_PYPI: Record<string, ReusedCodeEntry> = {
  batchee: BATCHEE,
};
`;

describe("existingKeys", () => {
  it("reads keys from both maps", () => {
    expect([...existingKeys(FIXTURE, "npm")].sort()).toEqual([
      "@gsa/ngx-tool",
      "batchee",
    ]);
    expect([...existingKeys(FIXTURE, "pypi")]).toEqual(["batchee"]);
  });
});

describe("addEntries", () => {
  it("inserts an unscoped npm key alphabetically with a new const", () => {
    const entries: DataFileEntry[] = [
      {
        eco: "npm",
        key: "amortize",
        displayName: "amortize (CFPB)",
        url: "https://github.com/cfpb/amortize",
      },
    ];
    const out = addEntries(FIXTURE, entries);
    expect(out).toContain("const AMORTIZE: ReusedCodeEntry = {");
    expect(out).toContain('  name: "amortize (CFPB)",');
    const npmBlock = out.slice(out.indexOf("GOV_DEPENDENCIES:"));
    expect(npmBlock.indexOf("amortize: AMORTIZE")).toBeLessThan(
      npmBlock.indexOf("batchee: BATCHEE"),
    );
  });

  it("groups scoped npm keys among the existing scoped block", () => {
    const entries: DataFileEntry[] = [
      {
        eco: "npm",
        key: "@cfpb/analytics",
        displayName: "analytics (CFPB)",
        url: "https://github.com/cfpb/analytics",
      },
    ];
    const out = addEntries(FIXTURE, entries);
    const npmBlock = out.slice(
      out.indexOf("GOV_DEPENDENCIES:"),
      out.indexOf("GOV_DEPENDENCIES_PYPI:"),
    );
    expect(npmBlock).toContain('"@cfpb/analytics": ANALYTICS');
    expect(npmBlock.indexOf("@cfpb/analytics")).toBeLessThan(
      npmBlock.indexOf("batchee: BATCHEE"),
    );
  });

  it("reuses an existing const when the repo URL already appears", () => {
    const entries: DataFileEntry[] = [
      {
        eco: "pypi",
        key: "batchee-mirror",
        displayName: "batchee-mirror (NASA)",
        url: "https://github.com/nasa/batchee",
      },
    ];
    const out = addEntries(FIXTURE, entries);
    expect(out).toContain('"batchee-mirror": BATCHEE');
    expect(out.match(/const BATCHEE:/g)).toHaveLength(1);
  });

  it("quotes keys that are not valid identifiers", () => {
    const entries: DataFileEntry[] = [
      {
        eco: "pypi",
        key: "scikit-learn-gov",
        displayName: "scikit-learn-gov (NIST)",
        url: "https://github.com/usnistgov/scikit-learn-gov",
      },
    ];
    const out = addEntries(FIXTURE, entries);
    expect(out).toContain('"scikit-learn-gov": SCIKIT_LEARN_GOV');
  });

  it("prefixes const names that would start with a digit", () => {
    const entries: DataFileEntry[] = [
      {
        eco: "pypi",
        key: "3d-viz",
        displayName: "3d-viz (NASA)",
        url: "https://github.com/nasa/3d-viz",
      },
    ];
    const out = addEntries(FIXTURE, entries);
    expect(out).toContain("const PKG_3D_VIZ: ReusedCodeEntry = {");
    expect(out).toContain('"3d-viz": PKG_3D_VIZ');
  });

  it("is idempotent-safe for keys already present", () => {
    const before = existingKeys(FIXTURE, "npm").size;
    const out = addEntries(FIXTURE, [
      {
        eco: "npm",
        key: "amortize",
        displayName: "amortize (CFPB)",
        url: "https://github.com/cfpb/amortize",
      },
    ]);
    expect(existingKeys(out, "npm").size).toBe(before + 1);
  });
});
