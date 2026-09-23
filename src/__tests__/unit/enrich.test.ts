import { describe, it, expect, jest } from "@jest/globals";
import {
  missingEnrichableFields,
  condenseReadme,
  applyEnrichment,
  enrichCodeJSON,
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
      { longDescription: "a".repeat(200), categories: ["compliance"] },
      ["longDescription"],
    );

    expect(result.longDescription).toBe("a".repeat(200));
    expect(result.categories).toEqual([]);
  });

  it("clamps longDescription to the schema's maximum length", () => {
    const result = applyEnrichment(
      blankDraft,
      { longDescription: "a".repeat(10500) },
      ["longDescription"],
    );

    expect(result.longDescription).toHaveLength(10000);
  });

  it("merges generated tags with existing tags instead of replacing them", () => {
    const draft = { ...blankDraft, tags: ["manual"] };
    const result = applyEnrichment(draft, { tags: ["generated", "manual"] }, [
      "tags",
    ]);

    expect(result.tags).toEqual(["generated", "manual"]);
  });

  it("writes categories directly", () => {
    const result = applyEnrichment(
      blankDraft,
      { categories: ["compliance", "automation"] },
      ["categories"],
    );

    expect(result.categories).toEqual(["compliance", "automation"]);
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
      { readme: null },
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
      { readme: null },
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
      { readme: null },
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
        categories: ["compliance"],
        platforms: ["web"],
        softwareType: "library",
        repositoryType: "tools",
      }),
    });

    const result = await enrichCodeJSON(
      blankDraft,
      { readme: null },
      createMockLogger(),
      runnerFor(session),
    );

    expect(result.longDescription).toBe(usableDescription);
    expect(result.tags).toEqual(["generated"]);
    expect(result.categories).toEqual(["compliance"]);
    expect(result.platforms).toEqual(["web"]);
    expect(result.softwareType).toBe("library");
    expect(result.repositoryType).toBe("tools");
    expect(session.generateText).toHaveBeenCalledTimes(1);
    expect(session.generateJSON).toHaveBeenCalledTimes(1);
  });

  it("retries once when the longDescription comes back too short", async () => {
    const generateText = jest
      .fn<any>()
      .mockResolvedValueOnce("too short")
      .mockResolvedValueOnce(usableDescription);
    const session = createFakeSession({ generateText });

    const result = await enrichCodeJSON(
      { ...blankDraft, softwareType: "library", repositoryType: "tools" },
      { readme: null },
      createMockLogger(),
      runnerFor(session),
    );

    expect(result.longDescription).toBe(usableDescription);
    expect(generateText).toHaveBeenCalledTimes(2);
    expect(generateText.mock.calls[1][0]).toEqual(
      expect.stringContaining("too short"),
    );
  });

  it("leaves longDescription blank and warns when both attempts come back too short", async () => {
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
      { readme: null },
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
      { readme: null },
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
      { readme: null },
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
      { readme: null },
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
      { readme: null },
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
      { readme },
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
