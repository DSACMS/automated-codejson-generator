# Contributing Guidelines

We're so thankful you're considering contributing to an [open source project of the U.S. government](https://code.gov/)! If you're unsure about anything, just ask -- or submit the issue or pull request anyway. The worst that can happen is you'll be politely asked to change something. We appreciate all friendly contributions.

We encourage you to read this project's CONTRIBUTING policy (you are here), its [LICENSE](LICENSE.md), and its [README](README.md).

## Getting Started

Look for issues labeled `good-first-issue` for good opportunities to contribute. These issues are specifically chosen to help newcomers get involved with the project.

### Team Specific Guidelines

Our project maintainers are listed in [MAINTAINERS.md](MAINTAINERS.md). They are responsible for reviewing and merging all pull requests. Feel free to tag them in issues or pull requests for assistance.

### Building Dependencies

To work on this project, you'll need:

1. Node.js 20 or later
2. Go 1.22 or later
3. SCC tool (installed via `go install github.com/boyter/scc/v3@latest`)
4. GitHub CLI (optional, but helpful for testing)

### Building the Project

```bash
# Clone the repository
git clone https://github.com/DSACMS/code-json-generator.git
cd code-json-generator

# Install dependencies
npm install

# Build the project
npm run package

# Run tests
npm test
```

## Validation

The action uses [Zod](https://zod.dev/) for schema validation, automatically validating code.json in two scenarios:

### 1. Before Generation
Every time the action generates or updates code.json (via schedule or workflow_dispatch), it validates the output before creating a PR or pushing. If validation fails, no changes are made.

### 2. On PR Edits
When the `pull_request` trigger is configured, the action validates code.json whenever it's edited in a PR. This ensures users cannot accidentally merge invalid JSON.

### Workflow and Branching

We follow the [GitHub Flow Workflow](https://guides.github.com/introduction/flow/):

1. Fork the project
2. Check out the `main` branch
3. Create a feature branch
4. Write code and tests for your change
5. From your branch, make a pull request against `DSACMS/code-json-generator/main`
6. Work with repo maintainers to get your change reviewed
7. Wait for your change to be pulled into `DSACMS/code-json-generator/main`
8. Delete your feature branch

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

Pull requests are reviewed by the maintainers listed in [MAINTAINERS.md](MAINTAINERS.md). Reviews will check for:

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
