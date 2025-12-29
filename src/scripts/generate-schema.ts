import fs from "fs";
import path from "path";
import prettier from "prettier";
import { JsonSchema, jsonSchemaToZod } from "json-schema-to-zod";

const schemaVersion = "2.0.0";
const schemaURL = `https://raw.githubusercontent.com/DSACMS/gov-codejson/refs/heads/main/schemas/cms/schema-${schemaVersion}.json`;
const filePath = "src/types/CodeJSONSchema.ts";

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

    let refinements = permissionRefinement
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
    const response = await fetch(schemaURL);
    const jsonSchema = (await response.json()) as JsonSchema;

    let zodSourceCode = jsonSchemaToZod(jsonSchema);
    zodSourceCode = fixUniqueArrays(zodSourceCode);

    const fileContent = `
        // DO NOT EDIT - AUTOMATICALLY GENERATED FILE!!!

        import { z } from "zod";

        export const CodeJSONSchema = (${zodSourceCode})${addAdditionalRefinements()}

        export type CodeJSON = z.infer<typeof CodeJSONSchema>;
    `;

    fs.writeFileSync(filePath, fileContent);
    await formatFile(filePath);
}

await generateSchema();
