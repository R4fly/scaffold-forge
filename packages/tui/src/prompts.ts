import * as p from '@clack/prompts';
import { colors } from './theme';

export interface WizardConfig {
  framework: string;
  language: string;
  orm: string;
  database: string;
}

// ============================================================================
// TYPE ISOLATION WRAPPER
// @clack/prompts memiliki bug inferensi tipe pada beberapa versi di mana
// p.select mengembalikan Promise<void> alih-alih Promise<string> saat
// options menggunakan literal string. Wrapper ini mengisolasi kerusakan
// tersebut dan memaksa kembalian ke Promise<string> secara eksplisit.
// ============================================================================
async function selectString(opts: {
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any[];
}): Promise<string> {
  const result = await p.select(opts);
  if (typeof result === 'symbol') {
    throw new Error('Prompt was cancelled');
  }
  return result as string;
}

export function getFilteredOptions(_current: Partial<WizardConfig>) {
  return {
    orm: ['prisma'],
    database: ['postgres', 'mysql', 'sqlite']
  };
}

export async function runWizard(): Promise<WizardConfig> {
  p.intro(colors.primary + colors.bold + ' SCAFFOLD-FORGE INITIATED ' + colors.reset);

  const filtered = getFilteredOptions({});

  // Type assertion pada p.group diperlukan karena callback-nya memiliki
  // signature inferensi yang kompleks dengan parameter results yang optional.
  const results = await p.group(
    {
      framework: () =>
        selectString({
          message: 'Select Framework:',
          options: [
            { value: 'express', label: 'Express', hint: 'Supported' },
          ],
        }),
      language: () =>
        selectString({
          message: 'Select Language:',
          options: [
            { value: 'typescript', label: 'TypeScript', hint: 'Recommended' },
            { value: 'javascript', label: 'JavaScript' },
          ],
        }),
      orm: () =>
        selectString({
          message: 'Select ORM / Query Builder:',
          options: filtered.orm.map((o: string) => ({
            value: o,
            label: o.charAt(0).toUpperCase() + o.slice(1),
            hint: 'Supported'
          })),
        }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      database: ({ results }: any) => {
        const filteredDb = getFilteredOptions({ orm: results?.orm });
        return selectString({
          message: 'Select Database:',
          options: filteredDb.database.map((d: string) => ({
            value: d,
            label: d.charAt(0).toUpperCase() + d.slice(1),
          })),
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

  return results as WizardConfig;
}