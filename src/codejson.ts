import { cmsProfile, type CMSCodeJSON } from "codejson-core";

export type CodeJSON = CMSCodeJSON;

export const draftCodeJSON = cmsProfile.draft;
export const validateCodeJSON = cmsProfile.validate;
export const droppedFields = cmsProfile.droppedFields;
