export const colors = {
  primary: '\x1b[36m',
  success: '\x1b[32m',
  warn: '\x1b[33m',
  text: '\x1b[37m',
  muted: '\x1b[90m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

export function printSplash() {
  console.log(`
   ▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄
  █ ▄▄▄ █  █ ▄▄▄ █  █ ▄▄▄ █     S C A F F O L D
  █ ███ █  █ ███ █  █ ███ █     ─────────────────
  █▄▄▄▄▄█  █▄▄▄▄▄█  █▄▄▄▄▄█     F O R G E

  Forge your stack. One command.
`);
}