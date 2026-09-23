import type { GbnfJsonSchema } from "node-llama-cpp";
import { CodeJSON } from "./codejson.js";
import {
  CATEGORIES,
  PLATFORMS,
  REPOSITORY_TYPES,
  SOFTWARE_TYPES,
} from "./enrich.data.js";
import { mergeTags } from "./helper.js";
import { ModelRunner, ModelSession, withModel } from "./llm.js";
import { Logger } from "./types/Dependencies.js";

const LONG_DESCRIPTION_MIN_LENGTH = 150;
const LONG_DESCRIPTION_MAX_LENGTH = 10000;
const DEFAULT_README_MAX_CHARS = 4000;
const TARGET_ITEM_COUNT = 5;

export const ENRICHABLE_FIELDS = [
  "longDescription",
  "tags",
  "categories",
  "platforms",
  "softwareType",
  "repositoryType",
] as const;

export interface GeneratedFields {
  longDescription: string;
  tags: string[];
  categories: string[];
  platforms: CodeJSON["platforms"];
  softwareType: CodeJSON["softwareType"];
  repositoryType: CodeJSON["repositoryType"];
}

export type EnrichableField = (typeof ENRICHABLE_FIELDS)[number];
type ClassificationField = Exclude<EnrichableField, "longDescription">;

export function missingEnrichableFields(codeJSON: CodeJSON): EnrichableField[] {
  return ENRICHABLE_FIELDS.filter((field) => {
    switch (field) {
      case "longDescription":
        return (
          codeJSON.longDescription.trim().length < LONG_DESCRIPTION_MIN_LENGTH
        );
      case "tags":
        return codeJSON.tags.length < TARGET_ITEM_COUNT;
      case "categories":
      case "platforms":
        return codeJSON[field].length === 0;
      case "softwareType":
      case "repositoryType":
        return (codeJSON[field] as string) === "";
    }
  });
}

export function condenseReadme(
  content: string,
  maxChars: number = DEFAULT_README_MAX_CHARS,
): string {
  const stripped = content
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\[!\[.*?\]\(.*?\)\]\(.*?\)/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (stripped.length <= maxChars) {
    return stripped;
  }

  const truncated = stripped.slice(0, maxChars);
  const paragraphBoundary = truncated.lastIndexOf("\n\n");

  return (
    paragraphBoundary > 0 ? truncated.slice(0, paragraphBoundary) : truncated
  ).trim();
}

export function applyEnrichment(
  codeJSON: CodeJSON,
  generated: Partial<GeneratedFields>,
  missing: EnrichableField[], // writes only the fields that are missing
): CodeJSON {
  const result = { ...codeJSON };

  for (const field of missing) {
    switch (field) {
      case "longDescription":
        if (generated.longDescription) {
          result.longDescription = generated.longDescription.slice(
            0,
            LONG_DESCRIPTION_MAX_LENGTH,
          );
        }
        break;
      case "tags":
        if (generated.tags) {
          result.tags = mergeTags(generated.tags, codeJSON.tags);
        }
        break;
      case "categories":
        if (generated.categories) {
          result.categories = generated.categories.filter((category) =>
            (CATEGORIES as readonly string[]).includes(category),
          );
        }
        break;
      case "platforms":
        if (generated.platforms) {
          result.platforms = generated.platforms.filter((platform) =>
            (PLATFORMS as readonly string[]).includes(platform),
          );
        }
        break;
      case "softwareType":
        if (
          generated.softwareType &&
          (SOFTWARE_TYPES as readonly string[]).includes(generated.softwareType)
        ) {
          result.softwareType = generated.softwareType;
        }
        break;
      case "repositoryType":
        if (
          generated.repositoryType &&
          (REPOSITORY_TYPES as readonly string[]).includes(
            generated.repositoryType,
          )
        ) {
          result.repositoryType = generated.repositoryType;
        }
        break;
    }
  }

  return result;
}

