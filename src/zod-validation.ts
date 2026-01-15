import { z } from "zod";
import { CodeJSONSchema } from "./types/CodeJSONSchema.js";

export function validateCodeJSON(codeJSON: any): string[] {
  const result = CodeJSONSchema.safeParse(codeJSON);

  if (result.success) {
    return [];
  }

  return [z.prettifyError(result.error)]
}

