# Scaffold Forge (Monorepo)

<div align="center">
  <h3>Forge your stack. One command.</h3>
  <p>An enterprise-grade, composable CLI engine for generating layered project architectures.</p>
</div>

## 🧠 Architectural Philosophy

Scaffold Forge moves away from rigid, monolithic boilerplates. Instead, it utilizes a **Fragment Composition Engine**. 
- **Base Layers** (Node/TS/JS) provide the foundation.
- **Framework Layers** (Express/Fastify) inject routing and server logic.
- **ORM Layers** (Prisma/Drizzle) inject database schemas and clients.

These layers are composed using a **Deterministic Deep-Merge Strategy**, ensuring that `package.json` scripts, dependencies, and configuration files are mathematically merged without destructive overrides.

## 📦 Monorepo Topology

This repository is managed as a Turborepo monorepo with NPM Workspaces:

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
- Node.js `>= 20.11.0`
- NPM `>= 10.5.0`

### Setup
```bash
# Install dependencies and link workspaces
npm install

# Run typechecking and linting across all packages
npm run typecheck
npm run lint

# Run the full test suite (Unit + E2E)
npm run test

# Build the CLI binary locally
npm run build
```

### Testing the CLI Locally
To test the CLI without publishing to NPM, use the root alias:
```bash
npm run sfg -- forge my-test-project
```

## 🔄 Release Pipeline (Changesets)

This project uses [Changesets](https://github.com/changesets/changesets) to manage semantic versioning and automated NPM publishing via GitHub Actions.

1. Create a new branch and make your changes.
2. Record a changeset: `npm run changeset`
3. Commit the generated `.changeset/*.md` file.
4. Open a Pull Request.
5. Upon merging to `main`, the CI pipeline will open a "Version Packages" PR.
6. Merging the "Version Packages" PR triggers the automated NPM publish.

## 📄 License

MIT