import { z } from 'zod';

export const FrameworkEnum = z.enum(['express', 'fastify', 'nestjs']);
export const OrmEnum = z.enum(['prisma', 'drizzle', 'typeorm', 'sequelize', 'mongoose', 'kysely']);
export const DatabaseEnum = z.enum(['postgres', 'mysql', 'mariadb', 'sqlite', 'mongodb']);
export const CacheEnum = z.enum(['none', 'redis', 'in-memory']);
export const TestingEnum = z.enum(['jest', 'vitest', 'mocha', 'node-test']);
export const E2eEnum = z.enum(['none', 'playwright']);
export const LanguageEnum = z.enum(['typescript', 'javascript']);
export const ModuleEnum = z.enum(['esm', 'cjs']);
export const PackageManagerEnum = z.enum(['npm']);
export const LintingEnum = z.enum(['eslint', 'biome', 'none']);
export const FormattingEnum = z.enum(['prettier', 'biome', 'none']);
export const CiEnum = z.enum(['none', 'github', 'gitlab', 'circleci']);
export const AuthEnum = z.enum(['none', 'jwt', 'oauth2', 'better-auth']);
export const MonorepoToolEnum = z.enum(['none', 'turborepo', 'nx', 'pnpm-workspace']);
export const LicenseEnum = z.enum(['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3-Clause', 'ISC', 'UNLICENSED']);
export const LocaleEnum = z.enum(['en', 'id']);

export const ProjectNameRegex = /^[a-z][a-z0-9-]{0,63}$/;

export const ConfigSchema = z.object({
  schemaVersion: z.literal('1'),
  name: z.string().regex(ProjectNameRegex),
  description: z.string().max(200).default(''),
  author: z.string().default(''),
  license: LicenseEnum.default('MIT'),
  private: z.boolean().default(true),
  version: z.string().default('0.1.0'),

  runtime: z.enum(['node']).default('node'),
  nodeVersion: z.string().min(7).default('20.11.0'),
  packageManager: PackageManagerEnum.default('npm'),

  language: LanguageEnum.default('typescript'),
  module: ModuleEnum.default('esm'),
  strict: z.boolean().default(true),

  framework: FrameworkEnum.default('express'),
  port: z.number().int().min(1024).max(65535).default(3000),

  orm: OrmEnum.default('prisma'),
  migrations: z.boolean().default(true),
  seeding: z.boolean().default(false),

  database: DatabaseEnum.default('postgres'),
  cache: CacheEnum.default('none'),

  testing: TestingEnum.default('vitest'),
  e2e: E2eEnum.default('none'),
  coverage: z.boolean().default(false),

  linting: LintingEnum.default('eslint'),
  formatting: FormattingEnum.default('prettier'),
  husky: z.boolean().default(true),
  commitlint: z.boolean().default(true),

  auth: AuthEnum.default('none'),

  docker: z.boolean().default(true),
  dockerCompose: z.boolean().default(true),
  ci: CiEnum.default('github'),

  monorepo: z.boolean().default(false),
  monorepoTool: MonorepoToolEnum.default('none'),

  plugins: z.array(z.string()).default([]),
  preset: z.string().nullable().default(null),

  seed: z.string().nullable().default(null),
  deterministic: z.boolean().default(false),

  telemetry: z.boolean().default(false),
  locale: LocaleEnum.default('en'),
}).refine(
  (data) => {
    // R1, R2: Mongoose & MongoDB compatibility
    if (data.orm === 'mongoose' && data.database !== 'mongodb') return false;
    if (data.database === 'mongodb' && !['mongoose', 'prisma'].includes(data.orm)) return false;
    
    // R3, R4, R5: SQL ORMs require SQL databases
    const sqlOrms = ['typeorm', 'kysely', 'sequelize'];
    const sqlDbs = ['postgres', 'mysql', 'mariadb', 'sqlite'];
    if (sqlOrms.includes(data.orm) && !sqlDbs.includes(data.database)) return false;
    
    return true;
  },
  { message: 'SFG-1042: Incompatible ORM and Database combination.' }
).refine(
  (data) => {
    // R10: Playwright is not compatible with node-test runner in this architecture
    if (data.e2e === 'playwright' && data.testing === 'node-test') return false;
    return true;
  },
  { message: 'SFG-2003: Playwright is not compatible with node-test runner.' }
);

export type ScaffoldForgeConfig = z.infer<typeof ConfigSchema>;