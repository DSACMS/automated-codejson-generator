import { z } from "zod";
export declare const CodeJSONSchema: z.ZodObject<{
    name: z.ZodString;
    version: z.ZodOptional<z.ZodString>;
    description: z.ZodString;
    longDescription: z.ZodString;
    status: z.ZodString;
    permissions: z.ZodEffects<z.ZodObject<{
        license: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            URL: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            URL: string;
        }, {
            name: string;
            URL: string;
        }>, "many">>;
        licenses: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            URL: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            URL: string;
        }, {
            name: string;
            URL: string;
        }>, "many">>;
        usageType: z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodString]>;
        exemptionText: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        usageType: string | string[];
        exemptionText: string;
        license?: {
            name: string;
            URL: string;
        }[] | undefined;
        licenses?: {
            name: string;
            URL: string;
        }[] | undefined;
    }, {
        usageType: string | string[];
        exemptionText: string;
        license?: {
            name: string;
            URL: string;
        }[] | undefined;
        licenses?: {
            name: string;
            URL: string;
        }[] | undefined;
    }>, {
        usageType: string | string[];
        exemptionText: string;
        license?: {
            name: string;
            URL: string;
        }[] | undefined;
        licenses?: {
            name: string;
            URL: string;
        }[] | undefined;
    }, {
        usageType: string | string[];
        exemptionText: string;
        license?: {
            name: string;
            URL: string;
        }[] | undefined;
        licenses?: {
            name: string;
            URL: string;
        }[] | undefined;
    }>;
    organization: z.ZodString;
    repositoryURL: z.ZodString;
    repositoryHost: z.ZodString;
    repositoryVisibility: z.ZodString;
    homepageURL: z.ZodOptional<z.ZodString>;
    downloadURL: z.ZodOptional<z.ZodString>;
    disclaimerURL: z.ZodOptional<z.ZodString>;
    disclaimerText: z.ZodOptional<z.ZodString>;
    vcs: z.ZodString;
    laborHours: z.ZodNumber;
    reuseFrequency: z.ZodObject<{
        forks: z.ZodNumber;
        clones: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        forks: number;
        clones?: number | undefined;
    }, {
        forks: number;
        clones?: number | undefined;
    }>;
    platforms: z.ZodArray<z.ZodString, "many">;
    categories: z.ZodArray<z.ZodString, "many">;
    softwareType: z.ZodString;
    languages: z.ZodArray<z.ZodString, "many">;
    maintenance: z.ZodString;
    contractNumber: z.ZodArray<z.ZodString, "many">;
    SBOM: z.ZodString;
    relatedCode: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        URL: z.ZodString;
        isGovernmentRepo: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        name: string;
        URL: string;
        isGovernmentRepo: boolean;
    }, {
        name: string;
        URL: string;
        isGovernmentRepo: boolean;
    }>, "many">>;
    reusedCode: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        URL: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        URL: string;
    }, {
        name: string;
        URL: string;
    }>, "many">>;
    partners: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        name: string;
    }, {
        email: string;
        name: string;
    }>, "many">>;
    date: z.ZodObject<{
        created: z.ZodString;
        lastModified: z.ZodString;
        metaDataLastUpdated: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        created: string;
        lastModified: string;
        metaDataLastUpdated: string;
    }, {
        created: string;
        lastModified: string;
        metaDataLastUpdated: string;
    }>;
    tags: z.ZodArray<z.ZodString, "many">;
    contact: z.ZodObject<{
        email: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        name: string;
    }, {
        email: string;
        name: string;
    }>;
    feedbackMechanism: z.ZodString;
    AIUseCaseID: z.ZodString;
    localisation: z.ZodBoolean;
    repositoryType: z.ZodString;
    userInput: z.ZodBoolean;
    fismaLevel: z.ZodString;
    group: z.ZodString;
    projects: z.ZodArray<z.ZodString, "many">;
    systems: z.ZodArray<z.ZodString, "many">;
    subsetInHealthcare: z.ZodArray<z.ZodString, "many">;
    userType: z.ZodArray<z.ZodString, "many">;
    maturityModelTier: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    status: string;
    name: string;
    date: {
        created: string;
        lastModified: string;
        metaDataLastUpdated: string;
    };
    description: string;
    longDescription: string;
    permissions: {
        usageType: string | string[];
        exemptionText: string;
        license?: {
            name: string;
            URL: string;
        }[] | undefined;
        licenses?: {
            name: string;
            URL: string;
        }[] | undefined;
    };
    organization: string;
    repositoryURL: string;
    repositoryHost: string;
    repositoryVisibility: string;
    vcs: string;
    laborHours: number;
    reuseFrequency: {
        forks: number;
        clones?: number | undefined;
    };
    platforms: string[];
    categories: string[];
    softwareType: string;
    languages: string[];
    maintenance: string;
    contractNumber: string[];
    SBOM: string;
    tags: string[];
    contact: {
        email: string;
        name: string;
    };
    feedbackMechanism: string;
    AIUseCaseID: string;
    localisation: boolean;
    repositoryType: string;
    userInput: boolean;
    fismaLevel: string;
    group: string;
    projects: string[];
    systems: string[];
    subsetInHealthcare: string[];
    userType: string[];
    maturityModelTier: number;
    version?: string | undefined;
    homepageURL?: string | undefined;
    downloadURL?: string | undefined;
    disclaimerURL?: string | undefined;
    disclaimerText?: string | undefined;
    relatedCode?: {
        name: string;
        URL: string;
        isGovernmentRepo: boolean;
    }[] | undefined;
    reusedCode?: {
        name: string;
        URL: string;
    }[] | undefined;
    partners?: {
        email: string;
        name: string;
    }[] | undefined;
}, {
    status: string;
    name: string;
    date: {
        created: string;
        lastModified: string;
        metaDataLastUpdated: string;
    };
    description: string;
    longDescription: string;
    permissions: {
        usageType: string | string[];
        exemptionText: string;
        license?: {
            name: string;
            URL: string;
        }[] | undefined;
        licenses?: {
            name: string;
            URL: string;
        }[] | undefined;
    };
    organization: string;
    repositoryURL: string;
    repositoryHost: string;
    repositoryVisibility: string;
    vcs: string;
    laborHours: number;
    reuseFrequency: {
        forks: number;
        clones?: number | undefined;
    };
    platforms: string[];
    categories: string[];
    softwareType: string;
    languages: string[];
    maintenance: string;
    contractNumber: string[];
    SBOM: string;
    tags: string[];
    contact: {
        email: string;
        name: string;
    };
    feedbackMechanism: string;
    AIUseCaseID: string;
    localisation: boolean;
    repositoryType: string;
    userInput: boolean;
    fismaLevel: string;
    group: string;
    projects: string[];
    systems: string[];
    subsetInHealthcare: string[];
    userType: string[];
    maturityModelTier: number;
    version?: string | undefined;
    homepageURL?: string | undefined;
    downloadURL?: string | undefined;
    disclaimerURL?: string | undefined;
    disclaimerText?: string | undefined;
    relatedCode?: {
        name: string;
        URL: string;
        isGovernmentRepo: boolean;
    }[] | undefined;
    reusedCode?: {
        name: string;
        URL: string;
    }[] | undefined;
    partners?: {
        email: string;
        name: string;
    }[] | undefined;
}>;
/**
 * Validates code.json against the Zod schema
 * Returns array of user-friendly error messages (empty array if valid)
 */
export declare function validateCodeJSON(codeJSON: any): string[];
