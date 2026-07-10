export interface BasicRepoInfo {
  title: string;
  description: string;
  url: string;
  repositoryVisibility: RepositoryVisibility;
  languages: string[];
  forks: number;
  tags: string[];
  date: Date;
}

interface Date {
  created: string;
  lastModified: string;
  metadataLastUpdated: string;
}

type RepositoryVisibility = "public" | "private" | undefined;
