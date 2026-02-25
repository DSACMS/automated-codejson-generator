import * as core from "@actions/core";
import * as fs from "fs/promises";
import { Octokit as ActionKit } from "@octokit/action";
import { createPullRequest } from "octokit-plugin-create-pull-request";
import { exec } from "child_process";
import { promisify } from "util";
import { Dependencies } from "./types/Dependencies.js";

const execAsync = promisify(exec);

// builds the production level Dependencies object from the GitHub Actions environment
export function createProductionDeps(): Dependencies {
  const githubToken = core.getInput("GITHUB_TOKEN", { required: true });
  const adminToken = core.getInput("ADMIN_TOKEN", { required: false });

  const MyOctoKit = ActionKit.plugin(createPullRequest);

  const octokit = new MyOctoKit({
    auth: githubToken,
    log: {
      debug: core.debug,
      info: core.info,
      warn: core.warning,
      error: core.error,
    },
  });

  const adminOctokit = adminToken
    ? new MyOctoKit({
        auth: adminToken,
        log: {
          debug: core.debug,
          info: core.info,
          warn: core.warning,
          error: core.error,
        },
      })
    : null;

  return {
    owner: process.env.GITHUB_REPOSITORY_OWNER ?? "",
    repo: process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "",

    githubToken,
    adminToken,
    branch: core.getInput("BRANCH", { required: false }),
    skipPR: core.getInput("SKIP_PR", { required: false }) === "true",
    isArchived: core.getInput("ARCHIVE", { required: false }) === "true",

    octokit: octokit as unknown as Dependencies["octokit"],
    adminOctokit: adminOctokit as unknown as Dependencies["adminOctokit"],

    exec: execAsync,
    readFile: (filepath: string) => fs.readFile(filepath, "utf8"),

    log: {
      info: core.info,
      error: core.error,
      warning: core.warning,
      debug: core.debug,
    },

    setOutput: core.setOutput,
    setFailed: core.setFailed,
  };
}