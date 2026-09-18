# Scaffold Forge

> Forge your stack. One command.

Scaffold Forge is an enterprise-grade CLI for generating composable, layered project architectures. It resolves dependencies deterministically and supports deep-merge configurations out of the box.

## Installation

```bash
npm install -g scaffold-forge
```

## Usage

Generate a new project interactively:
```bash
sfg forge my-api
```

Or use the non-interactive mode for CI/CD pipelines:
```bash
SFG_NON_INTERACTIVE=true SFG_FRAMEWORK=express SFG_ORM=prisma sfg forge my-api
```

## Architecture

Scaffold Forge uses a layered fragment composition engine. Base layers (Node/TS/JS) are merged with Framework (Express/Fastify) and ORM (Prisma/Drizzle) layers using a deterministic Deep Merge strategy, ensuring zero configuration conflicts.

## License

MIT