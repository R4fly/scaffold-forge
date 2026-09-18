<div align="center">

# ⚒️ Scaffold Forge

### Forge your stack. One command.

[![npm version](https://img.shields.io/npm/v/scaffold-forge.svg?style=flat-square)](https://www.npmjs.com/package/scaffold-forge)
[![npm downloads](https://img.shields.io/npm/dm/scaffold-forge.svg?style=flat-square)](https://www.npmjs.com/package/scaffold-forge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

**The enterprise-grade CLI for generating composable, layered project architectures.**

[Installation](#-installation) • [Usage](#-usage) • [Features](#-features) • [Support Matrix](#-support-matrix) • [CI/CD](#-headless--cicd-mode)

</div>

---

## 🚀 Installation

Install the CLI globally via NPM:

```bash
npm install -g scaffold-forge
```

Verify the installation:

```bash
sfg --version
```

## 🛠 Usage

### Interactive Mode

Generate a new project by answering a series of prompts to build your custom stack:

```bash
sfg forge my-enterprise-api
```

You will be prompted to select:
- **Framework:** Express, Fastify, or NestJS
- **Language:** TypeScript or JavaScript
- **ORM:** Prisma or Drizzle
- **Database:** PostgreSQL, MySQL, or SQLite

### Headless / CI/CD Mode

For automated pipelines, bypass the interactive prompts using environment variables:

```bash
SFG_NON_INTERACTIVE=true \
SFG_FRAMEWORK=express \
SFG_ORM=prisma \
SFG_LANGUAGE=typescript \
SFG_DATABASE=postgres \
sfg forge my-automated-api
```

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🧩 **Fragment Composition** | Base, Framework, and ORM layers are mathematically merged without destructive overrides. |
| 🔒 **Provenance Lockfile** | `sfg.lock.json` tracks exact configuration hashes for safe future migrations. |
| 🔌 **Zero-Trust Plugins** | Extensible lifecycle hooks for Docker, GitHub Actions, JWT Auth, and more. |
| ⚡ **Deterministic Deep-Merge** | `package.json` dependencies and scripts are intelligently merged, not overwritten. |
| 🎨 **Eta.js Templating** | Powerful template engine with access to `config` and `project` context objects. |
| 🧪 **E2E Tested** | Every release is validated with headless Vitest E2E generation tests. |

## 📦 What Gets Generated?

When you run `sfg forge my-api`, you get a **production-ready architecture**:

```text
my-api/
├── src/
│   ├── db/
│   │   └── client.ts          # Prisma/Drizzle client singleton
│   ├── routes/
│   │   └── index.ts           # Framework-specific routing
│   └── server.ts              # Application entry point
├── prisma/
│   └── schema.prisma          # Database schema (if Prisma selected)
├── package.json               # Deep-merged dependencies & scripts
├── tsconfig.json              # TypeScript configuration
├── sfg.lock.json              # Provenance lockfile
└── .gitignore                 # Language-specific ignores
```

## 🎯 Support Matrix

### Frameworks

| Framework | Status | Description |
|-----------|--------|-------------|
| **Express** | ✅ Stable | Minimalist web framework for Node.js |
| **Fastify** | 🚧 Beta | Fast and low overhead web framework |
| **NestJS** | 🗓️ Planned | Progressive Node.js framework |

### ORMs

| ORM | Status | Description |
|-----|--------|-------------|
| **Prisma** | ✅ Stable | Next-generation ORM for Node.js and TypeScript |
| **Drizzle** | 🚧 Beta | Lightweight TypeScript ORM with SQL-like syntax |
| **TypeORM** | 🗓️ Planned | ORM for TypeScript and JavaScript |

### Databases

| Database | Status | Description |
|----------|--------|-------------|
| **PostgreSQL** | ✅ Stable | Advanced open source relational database |
| **MySQL** | ✅ Stable | World's most popular open source database |
| **SQLite** | ✅ Stable | Self-contained, serverless SQL database engine |

## 🔄 Environment Variables Reference

For headless/CI/CD usage, the following environment variables are available:

| Variable | Values | Default | Description |
|----------|--------|---------|-------------|
| `SFG_NON_INTERACTIVE` | `true` / `false` | `false` | Disable interactive prompts |
| `SFG_FRAMEWORK` | `express` / `fastify` / `nestjs` | `express` | Web framework selection |
| `SFG_LANGUAGE` | `typescript` / `javascript` | `typescript` | Language selection |
| `SFG_ORM` | `prisma` / `drizzle` | `prisma` | ORM/Query builder selection |
| `SFG_DATABASE` | `postgres` / `mysql` / `sqlite` | `postgres` | Database engine selection |

## 📚 Advanced Usage

### Plugin System

Scaffold Forge supports a plugin architecture. You can extend the generation process by injecting plugins that listen to lifecycle hooks:

```typescript
// Example: Adding a Dockerfile after project generation
pluginHost.registerHook('afterWrite', async (context) => {
  await fs.writeFile(
    path.join(context.projectDir, 'Dockerfile'),
    'FROM node:20-alpine\nWORKDIR /app\nCOPY . .\nRUN npm ci\nCMD ["npm", "start"]'
  );
});
```

### Upgrading Existing Projects

Scaffold Forge can detect and upgrade existing projects using the provenance lockfile:

```bash
cd my-existing-api
sfg upgrade
```

## 🐛 Troubleshooting

### "Command not found: sfg"

Ensure NPM global bin directory is in your PATH:

```bash
# Add to ~/.bashrc or ~/.zshrc
export PATH="$PATH:$(npm bin -g)"
```

### "Permission denied" during installation

Use a Node version manager (recommended) or fix NPM permissions:

```bash
# Recommended: Use nvm, fnm, or volta
# Alternative: Fix NPM permissions
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

## 🤝 Contributing

Want to add a new Fragment, develop a Plugin, or contribute to the Core Engine?

👉 **[Read the Monorepo Architecture & Contribution Guide on GitHub](https://github.com/R4fly/scaffold-forge)**

## 📄 License

MIT © [R4fly](https://github.com/R4fly)

---

<div align="center">

**If you find Scaffold Forge useful, please consider giving it a ⭐ on [GitHub](https://github.com/R4fly/scaffold-forge)!**

</div>