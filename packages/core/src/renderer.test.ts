import { describe, it, expect } from 'vitest';
import { Renderer } from './renderer';

describe('Renderer Engine', () => {
  it('should render string template with context', async () => {
    const renderer = new Renderer();
    const context = { project: { name: 'test' }, config: {}, name: 'Forge' } as any;
    const result = await renderer.renderString('Hello <%= it.name %>', context);
    expect(result).toBe('Hello Forge');
  });
});