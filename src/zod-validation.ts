import { z } from "zod";
import { CodeJSONSchema } from "./types/CodeJSONSchema.js";

export function validateCodeJSON(codeJSON: any): string[] {
  const result = CodeJSONSchema.safeParse(codeJSON);

  if (result.success) {
    return [];
  }

  return result.error.issues.map((err: z.ZodIssue) => {
    const path = err.path.join(".");
    const field = path || "root";
    return `${field}: ${err.message}`;
  });
}

