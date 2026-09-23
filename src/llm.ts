import * as fs from "fs/promises";
import type {
  GbnfJsonSchema,
  GbnfJsonSchemaToType,
  LlamaGrammar,
} from "node-llama-cpp";
import { Logger } from "./types/Dependencies.js";

const DEFAULT_MODEL_PATH = "/opt/models/model.gguf";
const TIMEOUT_MS = 900_000;
const DEFAULT_MAX_TOKENS = 1500;
const THOUGHT_TOKEN_BUDGET = 500;

const SYSTEM_PROMPT =
  "You write precise, factual text for USA government software metadata records. Answer " +
  "only with the requested content: no preamble, no meta-commentary, no " +
  "markdown formatting, and never mention that you are an AI or a language model.";

export function getModelPath(): string {
  return process.env.ACG_MODEL_PATH || DEFAULT_MODEL_PATH;
}

export interface ModelSession {
  generateText(prompt: string, maxTokens?: number): Promise<string>;

  generateJSON<const Schema extends GbnfJsonSchema>(
    prompt: string,
    schema: Schema,
    maxTokens?: number,
  ): Promise<GbnfJsonSchemaToType<Schema>>;
}

export type ModelRunner = <T>(
  log: Logger,
  run: (session: ModelSession) => Promise<T>,
) => Promise<T | null>;

export const withModel: ModelRunner = async (log, run) => {
  const modelPath = getModelPath();

  if (!(await exists(modelPath))) {
    log.info(`No model found at ${modelPath}, skipping generation.`);
    return null;
  }

  const { getLlama, LlamaChatSession } = await import("node-llama-cpp");

  const llama = await getLlama({ gpu: false, build: "never" });
  const model = await llama.loadModel({ modelPath });
  const deadline = AbortSignal.timeout(TIMEOUT_MS);

  async function prompt(
    text: string,
    maxTokens: number,
    grammar?: LlamaGrammar,
    temperature?: number,
  ): Promise<string> {
    const startedAt = Date.now();
    const context = await model.createContext();

    try {
      const session = new LlamaChatSession({
        contextSequence: context.getSequence(),
        systemPrompt: SYSTEM_PROMPT,
      });

      let thought = "";

      const answer = await session.prompt(text, {
        budgets: { thoughtTokens: THOUGHT_TOKEN_BUDGET },
        maxTokens,
        signal: deadline,
        grammar,
        temperature,
        onResponseChunk: (chunk) => {
          if (chunk.type === "segment" && chunk.segmentType === "thought") {
            thought += chunk.text;
          }
        },
      });

      const elapsedSeconds = ((Date.now() - startedAt) / 1000).toFixed(1);
      const trimmed = answer.trim();

      if (thought.trim() !== "") {
        log.debug(`Model thought for ${thought.trim().length} characters`);
      }

      log.debug(
        `Model responded in ${elapsedSeconds}s with ${trimmed.length} characters`,
      );

      log.info(`Model thoughts: ${thought}`);
      log.info(`Model response: ${trimmed}`);

      return trimmed;
    } finally {
      await context.dispose();
    }
  }

  try {
    return await run({
      generateText: (text, maxTokens = DEFAULT_MAX_TOKENS) =>
        prompt(text, maxTokens),

      generateJSON: async <const Schema extends GbnfJsonSchema>(
        text: string,
        schema: Schema,
        maxTokens: number = DEFAULT_MAX_TOKENS,
      ): Promise<GbnfJsonSchemaToType<Schema>> => {
        const grammar = await llama.createGrammarForJsonSchema<Schema>(schema);
        const answer = await prompt(text, maxTokens, grammar, 0);

        return grammar.parse(answer) as GbnfJsonSchemaToType<Schema>;
      },
    });
  } finally {
    await model.dispose();
  }
};

async function exists(filepath: string): Promise<boolean> {
  try {
    await fs.access(filepath);
    return true;
  } catch {
    return false;
  }
}
