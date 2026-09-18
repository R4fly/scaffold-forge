import * as path from 'node:path';
import * as p from '@clack/prompts';
import { runMigrations } from '@scaffold-forge/migration';
import { colors } from '@scaffold-forge/tui';

export async function upgradeCommand(dir?: string) {
  p.intro(colors.primary + colors.bold + ' SCAFFOLD-FORGE UPGRADE ' + colors.reset);
  const targetDir = path.resolve(process.cwd(), dir || '.');
  await runMigrations(targetDir);
  p.outro(colors.success + ' Upgrade check completed.' + colors.reset);
}