import * as fs from "fs/promises";
import { Logger } from "./types/Dependencies.js";

// the Dockerfile bakes the GGUF in and points this at it
const DEFAULT_MODEL_PATH = "/opt/models/model.gguf";

const SMOKE_TEST_PROMPT =
  "In one sentence, what is a code.json file used for in a government software repository?";

export function getModelPath(): string {
  return process.env.ACG_MODEL_PATH || DEFAULT_MODEL_PATH;
}

// loads the baked in model, asks it one question and prints the answer to the action log.
// this is a smoke test, so a failure here is reported but never fails the action
export async function runModelSmokeTest(log: Logger): Promise<string | null> {
  const modelPath = getModelPath();
  const startedAt = Date.now();

  log.info("===== Local model smoke test =====");
  log.info(`Model path: ${modelPath}`);

  // only the Docker image ships the GGUF, so outside it there is nothing to test.
  // this also keeps the native binding out of unit test and local-action runs
  if (!(await exists(modelPath))) {
    log.info("No model found at that path, skipping the smoke test.");
    return null;
  }

  // imported lazily so environments without the native llama.cpp binary
  // (local-action runs, unit tests) can still load this module
  const { getLlama, LlamaChatSession } = await import("node-llama-cpp");

  // no GPU on an Actions runner, and "never" means use the prebuilt binary
  // rather than compiling llama.cpp from source inside the container
  const llama = await getLlama({ gpu: false, build: "never" });
  const model = await llama.loadModel({ modelPath });

  try {
    const context = await model.createContext();

    try {
      const session = new LlamaChatSession({
        contextSequence: context.getSequence(),
      });

      log.info(`Prompt: ${SMOKE_TEST_PROMPT}`);

      // gemma reasons before it answers, and that reasoning is a "thought" segment
      // that never appears in the returned text. capture it so a run that spends all
      // its tokens thinking is visible in the log instead of looking like a blank answer
      let thought = "";

      const answer = await session.prompt(SMOKE_TEST_PROMPT, {
        // thinking has to stay bounded or a CPU only runner will sit here for minutes
        budgets: { thoughtTokens: 200 },
        maxTokens: 500,
        onResponseChunk: (chunk) => {
          if (chunk.type === "segment" && chunk.segmentType === "thought") {
            thought += chunk.text;
          }
        },
      });

      const elapsedSeconds = ((Date.now() - startedAt) / 1000).toFixed(1);

      if (thought.trim() !== "") {
        log.info(`Thought: ${thought.trim()}`);
      }

      log.info(`Response: ${answer.trim()}`);
      log.info(`Model responded in ${elapsedSeconds}s`);
      log.info("===== Local model smoke test passed =====");

      return answer.trim();
    } finally {
      await context.dispose();
    }
  } finally {
    await model.dispose();
  }
}

async function exists(filepath: string): Promise<boolean> {
  try {
    await fs.access(filepath);
    return true;
  } catch {
    return false;
  }
}

export async function tryModelSmokeTest(log: Logger): Promise<void> {
  try {
    await runModelSmokeTest(log);
  } catch (error) {
    log.warning(`Local model smoke test failed: ${error}`);
  }
}
