export interface CodeJSON {
  name: string; // calculated
  description: string; // calculated
  longDescription: string;
  status: string;
  permissions: Permissions;
  organization: string;
  repositoryURL: string; // calculated
  projectURL: string;
  repositoryHost: string;
  repositoryVisibility: string; // calculated
  vcs: string;
  laborHours: number; // calculated
  reuseFrequency: ReuseFrequency; // semi-calculated
  platforms: string[];
  categories: string[];
  softwareType: string;
  languages: string[]; // calculated
  maintenance: string;
  contractNumber: string;
  date: Date; // calculated
  tags: string[]; // calculated
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
