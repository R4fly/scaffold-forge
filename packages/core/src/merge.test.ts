import { describe, it, expect } from 'vitest';
import { deepMerge } from './merge';

describe('Deep Merge Engine', () => {
  it('should merge package.json dependencies deterministically', () => {
    const target = {
      name: 'my-api',
      dependencies: { cors: '^2.8.5' },
      scripts: { build: 'tsc' }
    };
    const source = {
      dependencies: { express: '^4.18.2' },
      scripts: { dev: 'tsx src/server.ts' }
    };
    
    const result = deepMerge(target, source);
    
    expect(result.dependencies).toEqual({ cors: '^2.8.5', express: '^4.18.2' });
    expect(result.scripts).toEqual({ build: 'tsc', dev: 'tsx src/server.ts' });
    expect(result.name).toBe('my-api');
  });
});