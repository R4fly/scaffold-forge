import { describe, it, expect } from 'vitest';
import { ConfigSchema } from './schema';

describe('ConfigSchema Validation', () => {
  it('should pass with valid default config', () => {
    const input = { schemaVersion: '1' as const, name: 'my-api' };
    const result = ConfigSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('should fail on invalid project name (Regex)', () => {
    const input = { schemaVersion: '1' as const, name: 'Invalid_Name' };
    const result = ConfigSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('should fail R1: mongoose with postgres', () => {
    const input = { schemaVersion: '1' as const, name: 'my-api', orm: 'mongoose' as const, database: 'postgres' as const };
    const result = ConfigSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('should fail R2: mongodb with typeorm', () => {
    const input = { schemaVersion: '1' as const, name: 'my-api', orm: 'typeorm' as const, database: 'mongodb' as const };
    const result = ConfigSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('should pass valid R1: mongoose with mongodb', () => {
    const input = { schemaVersion: '1' as const, name: 'my-api', orm: 'mongoose' as const, database: 'mongodb' as const };
    const result = ConfigSchema.safeParse(input);
    expect(result.success).toBe(true);
  });
});