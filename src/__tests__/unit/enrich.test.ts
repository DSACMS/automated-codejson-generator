import { describe, it, expect, jest } from "@jest/globals";
import {
  missingEnrichableFields,
  condenseReadme,
  applyEnrichment,
  enrichCodeJSON,
  enrichedFields,
  screenGenerated,
} from "../../enrich.js";
import { CodeJSON } from "../../codejson.js";
import { ModelRunner, ModelSession } from "../../llm.js";
import { createMockLogger } from "../fixtures/mock-deps.js";
import validCodeJSON from "../fixtures/test-code.json";

const blank = "" as never;
const complete = validCodeJSON as unknown as CodeJSON;

function createFakeSession(
  overrides: Partial<ModelSession> = {},
): ModelSession {
  return {
    generateText: jest.fn<any>().mockResolvedValue(""),
    generateJSON: jest.fn<any>().mockResolvedValue({}),
    ...overrides,
  } as unknown as ModelSession;
}

function runnerFor(session: ModelSession): ModelRunner {
  return (async (_log, run) => run(session)) as ModelRunner;
}

describe("missingEnrichableFields", () => {
  it("reports nothing missing for a fully populated code.json", () => {
    expect(missingEnrichableFields(complete)).toEqual([]);
  });

  it("treats a longDescription under 150 characters as missing", () => {
    const codeJSON = { ...complete, longDescription: "too short" };
    expect(missingEnrichableFields(codeJSON)).toEqual(["longDescription"]);
  });

  it("treats a tag list under the minimum as missing", () => {
    const codeJSON = { ...complete, tags: ["only", "two"] };
    expect(missingEnrichableFields(codeJSON)).toEqual(["tags"]);
  });

  it("treats empty arrays as missing", () => {
    const codeJSON = {
      ...complete,
      tags: [],
      categories: [],
      platforms: [],
    };
    expect(missingEnrichableFields(codeJSON)).toEqual([
      "tags",
      "categories",
      "platforms",
    ]);
  });

  it("treats a blank enum value as missing", () => {
    const codeJSON = {
      ...complete,
      softwareType: blank,
      repositoryType: blank,
    };
    expect(missingEnrichableFields(codeJSON)).toEqual([
      "softwareType",
      "repositoryType",
    ]);
  });

  it("reports every field for a blank draft", () => {
    const codeJSON = {
      ...complete,
      longDescription: "",
      tags: [],
      categories: [],
      platforms: [],
      softwareType: blank,
      repositoryType: blank,
    };
    expect(missingEnrichableFields(codeJSON)).toEqual([
      "longDescription",
      "tags",
      "categories",
      "platforms",
      "softwareType",
      "repositoryType",
    ]);
  });
});

describe("condenseReadme", () => {
  it("leaves short plain text untouched", () => {
    expect(condenseReadme("A short project description.")).toBe(
      "A short project description.",
    );
  });

  it("strips HTML comments", () => {
    expect(condenseReadme("intro\n<!-- TODO: rewrite this -->\nbody")).toBe(
      "intro\n\nbody",
    );
  });

  it("strips fenced code blocks", () => {
    expect(condenseReadme("intro\n```js\nconsole.log(1)\n```\nbody")).toBe(
      "intro\n\nbody",
    );
  });

  it("strips badge links", () => {
    expect(
      condenseReadme(
        "[![Build](https://img.shields.io/badge/build-passing-green)](https://ci.example.com)\nbody",
      ),
    ).toBe("body");
  });

  it("collapses runs of blank lines", () => {
    expect(condenseReadme("intro\n\n\n\n\nbody")).toBe("intro\n\nbody");
  });

  it("truncates at the nearest paragraph boundary under the limit", () => {
    const kept = "keep this paragraph.";
    const dropped = "x".repeat(50);
    const content = `${kept}\n\n${dropped}`;

    expect(condenseReadme(content, kept.length + 10)).toBe(kept);
  });

  it("hard-truncates when no paragraph boundary exists under the limit", () => {
    const content = "x".repeat(100);
    expect(condenseReadme(content, 20)).toBe("x".repeat(20));
  });
});

