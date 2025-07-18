# Code.json Auto Generator

A GitHub Action that automatically generates and maintains code.json files for federal open source repositories, ensuring schema consistency and automating metadata calculations.

## About the Project

This project provides a GitHub Action that helps federal agencies maintain their code.json files, which are required for compliance with the Federal Source Code Policy. The action automatically calculates and updates various metadata fields including labor hours, programming languages used, repository information, and timestamps. It creates pull requests with these updates, making it easier to keep code.json files accurate and up-to-date.

## Inputs

```yaml
GITHUB_TOKEN:
  description: "GitHub token used for API access"
  required: true
  default: ${{ github.token }}
```

## Outputs

```yaml
updated:
  description: "Boolean indicating whether code.json was updated"
pr_url:
  description: "URL of the created pull request if changes were made"
```

## Workflow Examples

### Create a PR to add compliant code.json

```yaml
name: Update Code.json
on:
  schedule: 
    - cron: 0 0 1 * * # First day of every month
  workflow_dispatch:

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
        uses: DSACMS/automated-codejson-generator@v1.0.0
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          BRANCH: "main"
```

## Generation Context
The automated code.json generator calculates specific fields by analyzing your repository and using GitHub's API. Here's what gets generated and what your repository needs for successful generation.

**name**: This field pulls directly from your repository's name as configured in GitHub. No configuration needed.

**description**: The generator extracts this from your repository's description field in GitHub settings. *Make sure you've added a description to your repository through GitHub's interface for this field to populate properly.*

**repositoryURL**: This automatically uses your repository's public GitHub URL. No configuration needed.

**repositoryVisibility**: The generator determines whether your repository is private or public. No configuration needed.

**laborHours**: The generator runs SCC against your workspace to analyze your codebase and estimate development time. No configuration needed.

**languages**: This field populates the programming languages in your repository. No configuration needed.

**dateCreated**: The generator pulls your repository's creation date. No configuration needed.

**dateLastModified**: This uses your repository's last update timestamp, reflecting the most recent changes. No configuration needed.

**dateMetaDataLastUpdated**: The generator sets this to the current timestamp each time it runs, providing a record of when the metadata was last refreshed. No configuration needed.

**feedbackMechanisms**: A list of containing your repository's issues URL in the format of {repositoryURL}/issues. If you already have a code.json file with existing feedback mechanisms, the generator preserves those values. No configuration needed.

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
- [COMMUNITY_GUIDELINES.md](COMMUNITY_GUIDELINES.md) - Guidelines for community participation
- [GOVERNANCE.md](GOVERNANCE.md) - Project governance information
- [GLOSSARY.md](GLOSSARY.md) - Terminology and acronyms

## Repository Structure

```
.
├── src/
│   ├── model.ts          # TypeScript interfaces for code.json schema
│   ├── main.ts           # Main action logic
│   ├── helper.ts         # Helper functions for GitHub API interactions
│   └── index.ts          # Action entrypoint
├── .github/
│   └── workflows/        # GitHub Actions workflow definitions
└── action.yml            # Action metadata file
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

## Coding Style and Linters

This project uses TypeScript and follows standard TypeScript conventions. Lint and code tests are run on each commit, so linters and tests should be run locally before committing.

## Branching Model

This project follows trunk-based development:

- Make small changes in short-lived feature branches and merge to `main` frequently
- Each change merged to `main` should be immediately deployable
- Pull requests are required for all changes
- Changes are deployed automatically via GitHub Actions

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
