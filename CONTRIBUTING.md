# Contributing Guidelines

We're so thankful you're considering contributing to an [open source project of the U.S. government](https://code.gov/)! If you're unsure about anything, just ask -- or submit the issue or pull request anyway. The worst that can happen is you'll be politely asked to change something. We appreciate all friendly contributions.

We encourage you to read this project's CONTRIBUTING policy (you are here), its [LICENSE](LICENSE.md), and its [README](README.md).

## Getting Started

Look for issues labeled `good-first-issue` for good opportunities to contribute. These issues are specifically chosen to help newcomers get involved with the project.

### Team Specific Guidelines

Our project maintainers are listed in [COMMUNITY.md](COMMUNITY.md). They are responsible for reviewing and merging all pull requests. Feel free to tag them in issues or pull requests for assistance.

### Building Dependencies

To work on this project, you'll need:

1. Node.js 20 or later
2. Go 1.22 or later
3. SCC tool (installed via `go install github.com/boyter/scc/v3@latest`)
4. GitHub CLI (optional, but helpful for testing)

### Building the Project

```bash
# Clone the repository
git clone https://github.com/DSACMS/automated-codejson-generator.git
cd automated-codejson-generator

# Install dependencies
npm install

# Build the project
npm run bundle

# Run tests
npm test
```

## Schema and Validation

The code.json schema, its validation rules, and the logic that merges freshly observed metadata into an existing file are owned by [codejson-core](https://github.com/DSACMS/codejson-core). This repository binds to that library's CMS profile in a single module, `src/codejson.ts`, and owns nothing else about the schema.

That means there is no schema to regenerate here. When `gov-codejson` publishes a new schema version, `codejson-core` cuts a release and Dependabot opens the bump.

`src/codejson.ts` exposes three things to the rest of the action:

- `assembleDraft` — merges observed metadata over the existing file. It runs against a permissive schema so it never rejects an incomplete file (see below).
- `validateCodeJSON` — strict validation against the full CMS schema. An empty array means valid.
- `draftBaseline` — the skeleton written for a repository that has no code.json yet.

Validation runs in two scenarios:

### 1. After Generation

Every time the action generates or updates code.json (via schedule or workflow_dispatch), it validates the result and logs anything still missing as a warning. It **does not** fail the run: a newly generated file is a draft, with unobservable fields such as `status` and `longDescription` left blank on purpose for a human to complete from the pull request diff. Failing here would mean no repository could ever be bootstrapped.

### 2. On PR Edits

When the `pull_request` trigger is configured, the action validates code.json whenever it's edited in a PR and **fails the check** if it is invalid. This is the gate that keeps invalid files off your main branch.

### Workflow and Branching

We follow a **GitHub Flow–inspired workflow** with a protected `main` branch and a `dev` integration branch.

1. Fork the project
2. Check out the `dev` branch
3. Create a feature branch from `dev`
4. Write code and tests for your change
5. Open a pull request from your feature branch **into `dev`**
6. Work with repo maintainers to get your change reviewed and merged into `dev`
7. When `dev` is ready for release, open a pull request from **`dev` into `main`**
8. Add **exactly one** release label to the PR:
   - `release:patch`
   - `release:minor`
   - `release:major`
9. Once the required checks pass, merge the PR into `main`
   - This triggers automatic versioning, tagging, and GitHub Release creation
10. Delete your feature branch after merge


### Testing Conventions

- Tests are written using Jest and can be found in the `__tests__` directory
- Run tests with `npm test`
- All new features should include corresponding test coverage
- Test files should follow the naming convention: `*.test.ts`

### Coding Style and Linters

1. This project uses TypeScript and follows standard TypeScript conventions
2. We follow the [Prettier](https://prettier.io/) code formatting rules
3. ESLint is used for code linting
4. All code must pass typechecking and linting before being merged
5. Run `npm run lint` to check your code

### Writing Issues

When creating an issue please try to adhere to the following format:

```markdown
### Description

Clear description of the issue or feature request

### Expected behavior

What should happen

### Actual behavior

What is happening (for bugs)

### Steps to reproduce

1. Step one
2. Step two
3. Step three

### Additional context

Any other relevant information
```

### Writing Pull Requests

1. Pull requests should be focused on a single change
2. Include tests for any new functionality
3. Update documentation as needed
4. Follow our commit message format:

```
feat(scope): description of feature

- Additional details about the change
- Any breaking changes
- Any migration steps required
```

### Reviewing Pull Requests

Pull requests are reviewed by the maintainers listed in [COMMUNITY.md](COMMUNITY.md). Reviews will check for:

- Code quality and style
- Test coverage
- Documentation updates
- Breaking changes
- Security implications

## Shipping Releases

Releases are created by maintainers as needed when significant changes are merged. We use semantic versioning for releases.

## Documentation

Documentation improvements are always welcome! Please file an issue first to discuss any major changes. Key areas for documentation:

- README.md updates
- Code comments
- Example workflows
- TypeScript type definitions

## Policies

### Open Source Policy

We adhere to the [CMS Open Source Policy](https://github.com/CMSGov/cms-open-source-policy). If you have any questions, just [shoot us an email](mailto:opensource@cms.hhs.gov).

### Security and Responsible Disclosure Policy

_Submit a vulnerability:_ Vulnerability reports can be submitted through [Bugcrowd](https://bugcrowd.com/cms-vdp). Reports may be submitted anonymously. If you share contact information, we will acknowledge receipt of your report within 3 business days.

For more information about our Security, Vulnerability, and Responsible Disclosure Policies, see [SECURITY.md](SECURITY.md).

## Public Domain

This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/) as indicated in [LICENSE](LICENSE).

All contributions to this project will be released under the CC0 dedication. By submitting a pull request or issue, you are agreeing to comply with this waiver of copyright interest.
