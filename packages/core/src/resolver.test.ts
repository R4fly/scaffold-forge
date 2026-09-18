import { describe, it, expect } from 'vitest';
import { getFilteredOptions } from './resolver';

describe('Compatibility Resolver', () => {
  it('should filter ORMs to mongoose and prisma when database is mongodb', () => {
    const options = getFilteredOptions({ database: 'mongodb' });
    expect(options.orm).toEqual(['prisma', 'mongoose']);
  });

  it('should filter database to mongodb when orm is mongoose', () => {
    const options = getFilteredOptions({ orm: 'mongoose' });
    expect(options.database).toEqual(['mongodb']);
  });

  it('should filter out mongodb from databases when orm is typeorm', () => {
    const options = getFilteredOptions({ orm: 'typeorm' });
    expect(options.database).not.toContain('mongodb');
  });

  it('should filter out playwright when testing is node-test', () => {
    const options = getFilteredOptions({ testing: 'node-test' });
    expect(options.e2e).not.toContain('playwright');
  });
});