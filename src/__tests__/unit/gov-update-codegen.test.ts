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

const DESIGN_SYSTEM: ReusedCodeEntry = {
  name: "design-system (CMS)",
  URL: "https://github.com/cmsgov/design-system",
};

const NGX_TOOL: ReusedCodeEntry = {
  name: "ngx-tool (GSA)",
  URL: "https://github.com/gsa/ngx-tool",
};

export const GOV_DEPENDENCIES: Record<string, ReusedCodeEntry> = {
  "@gsa/ngx-tool": NGX_TOOL,
  "design-system": DESIGN_SYSTEM,
};

export const GOV_DEPENDENCIES_PYPI: Record<string, ReusedCodeEntry> = {
  "design-system": DESIGN_SYSTEM,
};
`;

describe("existingKeys", () => {
  it("reads keys from both maps", () => {
    expect([...existingKeys(FIXTURE, "npm")].sort()).toEqual([
      "@gsa/ngx-tool",
      "design-system",
    ]);
    expect([...existingKeys(FIXTURE, "pypi")]).toEqual(["design-system"]);
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
      npmBlock.indexOf('"design-system": DESIGN_SYSTEM'),
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
    expect(npmBlock).toContain('"@cfpb/analytics": CFPB_ANALYTICS');
    expect(npmBlock.indexOf("@cfpb/analytics")).toBeLessThan(
      npmBlock.indexOf('"design-system": DESIGN_SYSTEM'),
    );
  });

  it("reuses an existing const when the repo URL already appears", () => {
    const entries: DataFileEntry[] = [
      {
        eco: "npm",
        key: "@cmsgov/design-system",
        displayName: "design-system (CMS)",
        url: "https://github.com/cmsgov/design-system",
      },
    ];
    const out = addEntries(FIXTURE, entries);
    expect(out).toContain('"@cmsgov/design-system": DESIGN_SYSTEM');
    expect(out.match(/const DESIGN_SYSTEM:/g)).toHaveLength(1);
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
        displayName: "3d-viz (CMS)",
        url: "https://github.com/cmsgov/3d-viz",
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
