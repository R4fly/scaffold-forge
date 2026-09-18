# Scaffold Forge

> Forge your stack. One command.

Scaffold Forge is an enterprise-grade, composable CLI for generating layered project architectures. It resolves dependencies deterministically and supports deep-merge configurations out of the box.

## 🚀 Quick Start

Generate a new project interactively:
``bash
npx scaffold-forge forge my-api
``

Or use the non-interactive mode for CI/CD pipelines:
``bash
SFG_NON_INTERACTIVE=true SFG_FRAMEWORK=express SFG_ORM=prisma npx scaffold-forge forge my-api
``

## 🏗 Architecture

Scaffold Forge is built as a Turborepo monorepo with a layered fragment composition engine:
- **Core Engine:** Deterministic Deep Merge strategy for package.json and file composition.
- **Plugin SDK:** Zero-trust lifecycle hooks for third-party extensions.
- **Migration Engine:** Provenance lockfile (sfg.lock.json) for safe project upgrades.
- **Bundled CLI:** Compiled into a single, offline-first executable using 	sup (< 8MB).

## 📦 Monorepo Structure

- `apps/cli` - The main CLI application (Published to NPM).
- `packages/core` - Fragment resolution and composition engine.
- `packages/tui` - Interactive terminal UI components.
- `packages/templates` - The fragment registry (Base, Framework, ORM).
- `packages/plugin-sdk` - Type-safe contracts for plugin developers.

## 🛠 Development

``bash
# Install dependencies
npm install

# Run typechecking and linting across all workspaces
npm run typecheck
npm run lint

# Run E2E and unit tests
npm run test

# Build the CLI binary
npm run build
``

## 🔄 Release Process

This project uses [Changesets](https://github.com/changesets/changesets) for semantic versioning and automated NPM publishing via GitHub Actions.

``bash
# Record a changeset
npm run changeset

# Bump versions and generate changelogs
npm run version-packages

# Publish to NPM (Usually handled by CI)
npm run release
``

## 📄 License

MIT