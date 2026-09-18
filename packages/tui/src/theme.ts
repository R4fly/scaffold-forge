export const colors = {
  canvas: '\x1b[48;2;3;7;30m',
  elevated: '\x1b[48;2;55;6;23m',
  border: '\x1b[38;2;106;4;15m',
  muted: '\x1b[38;2;157;2;8m',
  primary: '\x1b[38;2;208;0;0m',
  hot: '\x1b[38;2;220;47;2m',
  warn: '\x1b[38;2;232;93;4m',
  success: '\x1b[38;2;244;140;6m',
  bright: '\x1b[38;2;250;163;7m',
  text: '\x1b[38;2;255;186;8m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

export const asciiLogo = `
   ▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄
  █ ▄▄▄ █  █ ▄▄▄ █  █ ▄▄▄ █     S C A F F O L D
  █ ███ █  █ ███ █  █ ███ █     ─────────────────
  █▄▄▄▄▄█  █▄▄▄▄▄█  █▄▄▄▄▄█     F O R G E
`;

export function printSplash() {
  console.log(colors.primary + asciiLogo + colors.reset);
  console.log(colors.text + "  Forge your stack. One command." + colors.reset);
  console.log();
}

export function drawBox(content: string): string {
  const lines = content.split('\n');
  const maxLen = Math.max(...lines.map(l => l.length));
  const top = '╭' + '─'.repeat(maxLen + 2) + '╮';
  const bottom = '╰' + '─'.repeat(maxLen + 2) + '╯';
  const body = lines.map(l => '│ ' + l.padEnd(maxLen) + ' │').join('\n');
  return `${top}\n${body}\n${bottom}`;
}