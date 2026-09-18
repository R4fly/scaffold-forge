import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/bin.ts'],
  format: ['cjs'],
  target: 'node20',
  outDir: 'dist',
  clean: true,
  splitting: false,
  sourcemap: false,
  minify: true,
  noExternal: [/(.*)/],
});