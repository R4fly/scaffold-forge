const fs = require('fs');
const path = require('path');

// __dirname = .../apps/cli/scripts
// Target = .../packages/templates/registry
// Lompat 3 tingkat ke atas: scripts -> cli -> apps -> root
const src = path.resolve(__dirname, '../../../packages/templates/registry');
const dest = path.resolve(__dirname, '../dist/templates/registry');

if (!fs.existsSync(src)) {
  console.error(`[copy-templates] Source directory not found: ${src}`);
  process.exit(1);
}

if (fs.existsSync(dest)) {
  fs.rmSync(dest, { recursive: true, force: true });
}
fs.cpSync(src, dest, { recursive: true });
console.log('[copy-templates] Registry copied to dist/templates/registry');