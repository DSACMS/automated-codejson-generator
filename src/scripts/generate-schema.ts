import fs from "fs";
import path from "path";
import prettier from "prettier";
import { JsonSchema, jsonSchemaToZod } from "json-schema-to-zod";
import { getLatestSchemaVersion } from "./get-latest-schema.js";

const SCHEMA_BASE_URL = "https://raw.githubusercontent.com/DSACMS/gov-codejson/refs/heads/main/schemas/cms";
const filePath = "src/types/CodeJSONSchema.ts";

function allowEmptyUrls(zodCode: string): string {
    // allow empty strings for all URL fields while still validating non-empty values
    return zodCode.replace(/\.url\(\)/g, '.url().or(z.literal(""))');
  }

function fixUniqueArrays(zodCode: string): string {
    // replace .unique() with .refine() pattern since Zod doesn't have .unique() for arrays but converter adds it in there
    return zodCode.replace(
        /\.unique\(\)/g,
        ".refine((items) => new Set(items).size === items.length, { message: 'Array must contain unique values' })"
    );
}

function addAdditionalRefinements(): string {
    const permissionRefinement = `
        .refine(
            (data) => {
                const usageTypes = data.permissions?.usageType ?? [];
                const hasExemption = usageTypes.some(
                (type) => typeof type === "string" && type.startsWith("exemptBy")
                );

                if (hasExemption) {
                return (
                    data.permissions?.exemptionText != null &&
                    data.permissions.exemptionText.trim().length > 0
                );
                }

                return true;
            },
            {
                message: "exemptionText is required when usageType contains an exemption",
                path: ["permissions", "exemptionText"],
            }
        );
    `;

    const refinements = permissionRefinement
    return refinements
}

async function formatFile(filePath: string) {
    const absolutePath = path.resolve(filePath);
    const source = fs.readFileSync(absolutePath, "utf8");
    const config = await prettier.resolveConfig(absolutePath);

    const formatted = await prettier.format(source, {
        ...config,
        filepath: absolutePath,
    });

    fs.writeFileSync(absolutePath, formatted);
}

async function generateSchema() {
    const schemaVersion = await getLatestSchemaVersion();
    console.log(`Latest schema version: ${schemaVersion}`);

    const schemaURL = `${SCHEMA_BASE_URL}/schema-${schemaVersion}.json`;
    console.log(`Fetching JSON schema from GitHub...`);
    const response = await fetch(schemaURL);
    
    if (!response.ok) {
        throw new Error(`Failed to fetch schema: ${response.status} ${response.statusText}`);
    }

    const jsonSchema = (await response.json()) as JsonSchema;

    console.log(`Converting JSON schema to Zod...`);
    let zodSourceCode = jsonSchemaToZod(jsonSchema);

    zodSourceCode = fixUniqueArrays(zodSourceCode);
    zodSourceCode = allowEmptyUrls(zodSourceCode)

    const fileContent = `
        // DO NOT EDIT - AUTOMATICALLY GENERATED FILE!!!
        // Schema Version: ${schemaVersion}

        import { z } from "zod";

        export const CodeJSONSchema = (${zodSourceCode})${addAdditionalRefinements()}

        export type CodeJSON = z.infer<typeof CodeJSONSchema>;
    `;

    fs.writeFileSync(filePath, fileContent);
    console.log(`File written to ${filePath}...`);

    await formatFile(filePath);
    console.log(`Schema generation complete!`);
}

try {
    await generateSchema();
} catch (error) {
    console.error(`Schema generation failed!`);
    
    if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
    } else {
        console.error(`Unknown error:`, error);
    }
    process.exit(1);
}