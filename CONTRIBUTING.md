# Contributing to Scaffold Forge

Thank you for your interest in contributing to Scaffold Forge. This document outlines the standard operating procedures for adding new Fragments, Plugins, or Core features.

## 🧩 Adding a New Fragment

Fragments are the building blocks of the generated projects. They reside in `packages/templates/registry/fragments/`.

1. **Create the Directory:**
   ```text
   packages/templates/registry/fragments/<category>/<name>/
   ├── files/             # Raw assets and .eta templates
   └── fragment.json      # Metadata (layer priority, dependencies)
   ```
2. **Define the Manifest (`fragment.json`):**
   ```json
   {
     "id": "<category>/<name>",
     "layer": 10,
     "description": "Adds <name> support to the project."
   }
   ```
   *Note: Lower layer numbers are processed first. Base layers are `0`, Frameworks are `10`, ORMs are `20`.*
3. **Use Eta.js for Templating:**
   Any file ending in `.eta` will be processed by the Core Renderer. You have access to the `config` and `project` context objects.
4. **Handle `package.json` Merging:**
   If your fragment includes a `package.json.eta`, the Core Engine will automatically deep-merge it with the global `package.json`. Do not manually write file-system merge logic.

## 🔌 Developing Plugins

Plugins allow you to hook into the CLI lifecycle (e.g., `afterWrite`).
1. Create a new workspace in `plugins/`.
2. Depend on `@scaffold-forge/plugin-sdk`.
3. Export a function that registers hooks via the `PluginHost`.

## 📝 Commit Conventions

We strictly enforce [Conventional Commits](https://www.conventionalcommits.org/) via `commitlint` and `husky`.

- `feat(core): add deep merge array deduplication`
- `fix(cli): resolve __dirname pathing in bundled mode`
- `chore(turbo): optimize cache dependencies`

**Before opening a PR, ensure:**
- [ ] `npm run typecheck` passes.
- [ ] `npm run lint` passes.
- [ ] `npm run test` passes (including E2E generation tests).
- [ ] A changeset is attached if your change affects the public CLI API or published packages (`npm run changeset`).