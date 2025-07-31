export interface CodeJSON {
    name: string;
    description: string;
    longDescription: string;
    status: string;
    permissions: Permissions;
    organization: string;
    repositoryURL: string;
    projectURL: string;
    repositoryHost: string;
    repositoryVisibility: string;
    vcs: string;
    laborHours: number;
    reuseFrequency: ReuseFrequency;
    platforms: string[];
    categories: string[];
    softwareType: string;
    languages: string[];
    maintenance: string;
    contractNumber: string;
    date: Date;
    tags: string[];
    contact: Contact;
    feedbackMechanisms: string[];
    localisation: boolean;
    repositoryType: string;
    userInput: boolean;
    fismaLevel: string;
    group: string;
    projects: string[];
    systems: string[];
    upstream: string;
    subsetInHealthcare: string[];
    userType: string[];
    maturityModelTier: number;
}
export interface ReuseFrequency {
    forks: number;
    clones: number;
}
export interface Permissions {
    license: License[];
    usageType: string;
    exemptionText: string;
}
export interface License {
    name: string;
    URL: string;
}
export interface Date {
    created: string;
    lastModified: string;
    metaDataLastUpdated: string;
}
export interface Contact {
    email: string;
    name: string;
}
export interface BasicRepoInfo {
    title: string;
    description: string;
    url: string;
    repositoryVisibility: string;
    languages: string[];
    forks: number;
    tags: string[];
    date: Date;
}