describe("applyEnrichment", () => {
  const blankDraft: CodeJSON = {
    ...complete,
    longDescription: "",
    tags: [],
    categories: [],
    platforms: [],
    softwareType: blank,
    repositoryType: blank,
  };

  it("only writes fields listed as missing", () => {
    const result = applyEnrichment(
      blankDraft,
      {
        longDescription: "a".repeat(200),
        categories: ["compliance-management"],
      },
      ["longDescription"],
    );

    expect(result.longDescription).toBe("a".repeat(200));
    expect(result.categories).toEqual([]);
  });

  it("clamps longDescription to 2000 characters", () => {
    const result = applyEnrichment(
      blankDraft,
      { longDescription: "a ".repeat(1500) },
      ["longDescription"],
    );

    expect(result.longDescription).toHaveLength(2000);
  });

  it("merges generated tags with existing tags instead of replacing them", () => {
    const draft = { ...blankDraft, tags: ["manual"] };
    const result = applyEnrichment(draft, { tags: ["generated", "manual"] }, [
      "tags",
    ]);

    expect(result.tags).toEqual(["generated", "manual"]);
  });

  it("drops category values outside the controlled vocabulary", () => {
    const result = applyEnrichment(
      blankDraft,
      { categories: ["compliance-management", "GitHub Actions"] },
      ["categories"],
    );

    expect(result.categories).toEqual(["compliance-management"]);
  });

  it("drops platform values outside the schema's enum", () => {
    const result = applyEnrichment(
      blankDraft,
      { platforms: ["web", "atari" as CodeJSON["platforms"][number]] },
      ["platforms"],
    );

    expect(result.platforms).toEqual(["web"]);
  });

  it("rejects a softwareType outside the schema's enum", () => {
    const result = applyEnrichment(
      blankDraft,
      { softwareType: "not-a-real-type" as CodeJSON["softwareType"] },
      ["softwareType"],
    );

    expect(result.softwareType).toBe(blank);
  });

  it("accepts a softwareType within the schema's enum", () => {
    const result = applyEnrichment(blankDraft, { softwareType: "library" }, [
      "softwareType",
    ]);

    expect(result.softwareType).toBe("library");
  });

  it("rejects a repositoryType outside the schema's enum", () => {
    const result = applyEnrichment(
      blankDraft,
      { repositoryType: "not-a-real-type" as CodeJSON["repositoryType"] },
      ["repositoryType"],
    );

    expect(result.repositoryType).toBe(blank);
  });

  it("accepts a repositoryType within the schema's enum", () => {
    const result = applyEnrichment(blankDraft, { repositoryType: "tools" }, [
      "repositoryType",
    ]);

    expect(result.repositoryType).toBe("tools");
  });

  it("leaves a missing field untouched when nothing was generated for it", () => {
    const result = applyEnrichment(blankDraft, {}, ["longDescription", "tags"]);

    expect(result.longDescription).toBe("");
    expect(result.tags).toEqual([]);
  });

  it("does not mutate the input", () => {
    const before = JSON.parse(JSON.stringify(blankDraft));
    applyEnrichment(blankDraft, { longDescription: "a".repeat(200) }, [
      "longDescription",
    ]);

    expect(blankDraft).toEqual(before);
  });
});

