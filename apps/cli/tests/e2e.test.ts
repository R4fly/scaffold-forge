import { describe, it, expect, afterAll } from 'vitest';
import { execa } from 'execa';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

const CLI_PATH = path.resolve(process.cwd(), 'dist/bin.js');
const TEST_DIR = path.resolve(process.cwd(), '../../e2e-test-project');

describe('CLI E2E Test', () => {
  afterAll(async () => {
    try {
      await fs.rm(TEST_DIR, { recursive: true, force: true });
    } catch {}
  });

  it('should generate a project in non-interactive mode', async () => {
    try {
      await fs.rm(TEST_DIR, { recursive: true, force: true });
    } catch {}

    const { exitCode, stdout } = await execa('node', [CLI_PATH, 'forge', 'e2e-test-project'], {
      env: {
        ...process.env,
        SFG_NON_INTERACTIVE: 'true',
        SFG_FRAMEWORK: 'express',
        SFG_LANGUAGE: 'typescript',
        SFG_ORM: 'prisma',
        SFG_DATABASE: 'postgres',
      },
      cwd: path.resolve(process.cwd(), '../..'), // root monorepo
    });

    expect(exitCode).toBe(0);
    expect(stdout).toContain('[SUCCESS] Project forged successfully.');

    const pkgJsonPath = path.join(TEST_DIR, 'package.json');
    const lockfilePath = path.join(TEST_DIR, 'sfg.lock.json');
    
    const pkgJsonExists = await fs.access(pkgJsonPath).then(() => true).catch(() => false);
    const lockfileExists = await fs.access(lockfilePath).then(() => true).catch(() => false);

    expect(pkgJsonExists).toBe(true);
    expect(lockfileExists).toBe(true);

    const pkgJson = JSON.parse(await fs.readFile(pkgJsonPath, 'utf-8'));
    expect(pkgJson.dependencies).toHaveProperty('express');
    expect(pkgJson.dependencies).toHaveProperty('@prisma/client');
  });
});