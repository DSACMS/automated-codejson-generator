# Code.json Auto Generator

###### _⚠️ Please update your action to v1.2.1 if your workflow is failing due to Docker builds within the action ⚠️_

A GitHub Action that automatically generates and maintains code.json files for federal open source repositories, ensuring schema consistency and automating metadata calculations.

## About the Project

This project provides a GitHub Action that helps federal agencies maintain their code.json files, which are required for compliance with the Federal Source Code Policy. The action automatically calculates and updates various metadata fields including labor hours, programming languages used, repository information, and timestamps. It can either create pull requests or push directly to branches (with appropriate permissions), making it easier to keep code.json files accurate and up-to-date.

## How It Works

**Automatic Generation**

- The action calculates metadata and creates a PR or pushes directly
- Fields that cannot be observed are left blank and reported in the action log
- Optionally, a local AI model drafts descriptive fields from your README for you to review (see [AI-Drafted Fields](#ai-drafted-fields))
- Users can then fill in manual fields by editing the PR

**PR Validation**

- When users edit code.json in a PR, validation runs automatically on every commit
- The PR cannot be merged if validation fails (when branch protection is enabled)
- Error messages help users fix issues quickly
- Validation ensures only valid code.json reaches your main branch

**Important:** For direct push mode, users should always create PRs when manually editing code.json to ensure validation runs. Direct edits to the main branch will not be validated by this action.

## Workflow Examples

### Option 1: Direct Push

This approach tries to push directly to the branch using a Personal Access Token, but falls back to creating a pull request if the direct push fails. When users need to edit code.json, they should create a PR which will automatically validate their changes. Refer to this [section](https://github.com/DSACMS/automated-codejson-generator?tab=readme-ov-file#setting-up-personal-access-token-pat) for a guide to create the necessary Personal Access Token.

#### Direct Push Mode Limitations

**Important:** Direct push mode (`SKIP_PR: "true"`) will fall back to creating a pull request if:

- Branch protection rules are enabled on the target branch
- The PAT doesn't have sufficient permissions
- Any other push restriction exists

This is expected behavior. If you need all updates to go through pull requests, use `SKIP_PR: "false"`.

##### When Direct Push Works

- No branch protection on target branch
- PAT has write access
- No other repository restrictions

##### When It Falls Back to PR

- Any branch protection enabled
- Any push restrictions

**Recommendation:** For repositories with branch protection, use `SKIP_PR: "false"` to always create pull requests.

```yaml
name: Update Code.json
on:
  schedule:
    - cron: 0 0 1 * * # First day of every month
  workflow_dispatch:
  pull_request:
    types: [opened, synchronize]
    paths:
      - "code.json"

permissions:
  contents: write
  pull-requests: write
  issues: write

jobs:
  update-code-json:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Update code.json
        id: update
        uses: DSACMS/automated-codejson-generator@v1.3.0
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          ADMIN_TOKEN: ${{ secrets.ADMIN_PAT }} # PAT with admin/push permissions
          BRANCH: "main"
          SKIP_PR: "true"

      - name: Report update method
        run: |
          echo "Update successful: ${{ steps.update.outputs.updated }}"
          if [ "${{ steps.update.outputs.method_used }}" = "direct_push" ]; then
            echo "Direct push successful! Commit SHA: ${{ steps.update.outputs.commit_sha }}"
          elif [ "${{ steps.update.outputs.method_used }}" = "pull_request" ]; then
            echo "Created pull request: ${{ steps.update.outputs.pr_url }}"
          fi
```

### Option 2: Pull Request Only

This approach always creates a pull request for both automatic generation and validation of manual edits, ensuring code review for all changes.

```yaml
name: Update Code.json
on:
  schedule:
    - cron: 0 0 1 * * # First day of every month
  workflow_dispatch:
  pull_request:
    types: [opened, synchronize]
    paths:
      - "code.json"

permissions:
  contents: write
  pull-requests: write
  issues: write

jobs:
  update-code-json:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Update code.json
        uses: DSACMS/automated-codejson-generator@v1.3.0
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          BRANCH: "main"
          SKIP_PR: "false"
```

### Inputs

```yaml
GITHUB_TOKEN:
  description: "GitHub token used for API access and PR creation"
  required: true
  default: ${{ github.token }}

BRANCH:
  description: "Name of the branch to update"
  required: false

SKIP_PR:
  description: "Try to push directly to branch first, fallback to PR if it fails. Requires ADMIN_TOKEN."
  required: false
  default: "false"

ADMIN_TOKEN:
  description: "Personal Access Token with admin/write privileges for direct push. Required when SKIP_PR is true."
  required: false

ARCHIVE:
  description: "Option to set this tool to archive mode which prepares a repository for archival."
  required: false
  default: "false"

ENABLE_AI:
  description: "Use a local AI model to draft missing fields from the README. Generated fields always go through a pull request."
  required: false
  default: "false"
```

### Outputs

```yaml
updated:
  description: "Boolean indicating whether code.json was updated"

pr_url:
  description: "URL of the created pull request if changes were made via PR"

commit_sha:
  description: "SHA of the commit if pushed directly to branch"

method_used:
  description: "Method used for the update: 'direct_push' or 'pull_request'"
```

## AI-Drafted Fields

Some code.json fields describe what a project is rather than anything the action can measure. Setting `ENABLE_AI: "true"` lets the action draft these from your README using a small language model bundled inside the action's container:

- `longDescription`
- `tags` (added to your repository topics and existing tags, never replacing them)
- `categories`, chosen from the [publiccode.yml category list](https://publiccodeyml.github.io/v0/categories-list.html)
- `platforms`
- `softwareType`
- `repositoryType`

```yaml
- name: Update code.json
  uses: DSACMS/automated-codejson-generator@v1.3.0
  with:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    BRANCH: "main"
    ENABLE_AI: "true"
```

**Only missing fields are drafted.** A field you have already filled in is never touched. `longDescription` counts as missing when it is shorter than 150 characters, and `tags` when there are fewer than five.

**Everything drafted goes through review.** When the model fills in any field, the action opens a pull request even if `SKIP_PR` is `"true"`, and the PR description lists exactly which fields were drafted so a reviewer knows what to check.

**Nothing leaves the runner.** The model ([Gemma 4 E2B](https://huggingface.co/unsloth/gemma-4-E2B-it-GGUF), pinned by revision and checksum in the `dockerfile`) runs on the CPU inside the action's container. No API keys are needed and your code is not sent to any external AI service.

**Output is screened.** The model reads repository content, so its output is treated as untrusted. A drafted `longDescription` is discarded if it contains links, markup, or long unbroken strings, and tags must be short plain words or phrases. Anything resembling the workflow's tokens is dropped. Categories, platforms, and types are restricted to values the schema allows.

**It never blocks a run.** If the model is unavailable, times out (15 minutes), or produces nothing usable, the action logs a warning and continues with the fields left blank.

## Archive Mode

Setting `ARCHIVE: "true"` prepares a repository for archival: `status` is set to `Archival`, an `archived` tag is added, and the pull request is titled and labeled for archival. Run it once before archiving the repository.

## Setting Up Personal Access Token (PAT)

To use the direct push functionality, you'll need to create a Personal Access Token:

### Creating a PAT

1. **Go to GitHub Settings**: Navigate to your GitHub account settings
2. **Developer Settings**: Click on "Developer settings" in the left sidebar
3. **Personal Access Tokens**: Choose "Tokens (classic)"
4. **Generate New Token**: Click "Generate new token"
5. **Configure Token**:
   - **Name**: Give it a name like "code.json Generator"
   - **Expiration**: Set appropriate expiration (recommend 90 days or 1 year)
   - **Scopes**:
     - For classic tokens: Select `repo` (full repository access)
     - For fine-grained tokens: Select `Contents` (write) and `Metadata` (read)
6. **Copy the generated token**: Copy the token and keep it handy for the next section

### Adding PAT to Repository

1. **Repository Settings**: Go to your repository's Settings tab
2. **Secrets and Variables**: Click on "Secrets and variables" → "Actions"
3. **New Secret**: Click "New repository secret"
4. **Configure Secret**:
   - **Name**: `ADMIN_PAT`
   - **Value**: Paste your Personal Access Token that you copied from the previous section
5. **Save**: Click "Add secret"

⚠️ _Please make sure the following are enabled within your Repository Action Settings in order to work properly_ ⚠️
<img width="789" height="361" alt="Screenshot 2025-08-05 at 1 44 36 PM" src="https://github.com/user-attachments/assets/3795dc0e-c4c4-4378-8eb2-b7b9d861c08a" />

## Generation Context

The automated code.json generator calculates specific fields by analyzing your repository and using GitHub's API. Here's what gets generated and what your repository needs for successful generation.

Fields the generator can't determine are left blank and listed in the action log. Unless noted otherwise, a value you have already set in code.json is kept.

**name**: Your repository's name as configured in GitHub. No configuration needed.

**description**: Your repository's description from GitHub. _Add a description to your repository through GitHub's interface for this field to populate._

**version**: The tag of your latest GitHub release, with any leading `v` removed. Falls back to the release name if the tag is not a usable version.

**repositoryURL**: Your repository's GitHub URL. No configuration needed.

**repositoryVisibility**: Whether your repository is public or private. No configuration needed.

**repositoryHost**: Read from the repository URL for repositories hosted on `github.cms.gov` or in the CMSgov, CMS-Enterprise, Enterprise-CMCS, DSACMS, or MeasureAuthoringTool GitHub organizations. Left blank otherwise.

**laborHours**: The generator runs SCC against your workspace to analyze your codebase and estimate development time. No configuration needed.

**languages**: The programming languages GitHub detects in your repository. Once set, your list is kept as is.

**tags**: Your repository's GitHub topics, merged with any tags already in code.json.

**permissions**: `usageType` is set to `openSource` for public repositories and left blank for private ones. `licenses` defaults to `CC0-1.0`; update it if your repository uses a different license.

**maturityModelTier**: Estimated from the community files in your repository:

| Tier | Requires |
| --- | --- |
| 4 | `GOVERNANCE.md` |
| 3 | `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`, public repository |
| 2 | `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`, private repository |
| 1 | `SECURITY.md` |
| 0 | None of the above |

Files may live at the repository root or under `.github/`. A tier you have already set is kept.

**reuseFrequency**: `forks` is your repository's fork count. No configuration needed.

**SBOM**: The repository's SBOM URL in the format of {repositoryURL}/network/dependencies. No configuration needed.

**date**: `created` and `lastModified` come from GitHub; `metadataLastUpdated` is set each time the action runs. No configuration needed.

**feedbackMechanism**: The repository's issues URL in the format of {repositoryURL}/issues. No configuration needed.

**reusedCode**: If your repository is a fork, its upstream repository is listed here. The generator also scans your `package.json` and `requirements.txt` for dependencies published by federal agencies and lists them, each linked to the agency repository it comes from. It matches against a curated list of federal packages (see below). Entries already in your code.json are preserved. No configuration needed.

**longDescription, categories, platforms, softwareType, repositoryType**: Left blank for you to fill in, or drafted from your README when `ENABLE_AI` is on (see [AI-Drafted Fields](#ai-drafted-fields)).

## Schema and Validation

The code.json schema, its validation rules, and the logic that merges newly observed metadata into an existing file all live in [codejson-core](https://github.com/DSACMS/codejson-core), a standalone library shared by every tool that produces or validates code.json. This action binds to its CMS variant (`cmsProfile`) and owns only the parts core deliberately leaves out: reading your repository through GitHub's API, running SCC, scanning dependency manifests, and opening the pull request.

The schema is version-pinned by the `codejson-core` release, so schema updates reach this action as a dependency bump rather than a code change. Dependabot opens those automatically.

## Federal Dependency List

The `reusedCode` field is matched against a curated list of federal npm and PyPI packages in `src/gov-dependencies.data.ts`, each mapped to the agency and repository it comes from.

That list is kept current by an automated job under `src/gov-update/`. It crawls federal GitHub and npm organizations and verifies every package before adding it: the package's registry metadata must point at a repository in a known federal organization, and that repository must itself declare the package. Each addition goes through a pull request for a maintainer to review.

### Running the job

The job runs every Monday through [`update-gov-dependencies.yml`](.github/workflows/update-gov-dependencies.yml), and can also be started by hand from the Actions tab with **Run workflow**. When it finds something new it opens a pull request against `src/gov-dependencies.data.ts` with the verification report as the description. If nothing new turns up, it opens nothing.

To run it locally:

```bash
npm install
npm run update-gov-dependencies
```

That rewrites `src/gov-dependencies.data.ts` in place, so check `git diff` afterwards. Three optional environment variables:

| Variable | Purpose |
| --- | --- |
| `GITHUB_TOKEN` | Raises the GitHub API rate limit from 60 to 5,000 requests an hour. A full run needs it. |
| `GOV_UPDATE_CACHE` | Path to a cache file. Repos that have not been pushed to since the last run are skipped, which is the difference between a long run and a short one. |
| `GOV_UPDATE_REPORT` | Path to write the markdown report of what was added and what was flagged. |

```bash
GITHUB_TOKEN=<your token> \
GOV_UPDATE_CACHE=.gov-update-cache/repos.json \
GOV_UPDATE_REPORT=gov-update-report.md \
npm run update-gov-dependencies
```

The first run has nothing cached and visits every repository in every allowlisted organization, so expect it to take a while. Later runs reuse the cache and are much quicker.

The organizations it trusts live in `src/gov-update/allowlist.json`, mapping each GitHub organization name to its agency. Most are confirmed federal against CISA's official `.gov` domain registry ([cisagov/dotgov-data](https://github.com/cisagov/dotgov-data)). The registry only covers `.gov`, so military organizations and a handful of others are manually verified instead.

To add an organization, add its GitHub organization name and agency name to `allowlist.json` and open a pull request. New organizations should always be reviewed, never added automatically. GitHub does not verify organization ownership, so this stays human-vetted rather than cryptographic proof.

## Project Vision

To streamline federal agencies' compliance with open source requirements by automating the maintenance of code.json files, reducing manual effort and improving accuracy of repository metadata.

## Project Mission

To provide a reliable, automated solution for generating and updating code.json files in federal repositories while ensuring compliance with schema requirements and reducing the burden on development teams.

## Agency Mission

This project supports the broader federal initiative of open source software development and transparency in government, aligning with the Federal Source Code Policy (M-16-21) which requires agencies to improve their code sharing practices.

## Team Mission

Our team is committed to building tools that make open source compliance easier for federal development teams, focusing on automation and accuracy to reduce manual overhead.

## Core Team

An up-to-date list of core team members can be found in [MAINTAINERS.md](MAINTAINERS.md). At this time, the project is still building the core team and defining roles and responsibilities. We are eagerly seeking individuals who would like to join the community and help us define and fill these roles.

## Documentation Index

- [CONTRIBUTING.md](CONTRIBUTING.md) - Guidelines for contributing to the project
- [SECURITY.md](SECURITY.md) - Security and vulnerability disclosure policies
- [LICENSE](LICENSE) - CC0 1.0 Universal public domain dedication
- [MAINTAINERS.md](MAINTAINERS.md) - List of project maintainers
- [COMMUNITY.md](COMMUNITY.md) - Project community and maintainers
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) - Expectations for community participation

## Repository Structure

```
.
├── src/
│   ├── index.ts             # Action entrypoint
│   ├── main.ts              # Main action logic
│   ├── codejson.ts          # codejson-core bindings: schema, validation, assembly
│   ├── helper.ts            # GitHub API, SCC, manifest reads, PR and push
│   ├── create-deps.ts       # Wires the production dependencies
│   ├── enrich.ts            # Drafts missing fields with the model and screens its output
│   ├── enrich.data.ts       # Allowed values for AI-drafted fields
│   ├── llm.ts               # Loads and runs the local model
│   ├── gov-dependencies.ts  # Lookup table of government-made dependencies
│   ├── gov-update/          # Job that keeps the federal dependency list current
│   └── types/               # Shared interfaces
├── .github/
│   └── workflows/           # GitHub Actions workflow definitions
├── dockerfile               # Action image: SCC and the pinned model
└── action.yml               # Action metadata file
```

## Development and Software Delivery Lifecycle

This project follows GitHub Actions development practices. For information on contributing, see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Local Development

To develop locally:

1. Clone the repository
2. Install dependencies with `npm install`
3. Install Go and SCC tool: `go install github.com/boyter/scc/v3@latest`
4. Build the project with `npm run bundle`
5. Run tests with `npm test`

The tests replace the model with a fake, so you don't need it to develop or test. To try AI drafting against a real model, download a GGUF file and point `ACG_MODEL_PATH` at it.

## Coding Style and Linters

This project uses TypeScript and follows standard TypeScript conventions. Lint and code tests are run on each commit, so linters and tests should be run locally before committing.

## Branching Model

Feature branches are opened against `dev`. When `dev` is ready to ship, it is merged into `main` with a `release:patch`, `release:minor`, or `release:major` label, which tags and publishes the release automatically. See [CONTRIBUTING.md](CONTRIBUTING.md#workflow-and-branching) for the full steps.

## Contributing

Thank you for considering contributing to an Open Source project of the US Government! For more information about our contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Community

The Code.json Auto Generator team is taking a community-first and open source approach to the product development of this tool. We believe government software should be made in the open and be built and licensed such that anyone can download the code, run it themselves without paying money to third parties or using proprietary software, and use it as they will.

## Feedback

If you have ideas for improvements or encounter any issues, please open an issue on our GitHub repository.

## Policies

### Open Source Policy

We adhere to the [CMS Open Source Policy](https://github.com/CMSGov/cms-open-source-policy). If you have any questions, just [shoot us an email](mailto:opensource@cms.hhs.gov).

### Security and Responsible Disclosure Policy

For more information about our Security, Vulnerability, and Responsible Disclosure Policies, see [SECURITY.md](SECURITY.md).

## Public Domain

This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/) as indicated in [LICENSE](LICENSE).

All contributions to this project will be released under the CC0 dedication. By submitting a pull request or issue, you are agreeing to comply with this waiver of copyright interest.