describe("enrichCodeJSON", () => {
  const blankDraft: CodeJSON = {
    ...complete,
    longDescription: "",
    tags: [],
    categories: [],
    platforms: [],
    softwareType: blank,
    repositoryType: blank,
  };
  const usableDescription = "This project does many useful things. ".repeat(5);

  it("returns the draft unchanged and never runs the model when nothing is missing", async () => {
    const runModel = jest.fn<any>();

    const result = await enrichCodeJSON(
      complete,
      { readme: null, secrets: [] },
      createMockLogger(),
      runModel as unknown as ModelRunner,
    );

    expect(result).toBe(complete);
    expect(runModel).not.toHaveBeenCalled();
  });

  it("returns the draft unchanged when no model is available", async () => {
    const runModel: ModelRunner = async () => null;

    const result = await enrichCodeJSON(
      blankDraft,
      { readme: null, secrets: [] },
      createMockLogger(),
      runModel,
    );

    expect(result).toBe(blankDraft);
  });

  it("returns the draft unchanged and logs a warning when the model run throws", async () => {
    const runModel: ModelRunner = async () => {
      throw new Error("generation blew up");
    };
    const log = createMockLogger();

    const result = await enrichCodeJSON(
      blankDraft,
      { readme: null, secrets: [] },
      log,
      runModel,
    );

    expect(result).toBe(blankDraft);
    expect(log.warning).toHaveBeenCalledWith(
      expect.stringContaining("generation blew up"),
    );
  });

  it("fills every missing field from the model's answers", async () => {
    const session = createFakeSession({
      generateText: jest.fn<any>().mockResolvedValue(usableDescription),
      generateJSON: jest.fn<any>().mockResolvedValue({
        tags: ["generated"],
        categories: ["compliance-management"],
        platforms: ["web"],
        softwareType: "library",
        repositoryType: "tools",
      }),
    });

    const result = await enrichCodeJSON(
      blankDraft,
      { readme: null, secrets: [] },
      createMockLogger(),
      runnerFor(session),
    );

    expect(result.longDescription).toBe(usableDescription);
    expect(result.tags).toEqual(["generated"]);
    expect(result.categories).toEqual(["compliance-management"]);
    expect(result.platforms).toEqual(["web"]);
    expect(result.softwareType).toBe("library");
    expect(result.repositoryType).toBe("tools");
    expect(session.generateText).toHaveBeenCalledTimes(1);
    expect(session.generateJSON).toHaveBeenCalledTimes(1);
  });

  it("leaves longDescription blank and warns when the answer comes back too short", async () => {
    const generateText = jest.fn<any>().mockResolvedValue("still too short");
    const session = createFakeSession({
      generateText,
      generateJSON: jest
        .fn<any>()
        .mockResolvedValue({ softwareType: "library" }),
    });
    const log = createMockLogger();

    const result = await enrichCodeJSON(
      { ...blankDraft, repositoryType: "tools" },
      { readme: null, secrets: [] },
      log,
      runnerFor(session),
    );

    expect(result.longDescription).toBe("");
    expect(result.softwareType).toBe("library");
    expect(log.warning).toHaveBeenCalledWith(
      expect.stringContaining("could not produce a usable longDescription"),
    );
  });

  it("discards a longDescription that only echoes the short description", async () => {
    // a long-enough description isolates the echo check from the length check
    const draft = {
      ...complete,
      description: usableDescription,
      longDescription: "",
    };
    const generateText = jest.fn<any>().mockResolvedValue(draft.description);
    const session = createFakeSession({ generateText });

    const result = await enrichCodeJSON(
      draft,
      { readme: null, secrets: [] },
      createMockLogger(),
      runnerFor(session),
    );

    expect(result.longDescription).toBe("");
    expect(session.generateJSON).not.toHaveBeenCalled();
  });

  it("leaves longDescription blank and warns when the prose call throws", async () => {
    const session = createFakeSession({
      generateText: jest.fn<any>().mockRejectedValue(new Error("aborted")),
      generateJSON: jest
        .fn<any>()
        .mockResolvedValue({ softwareType: "library" }),
    });
    const log = createMockLogger();

    const result = await enrichCodeJSON(
      blankDraft,
      { readme: null, secrets: [] },
      log,
      runnerFor(session),
    );

    expect(result.longDescription).toBe("");
    expect(result.softwareType).toBe("library");
    expect(log.warning).toHaveBeenCalledWith(
      expect.stringContaining("longDescription generation failed"),
    );
  });

  it("keeps a generated longDescription when the classification call fails", async () => {
    const session = createFakeSession({
      generateText: jest.fn<any>().mockResolvedValue(usableDescription),
      generateJSON: jest
        .fn<any>()
        .mockRejectedValue(new Error("grammar parse failed")),
    });
    const log = createMockLogger();

    const result = await enrichCodeJSON(
      blankDraft,
      { readme: null, secrets: [] },
      log,
      runnerFor(session),
    );

    expect(result.longDescription).toBe(usableDescription);
    expect(result.softwareType).toBe(blank);
    expect(log.warning).toHaveBeenCalledWith(
      expect.stringContaining("Field classification failed"),
    );
  });

  it("drops a classification value outside the schema's enum before it reaches the result", async () => {
    const session = createFakeSession({
      generateJSON: jest
        .fn<any>()
        .mockResolvedValue({ softwareType: "not-a-real-type" }),
    });

    const result = await enrichCodeJSON(
      { ...complete, softwareType: blank },
      { readme: null, secrets: [] },
      createMockLogger(),
      runnerFor(session),
    );

    expect(result.softwareType).toBe(blank);
  });

  it("passes the condensed readme and known fields into the prompt", async () => {
    const generateText = jest.fn<any>().mockResolvedValue("");
    const session = createFakeSession({ generateText });
    const readme = "intro\n<!-- internal note -->\nmore detail";

    await enrichCodeJSON(
      { ...complete, longDescription: "" },
      { readme, secrets: [] },
      createMockLogger(),
      runnerFor(session),
    );

    const prompt = generateText.mock.calls[0][0] as string;
    expect(prompt).toContain(`Software type: ${complete.softwareType}`);
    expect(prompt).toContain("README:");
    expect(prompt).toContain("intro");
    expect(prompt).not.toContain("internal note");
  });
});