export async function enrichCodeJSON(
  codeJSON: CodeJSON,
  context: { readme: string | null },
  log: Logger,
  runModel: ModelRunner = withModel,
): Promise<CodeJSON> {
  const missing = missingEnrichableFields(codeJSON);

  if (missing.length === 0) {
    log.info("No AI-enrichable fields are missing, skipping model generation.");
    return codeJSON;
  }

  let generated: Partial<GeneratedFields> | null;
  try {
    generated = await runModel(log, (session) =>
      generateFields(session, codeJSON, context.readme, missing, log),
    );
  } catch (error) {
    log.warning(
      `AI enrichment failed, continuing without it: ${errorMessage(error)}`,
    );
    return codeJSON;
  }

  if (generated === null) {
    return codeJSON;
  }

  return applyEnrichment(codeJSON, generated, missing);
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

async function generateFields(
  session: ModelSession,
  codeJSON: CodeJSON,
  readme: string | null,
  missing: EnrichableField[],
  log: Logger,
): Promise<Partial<GeneratedFields>> {
  const promptContext = buildPromptContext(codeJSON, readme);
  const generated: Partial<GeneratedFields> = {};

  if (missing.includes("longDescription")) {
    const longDescription = await generateLongDescription(
      session,
      codeJSON.description,
      promptContext,
      log,
    );
    if (longDescription) {
      generated.longDescription = longDescription;
    }
  }

  const classificationFields = missing.filter(
    (field): field is ClassificationField => field !== "longDescription",
  );
  if (classificationFields.length > 0) {
    Object.assign(
      generated,
      await generateClassification(
        session,
        promptContext,
        classificationFields,
        log,
      ),
    );
  }

  return generated;
}

function buildPromptContext(codeJSON: CodeJSON, readme: string | null): string {
  const lines = [
    `Project name: ${codeJSON.name}`,
    `Short description: ${codeJSON.description}`,
    `Languages: ${codeJSON.languages.join(", ") || "unknown"}`,
    `Existing tags: ${codeJSON.tags.join(", ") || "none"}`,
    `Repository URL: ${codeJSON.repositoryURL}`,
  ];

  if ((codeJSON.softwareType as string) !== "") {
    lines.push(`Software type: ${codeJSON.softwareType}`);
  }
  if ((codeJSON.repositoryType as string) !== "") {
    lines.push(`Repository type: ${codeJSON.repositoryType}`);
  }

  if (readme) {
    lines.push("", "README:", condenseReadme(readme));
  }

  return lines.join("\n");
}

async function generateLongDescription(
  session: ModelSession,
  shortDescription: string,
  promptContext: string,
  log: Logger,
): Promise<string | undefined> {
  const prompt = `${promptContext}\n\nWrite a longer description of this software for a potential user, at least four sentences. Do not repeat the short description verbatim.`;

  try {
    const answer = await session.generateText(prompt);

    const isUnusable =
      answer.trim().length < LONG_DESCRIPTION_MIN_LENGTH ||
      answer.trim().toLowerCase() === shortDescription.trim().toLowerCase();

    if (isUnusable) {
      log.warning(
        "Model could not produce a usable longDescription, leaving it blank.",
      );
      return undefined;
    }

    return answer;
  } catch (error) {
    log.warning(`longDescription generation failed: ${errorMessage(error)}`);
    return undefined;
  }
}

async function generateClassification(
  session: ModelSession,
  promptContext: string,
  fields: ClassificationField[],
  log: Logger,
): Promise<Partial<GeneratedFields>> {
  const instructions = [
    "Classify this software project for a code.json metadata record. Choose only labels the project clearly fits; do not pad.",
  ];

  if (fields.includes("tags")) {
    instructions.push(
      `For tags, list at least ${TARGET_ITEM_COUNT} of the best single words or short phrases describing the project's purpose, domain, or technology.`,
    );
  }

  if (fields.includes("categories")) {
    instructions.push(
      `For categories, choose the best matching items from this list: ${CATEGORIES.join(", ")}.`,
    );
  }

  if (fields.includes("softwareType")) {
    instructions.push(
      "For softwareType, say what the software is: addon extends another product or platform, library is imported by other code, standalone/* runs on its own.",
    );
  }

  if (fields.includes("repositoryType")) {
    instructions.push(
      "For repositoryType, say what this repository ships: tools for developer or automation tooling, application for an end-user product, package for a published dependency, website for a site's source.",
    );
  }

  const prompt = `${promptContext}\n\n${instructions.join(" ")}`;

  try {
    const result = await session.generateJSON(
      prompt,
      classificationSchema(fields),
    );
    return result as unknown as Partial<GeneratedFields>;
  } catch (error) {
    log.warning(`Field classification failed: ${errorMessage(error)}`);
    return {};
  }
}

function classificationSchema(fields: ClassificationField[]): GbnfJsonSchema {
  const properties: Record<string, GbnfJsonSchema> = {};

  if (fields.includes("tags")) {
    properties.tags = {
      type: "array",
      items: { type: "string" },
      minItems: TARGET_ITEM_COUNT,
    };
  }
  if (fields.includes("categories")) {
    properties.categories = {
      type: "array",
      items: { enum: CATEGORIES },
      minItems: 1,
      maxItems: TARGET_ITEM_COUNT,
    };
  }
  if (fields.includes("platforms")) {
    properties.platforms = {
      type: "array",
      items: { enum: PLATFORMS },
      minItems: 1,
    };
  }
  if (fields.includes("softwareType")) {
    properties.softwareType = { enum: SOFTWARE_TYPES };
  }
  if (fields.includes("repositoryType")) {
    properties.repositoryType = { enum: REPOSITORY_TYPES };
  }

  return { type: "object", properties };
}
