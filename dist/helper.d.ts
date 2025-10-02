import { CodeJSON } from "./model.js";
import { validateCodeJSON } from "./validation.js";
export declare function calculateMetaData(): Promise<Partial<CodeJSON>>;
export declare function getBaseBranch(): Promise<string>;
export declare function validateOnly(): Promise<void>;
export { validateCodeJSON };
export declare function readJSON(filepath: string): Promise<CodeJSON | null>;
export declare function sendPR(updatedCodeJSON: CodeJSON, baseBranchName: string): Promise<void>;
export declare function pushDirectlyWithFallback(updatedCodeJSON: CodeJSON, baseBranchName: string): Promise<void>;