describe("screenGenerated", () => {
  const token = "ghs_abcdEFGH1234ijklMNOP5678";
  const safeDescription =
    "A tool that generates code.json metadata for federal repositories.";

  it("keeps output that passes every check", () => {
    const generated = { longDescription: safeDescription, tags: ["metadata"] };

    expect(screenGenerated(generated, [token], createMockLogger())).toEqual(
      generated,
    );
  });

  it.each([
    ["a link", "See https://evil.example for details."],
    ["a bare www link", "Visit www.evil.example today."],
    ["html", "Metadata <img src=x onerror=alert(1)> tool."],
    ["a markdown link", "Read [the docs](evil) first."],
    ["an encoded blob", "Payload aGVsbG8gd29ybGQgaGVsbG8gd29ybGQK here."],
    ["a leaked token", `Configured with ${token} on every run.`],
    [
      "a transformed token fragment",
      `Key is ${token.slice(7, 15).toUpperCase()} ok.`,
    ],
  ])("discards a longDescription containing %s", (_, longDescription) => {
    const log = createMockLogger();
    const result = screenGenerated({ longDescription }, [token], log);

    expect(result.longDescription).toBeUndefined();
    expect(log.warning).toHaveBeenCalledWith(
      expect.stringContaining("longDescription"),
    );
  });

  it("drops only the tags that fail and caps the count", () => {
    const tags = [
      "metadata",
      "https://evil.example",
      "<script>",
      "x".repeat(51),
      token.slice(4, 16),
      ...Array.from({ length: 12 }, (_, i) => `tag${i}`),
    ];
    const result = screenGenerated({ tags }, [token], createMockLogger());

    expect(result.tags).toEqual([
      "metadata",
      ...Array.from({ length: 9 }, (_, i) => `tag${i}`),
    ]);
  });
});

describe("enrichedFields", () => {
  it("lists only the enrichable fields that changed", () => {
    const after = { ...complete, tags: [...complete.tags, "new"] };

    expect(enrichedFields(complete, after)).toEqual(["tags"]);
    expect(enrichedFields(complete, { ...complete })).toEqual([]);
  });
});

describe("enrichCodeJSON output screening", () => {
  it("never writes a leaked secret into code.json", async () => {
    const token = "ghs_abcdEFGH1234ijklMNOP5678";
    const session = createFakeSession({
      generateText: jest
        .fn<any>()
        .mockResolvedValue(
          `This project is configured with the token ${token} which it uses on every scheduled run of the workflow. It keeps federal repository metadata current without any manual steps from maintainers.`,
        ),
    });

    const result = await enrichCodeJSON(
      { ...complete, longDescription: "" },
      { readme: null, secrets: [token] },
      createMockLogger(),
      runnerFor(session),
    );

    expect(result.longDescription).toBe("");
  });
});
