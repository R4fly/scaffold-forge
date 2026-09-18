import { Eta } from 'eta';
import * as fs from 'node:fs/promises';

export interface RenderContext {
  config: Record<string, any>;
  project: {
    name: string;
  };
}

export class Renderer {
  private eta: Eta;

  constructor() {
    this.eta = new Eta({ autoTrim: false });
  }

  async renderString(template: string, context: RenderContext): Promise<string> {
    return this.eta.renderStringAsync(template, context);
  }

  async renderFile(filePath: string, context: RenderContext): Promise<string> {
    const template = await fs.readFile(filePath, 'utf-8');
    return this.renderString(template, context);
  }
}