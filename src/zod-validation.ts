import { z } from "zod";
import { createErrorMap } from "zod-validation-error";
import { CodeJSONSchema } from "./types/CodeJSONSchema.js";

z.config({
  customError: createErrorMap({
    displayInvalidFormatDetails: true
  }),
});

export function validateCodeJSON(codeJSON: any): string[] {
  const result = CodeJSONSchema.safeParse(codeJSON);

  if (result.success) {
    return [];
  }

  return [z.prettifyError(result.error)]
}

