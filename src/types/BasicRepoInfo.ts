import { Date } from "../zod-validation.js";

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
