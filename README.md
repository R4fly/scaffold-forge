<div align="center">

# ⚒️ Scaffold Forge

### Forge your stack. One command.

[![npm version](https://img.shields.io/npm/v/scaffold-forge.svg?style=flat-square)](https://www.npmjs.com/package/scaffold-forge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

</div>

---

Scaffold Forge is an enterprise-grade, composable CLI for generating layered project architectures. It moves away from rigid, monolithic boilerplates and utilizes a **Fragment Composition Engine** to resolve dependencies deterministically. 

By leveraging a **Deterministic Deep-Merge Strategy**, Scaffold Forge ensures that package.json scripts, dependencies, and configurations from Base, Framework, and ORM layers are mathematically merged without destructive overrides.

## 🧠 Architectural Philosophy

Scaffold Forge utilizes a **Fragment Composition Engine**:
- **Base Layers** (Node/TS/JS) provide the foundation (layer: 0).
- **Framework Layers** (Express/Fastify) inject routing and server logic (layer: 10).
- **ORM Layers** (Prisma/Drizzle) inject database schemas and clients (layer: 20).

## 📦 Monorepo Topology

This repository is managed as a **Turborepo** monorepo with NPM Workspaces:

```text
scaffold-forge/
├── apps/
│   └── cli/               # The main CLI application (Published to NPM)
├── packages/
│   ├── core/              # Fragment resolution, Eta.js renderer, and Deep-Merge engine
│   ├── config/            # Zod schemas for configuration validation
│   ├── tui/               # Interactive terminal UI (@clack/prompts)
│   ├── templates/         # The Fragment Registry (Base, Framework, ORM assets)
│   ├── plugin-sdk/        # Type-safe contracts for plugin developers
│   ├── migration/         # Provenance lockfile (sfg.lock.json) diffing engine
│   └── shared/            # Cross-workspace utilities
└── plugins/               # First-party plugins (Docker, Auth, CI)
```

## 🛠 Local Development

### Prerequisites
- Node.js ``>= 20.11.0``
- NPM ``>= 10.5.0``

### Setup & Testing
```bash
# Install dependencies and link workspaces
npm install

# Run typechecking and linting across all packages
npm run typecheck
npm run lint

# Run the full test suite (Unit + Headless E2E)
npm run test

# Build the CLI binary locally
npm run build
```

### Testing the CLI Locally
To test the CLI without publishing to NPM, use the root alias:
```bash
npm run sfg -- forge my-test-project
```

## 🔄 Release Pipeline (Semantic Versioning)

This project uses [Changesets](https://github.com/changesets/changesets) to manage semantic versioning and automated NPM publishing via GitHub Actions.

1. Create a new branch and make your changes.
2. Record a changeset: ``npm run changeset``
3. Commit the generated ``.changeset/*.md`` file.
4. Open a Pull Request.
5. Upon merging to ``main``, the CI pipeline will open a "Version Packages" PR.
6. Merging the "Version Packages" PR triggers the automated NPM publish.

## 📚 For End-Users

Just want to use the CLI to generate a project? 
👉 **[Read the Installation & Usage Guide on NPM](https://www.npmjs.com/package/scaffold-forge)**

For guidelines on adding new Fragments or Plugins, please read [CONTRIBUTING.md](./CONTRIBUTING.md).

## 📄 License

MIT © [R4fly](https://github.com/R4fly)