import * as p from '@clack/prompts';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { runWizard, colors, printSplash } from '@scaffold-forge/tui';
import { Composer } from '@scaffold-forge/core';

export async function forgeCommand(name?: string) {
  printSplash();

  let projectName = name;
  if (!projectName) {
    if (process.env.SFG_NON_INTERACTIVE === 'true') {
      projectName = 'e2e-test-project';
    } else {
      projectName = await p.text({
        message: 'Project name?',
        placeholder: 'my-api',
        validate: (value) => {
          if (!value) return 'Please enter a project name.';
          if (!/^[a-z][a-z0-9-]{0,63}$/.test(value)) return 'Invalid format.';
        },
      }) as string;
    }
  }

  let wizardConfig: any;
  if (process.env.SFG_NON_INTERACTIVE === 'true') {
    wizardConfig = {
      framework: process.env.SFG_FRAMEWORK || 'express',
      language: process.env.SFG_LANGUAGE || 'typescript',
      orm: process.env.SFG_ORM || 'prisma',
      database: process.env.SFG_DATABASE || 'postgres',
    };
  } else {
    wizardConfig = await runWizard();
  }

  const targetDir = path.resolve(process.cwd(), projectName);
  
  try {
    await fs.mkdir(targetDir, { recursive: true });
  } catch (err) {
    console.error(colors.warn + `Directory ${targetDir} already exists or cannot be created.` + colors.reset);
    process.exit(1);
  }

  const fragments = [
    'base',
    `framework/${wizardConfig.framework}`,
    `orm/${wizardConfig.orm}`,
  ];

  // FIX: Use __dirname to resolve templates relative to the bundled CLI installation path
  const registryPath = path.resolve(__dirname, 'templates/registry/fragments');
  const composer = new Composer({ registryPath });
  
  await composer.compose(targetDir, {
    project: { name: projectName },
    config: { ...wizardConfig, strict: true, author: '', description: '', license: 'MIT' },
  }, fragments);

  console.log('\n' + colors.success + '  [SUCCESS] Project forged successfully.' + colors.reset);
  console.log(colors.text + '  Next steps:' + colors.reset);
  console.log(colors.muted + `    cd ${projectName}` + colors.reset);
  console.log(colors.muted + '    npm install' + colors.reset);
  console.log(colors.muted + '    npm run dev' + colors.reset);
}