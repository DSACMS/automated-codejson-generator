# Contributing Guidelines

We're so thankful you're considering contributing to an [open source project of the U.S. government](https://code.gov/)! If you're unsure about anything, just ask -- or submit the issue or pull request anyway. The worst that can happen is you'll be politely asked to change something. We appreciate all friendly contributions.

We encourage you to read this project's CONTRIBUTING policy (you are here), its [LICENSE](LICENSE), and its [README](README.md).

## Getting Started

Look for issues labeled `good-first-issue` for good opportunities to contribute. These issues are specifically chosen to help newcomers get involved with the project.

### Team Specific Guidelines

Our project maintainers are listed in [COMMUNITY.md](COMMUNITY.md). They are responsible for reviewing and merging all pull requests. Feel free to tag them in issues or pull requests for assistance.

### Building Dependencies

To work on this project, you'll need:

1. Node.js 20 (see `.node-version`)
2. [SCC](https://github.com/boyter/scc), from its [releases](https://github.com/boyter/scc/releases) or `brew install scc`
3. Docker, to build the action image or rebuild the base image (see below)
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

### Rebuilding the Base Image

The action's image comes in two parts. `Dockerfile.base` holds the heavy, slow-changing pieces: `node-llama-cpp`, the model and `scc`. It is pushed to GHCR by hand as `ghcr.io/dsacms/automated-codejson-generator-base`. `Dockerfile` builds the action code on top of it on every run, so a release tag always ships the code it points at.

Rebuild the base when any of these change:

- the `node-llama-cpp` version in `package-lock.json` (the `Dockerfile` build fails until the base matches)
- the model (`MODEL_*` args)
- the `scc` version
- the Node major version

Steps, from the repo root:

1. Update `Dockerfile.base` (for a `node-llama-cpp` bump, set `NODE_LLAMA_CPP_VERSION` to the version `package-lock.json` resolves) and pick the next base version.

2. Log in with a token that can write packages:

   ```bash
   gh auth refresh -h github.com -s write:packages
   gh auth token | docker login ghcr.io -u <your-github-username> --password-stdin
   ```

3. Build and push for `linux/amd64`. The action runs on amd64 runners, and building on Apple Silicon without `--platform` produces an arm64 image that fails there.

   ```bash
   docker buildx build --platform linux/amd64 -f Dockerfile.base \
     -t ghcr.io/dsacms/automated-codejson-generator-base:<version> --push .
   ```

4. Get the digest (the top-level `Digest: sha256:…` line):

   ```bash
   docker buildx imagetools inspect ghcr.io/dsacms/automated-codejson-generator-base:<version>
   ```

5. Make sure the package is public: in the DSACMS org's Packages, open `automated-codejson-generator-base`, then Package settings → Change visibility → Public. A new package starts private, and every consumer's run fails to pull a private base.

6. Pin it in `Dockerfile` as `BASE_IMAGE=ghcr.io/dsacms/automated-codejson-generator-base:<version>@sha256:<digest>` and open a PR. Pinning by digest means a new base always shows up as a reviewed diff instead of silently reaching consumers.

To test a base locally before pushing, build it with `--load -t acg-base:local` and pass `--build-arg BASE_IMAGE=acg-base:local` when building `Dockerfile`.

## Schema and Validation

The code.json schema, its validation rules, and the logic that merges freshly observed metadata into an existing file are owned by [codejson-core](https://github.com/DSACMS/codejson-core). This repository binds to that library in a single module, `src/codejson.ts`, and owns nothing else about the schema.

That means there is no schema to regenerate here. When `gov-codejson` publishes a new schema version, `codejson-core` cuts a release and Dependabot opens the bump.

`src/codejson.ts` resolves the `AGENCY` input to one of core's profiles (`cms` or `neutral`). The action uses three things from that profile:

- `draft`: merges observed metadata into the existing file, starting from the profile's baseline when there is no code.json yet. It never rejects an incomplete file (see below).
- `validate`: strict validation against the profile's schema. An empty array means valid.
- `droppedFields`: fields in the existing file that the profile doesn't define, which the next run removes.

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
7. Delete your feature branch after merge

Maintainers release `dev` by merging it into `main` (see [Shipping Releases](#shipping-releases)).

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

`dev` is the default branch, and `main` holds the latest release. Many consumers pin the action to `@main` instead of a version tag, so merging into `main` ships to them right away. Consumers pinned to an older major tag, such as `@v1`, stay where they are.

Releases follow semantic versioning:

1. If the release changes `node-llama-cpp`, the model, `scc` or the Node major version, rebuild the base image first (see [Rebuilding the Base Image](#rebuilding-the-base-image))
2. Open a pull request from **`dev` into `main`**. In the description, list each change since the last release as a one-line summary with its PR number
3. Add **exactly one** release label. The `require-release-label` check fails without one
   - `release:patch`
   - `release:minor`
   - `release:major`
   - `release:none` (merge without cutting a release)
4. If the PR shows conflicts, see [When the `dev` → `main` PR has conflicts](#when-the-dev--main-pr-has-conflicts)
5. Once the required checks pass and the PR is approved, merge it with **Create a merge commit**. Don't squash it, so `main` stays in `dev`'s history

Merging runs `release.yml`, which bumps the latest `vX.Y.Z` tag by the label, pushes the new tag, moves the major tag (such as `v2`) to the merge commit, and publishes a GitHub Release with generated notes. To check the result:

```sh
git fetch --tags -f origin
git rev-parse origin/main v2 v2.0.0   # all three should match
```

### When the `dev` → `main` PR has conflicts

This happens when `main` has a commit that `dev`'s history doesn't, usually from a squash merge into `main`. If `dev` already contains that content, record `main` in `dev`'s history without changing any files:

```sh
git switch -c sync-main-into-dev origin/dev
git merge -s ours origin/main
git diff origin/dev   # must print nothing
```

Open a PR into `dev` and merge it with **Create a merge commit**. The release PR then merges cleanly. If `main` has changes that `dev` lacks, merge `main` into `dev` normally and resolve the conflicts instead.

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
