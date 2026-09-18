import * as p from '@clack/prompts';
import { colors } from './theme';
import { getFilteredOptions } from '@scaffold-forge/core';

export async function runWizard() {
  p.intro(colors.primary + colors.bold + ' SCAFFOLD-FORGE INITIATED ' + colors.reset);

  const initialOptions = getFilteredOptions({});

  const config = await p.group(
    {
      framework: () =>
        p.select({
          message: 'Select Framework:',
          options: [
            { value: 'express', label: 'Express' },
            { value: 'fastify', label: 'Fastify' },
            { value: 'nestjs', label: 'NestJS' },
          ] as any,
        }),
      language: () =>
        p.select({
          message: 'Select Language:',
          options: [
            { value: 'typescript', label: 'TypeScript' },
            { value: 'javascript', label: 'JavaScript' },
          ] as any,
        }),
      orm: () =>
        p.select({
          message: 'Select ORM / Query Builder:',
          options: initialOptions.orm.map((o: string) => ({ value: o, label: o.charAt(0).toUpperCase() + o.slice(1) })) as any,
        }),
      database: ({ results }) => {
        const filtered = getFilteredOptions({ orm: results.orm as any });
        return p.select({
          message: 'Select Database:',
          options: filtered.database.map((d: string) => ({ value: d, label: d.charAt(0).toUpperCase() + d.slice(1) })) as any,
        });
      },
    },
    {
      onCancel: () => {
        p.cancel('Operation cancelled. Nothing written.');
        process.exit(0);
      },
    }
  );

  p.outro(colors.success + ' Configuration locked. Forging project...' + colors.reset);
  return config;
}