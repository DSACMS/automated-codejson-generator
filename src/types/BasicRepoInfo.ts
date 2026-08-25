export interface BasicRepoInfo {
  title: string;
  description: string;
  url: string;
  repositoryVisibility: RepositoryVisibility;
  languages: string[];
  forks: number;
  tags: string[];
  date: RepoDates;
}

// metadataLastUpdated is stamped by codejson-core during assembly, not observed here
interface RepoDates {
  created: string;
  lastModified: string;
}

type RepositoryVisibility = "public" | "private" | undefined;
