#!/usr/bin/env node
import { Command } from 'commander';
import { forgeCommand } from './commands/forge';
import { upgradeCommand } from './commands/upgrade';

const program = new Command();

program
  .name('sfg')
  .description('Scaffold-Forge CLI - Forge your stack. One command.')
  .version('0.1.0');

program
  .command('forge [name]')
  .description('Generate a new project')
  .action(async (name) => {
    await forgeCommand(name);
  });

program
  .command('upgrade [dir]')
  .description('Upgrade an existing generated project')
  .action(async (dir) => {
    await upgradeCommand(dir);
  });

program.parse();