import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
} from "@jest/globals";
import * as fs from "fs/promises";
import * as os from "os";
import * as path from "path";
import { createMockLogger } from "../fixtures/mock-deps.js";

// the real binding needs a multi-gigabyte GGUF and a compiled .node binary, so the
// module is faked here. withModel's own early return covers the no-model case below
const promptMock = jest.fn<any>(async () => "generated text");
const contextDisposeMock = jest.fn<any>(async () => undefined);
const modelDisposeMock = jest.fn<any>(async () => undefined);
const createContextMock = jest.fn<any>(async () => ({
  getSequence: () => ({}),
  dispose: contextDisposeMock,
}));
const createGrammarMock = jest.fn<any>(async () => ({
  parse: (text: string) => JSON.parse(text),
}));
const loadModelMock = jest.fn<any>(async () => ({
  createContext: createContextMock,
  dispose: modelDisposeMock,
}));
const getLlamaMock = jest.fn<any>(async () => ({
  loadModel: loadModelMock,
  createGrammarForJsonSchema: createGrammarMock,
}));
const sessionConstructorMock = jest.fn<any>();

jest.unstable_mockModule("node-llama-cpp", () => ({
  getLlama: getLlamaMock,
  LlamaChatSession: class {
    constructor(options: unknown) {
      sessionConstructorMock(options);
    }
    async prompt(text: string, options: unknown) {
      return promptMock(text, options);
    }
  },
}));

const { withModel, getModelPath } = await import("../../llm.js");

describe("getModelPath", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("defaults to the path the Dockerfile bakes the model into", () => {
    delete process.env.ACG_MODEL_PATH;
    expect(getModelPath()).toBe("/opt/models/model.gguf");
  });

  it("honours an override", () => {
    process.env.ACG_MODEL_PATH = "/tmp/other.gguf";
    expect(getModelPath()).toBe("/tmp/other.gguf");
  });
});

describe("withModel without a model present", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns null and never runs the callback", async () => {
    process.env.ACG_MODEL_PATH = "/nonexistent/model.gguf";
    const log = createMockLogger();
    const run = jest.fn<any>();

    expect(await withModel(log, run as any)).toBeNull();
    expect(run).not.toHaveBeenCalled();
    expect(log.info).toHaveBeenCalledWith(
      "No model found at /nonexistent/model.gguf, skipping generation.",
    );
  });
});

describe("withModel with a model present", () => {
  const originalEnv = process.env;
  let modelFile: string;
  let temporaryDirectory: string;

  beforeAll(async () => {
    temporaryDirectory = await fs.mkdtemp(path.join(os.tmpdir(), "acg-llm-"));
    modelFile = path.join(temporaryDirectory, "model.gguf");
    await fs.writeFile(modelFile, "not a real model");
  });

  afterAll(async () => {
    await fs.rm(temporaryDirectory, { recursive: true, force: true });
  });

  beforeEach(() => {
    process.env = { ...originalEnv, ACG_MODEL_PATH: modelFile };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns whatever the callback returns", async () => {
    const result = await withModel(createMockLogger(), async (session) =>
      session.generateText("describe this project"),
    );

    expect(result).toBe("generated text");
    expect(promptMock).toHaveBeenCalledWith(
      "describe this project",
      expect.objectContaining({ maxTokens: 1500 }),
    );
  });

  it("loads the model once and disposes it when the run finishes", async () => {
    await withModel(createMockLogger(), async (session) => {
      await session.generateText("first");
      await session.generateText("second");
    });

    expect(loadModelMock).toHaveBeenCalledTimes(1);
    expect(modelDisposeMock).toHaveBeenCalledTimes(1);
  });

  // a shared session would carry the first answer into the second prompt as history
  it("gives each prompt its own context and disposes it", async () => {
    await withModel(createMockLogger(), async (session) => {
      await session.generateText("first");
      await session.generateText("second");
    });

    expect(createContextMock).toHaveBeenCalledTimes(2);
    expect(contextDisposeMock).toHaveBeenCalledTimes(2);
  });

  it("disposes the model even when the run throws", async () => {
    await expect(
      withModel(createMockLogger(), async () => {
        throw new Error("generation blew up");
      }),
    ).rejects.toThrow("generation blew up");

    expect(modelDisposeMock).toHaveBeenCalledTimes(1);
  });

  it("disposes the context even when a prompt throws", async () => {
    promptMock.mockRejectedValueOnce(new Error("aborted"));

    await expect(
      withModel(createMockLogger(), async (session) =>
        session.generateText("first"),
      ),
    ).rejects.toThrow("aborted");

    expect(contextDisposeMock).toHaveBeenCalledTimes(1);
  });

  it("passes a deadline so a stuck generation cannot hold the job open", async () => {
    await withModel(createMockLogger(), async (session) =>
      session.generateText("first"),
    );

    const options = promptMock.mock.calls[0][1] as any;
    expect(options.signal).toBeInstanceOf(AbortSignal);
  });

  it("honours a caller supplied token budget", async () => {
    await withModel(createMockLogger(), async (session) =>
      session.generateText("first", 1200),
    );

    expect(promptMock).toHaveBeenCalledWith(
      "first",
      expect.objectContaining({ maxTokens: 1200 }),
    );
  });

  it("constrains JSON generation with a grammar built from the schema", async () => {
    const schema = {
      type: "object",
      properties: { softwareType: { enum: ["library", "addon"] } },
    } as const;

    promptMock.mockResolvedValueOnce('{"softwareType":"library"}');

    const result = await withModel(createMockLogger(), async (session) =>
      session.generateJSON("classify this", schema),
    );

    expect(createGrammarMock).toHaveBeenCalledWith(schema);
    expect(promptMock).toHaveBeenCalledWith(
      "classify this",
      expect.objectContaining({ grammar: expect.anything() }),
    );
    expect(result).toEqual({ softwareType: "library" });
  });

  // an unset temperature would let identical repo state classify differently
  // across scheduled runs, opening a no-op-looking PR
  it("pins temperature to 0 for JSON generation so results are reproducible", async () => {
    const schema = { type: "object", properties: {} } as const;
    promptMock.mockResolvedValueOnce("{}");

    await withModel(createMockLogger(), async (session) =>
      session.generateJSON("classify this", schema),
    );

    expect(promptMock).toHaveBeenCalledWith(
      "classify this",
      expect.objectContaining({ temperature: 0 }),
    );
  });

  it("replaces the library's generic assistant persona with a task-specific system prompt", async () => {
    await withModel(createMockLogger(), async (session) =>
      session.generateText("first"),
    );

    const options = sessionConstructorMock.mock.calls[0][0] as any;
    expect(options.systemPrompt).toEqual(
      expect.stringContaining("no preamble"),
    );
  });

  it("leaves temperature unset for free-text generation", async () => {
    await withModel(createMockLogger(), async (session) =>
      session.generateText("describe this project"),
    );

    const options = promptMock.mock.calls[0][1] as any;
    expect(options.temperature).toBeUndefined();
  });

  it("reports how long generation took", async () => {
    const log = createMockLogger();

    await withModel(log, async (session) => session.generateText("first"));

    expect(log.info).toHaveBeenCalledWith(
      expect.stringContaining("Model responded in"),
    );
  });
});
