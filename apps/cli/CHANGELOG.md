# scaffold-forge

## 0.2.4

### Patch Changes

- Implement Type Isolation Pattern to work around @clack/prompts type inference bugs. Maintains strict type-safety across the rest of the codebase.

## 0.2.3

### Patch Changes

- Fix @clack/prompts strict TypeScript generic inference errors.

## 0.2.2

### Patch Changes

- Fix strict TypeScript type inference errors in TUI prompts (p.select generic types).

## 0.2.1

### Patch Changes

- Fix TUI offering unimplemented frameworks (NestJS/Fastify) causing ENOENT crashes. Restricted options to implemented registry fragments.

## 0.2.0

### Minor Changes

- 1423995: Initial public release of the Scaffold Forge enterprise CLI.

### Patch Changes

- 4a6a23f: Fix global CLI template resolution and bundle registry assets into the published package.
