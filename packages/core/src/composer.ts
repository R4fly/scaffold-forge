import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as crypto from 'node:crypto';
import { Renderer, RenderContext } from './renderer';
import { deepMerge } from './merge';
import { PluginHost } from './plugin-host';

interface FragmentMeta {
  id: string;
  path: string;
  layer: number;
}

export interface ComposerOptions {
  registryPath?: string;
}

export class Composer {
  private renderer: Renderer;
  public pluginHost: PluginHost;
  private options: ComposerOptions;

  constructor(options: ComposerOptions = {}) {
    this.renderer = new Renderer();
    this.pluginHost = new PluginHost();
    this.options = options;
  }

  async compose(targetDir: string, context: RenderContext, fragmentIds: string[]) {
    const registryPath = this.options.registryPath || path.resolve(process.cwd(), 'packages/templates/registry/fragments');
    
    const langSuffix = context.config.language === 'javascript' ? 'js' : 'ts';
    const resolvedIds = fragmentIds.map(id => {
      if (id === 'base') return `base/node-${langSuffix}`;
      return id;
    });

    const fragments: FragmentMeta[] = [];
    for (const id of resolvedIds) {
      const fragPath = path.join(registryPath, id);
      const manifestPath = path.join(fragPath, 'fragment.json');
      try {
        const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf-8'));
        fragments.push({ id, path: fragPath, layer: manifest.layer || 0 });
      } catch (err) {
        throw new Error(`Failed to load manifest for fragment ${id}: ${(err as Error).message}`);
      }
    }

    fragments.sort((a, b) => a.layer - b.layer);

    let globalPkgJson: any = {};

    for (const frag of fragments) {
      globalPkgJson = await this.processFragment(frag.path, targetDir, context, globalPkgJson);
    }

    if (context.config.language === 'javascript' && globalPkgJson.devDependencies) {
      for (const key of Object.keys(globalPkgJson.devDependencies)) {
        if (key.startsWith('@types/')) {
          delete globalPkgJson.devDependencies[key];
        }
      }
    }

    if (Object.keys(globalPkgJson).length > 0) {
      const finalPkgPath = path.join(targetDir, 'package.json');
      await fs.writeFile(finalPkgPath, JSON.stringify(globalPkgJson, null, 2), 'utf-8');
    }

    const lockfile = {
      schemaVersion: '1',
      generator: { name: 'scaffold-forge', version: '0.1.0' },
      timestamp: new Date().toISOString(),
      configHash: crypto.createHash('sha256').update(JSON.stringify(context.config)).digest('hex'),
      fragments: resolvedIds
    };
    await fs.writeFile(path.join(targetDir, 'sfg.lock.json'), JSON.stringify(lockfile, null, 2), 'utf-8');

    await this.pluginHost.executeHook('afterWrite', { config: context.config, projectDir: targetDir });
  }

  private async processFragment(fragPath: string, targetDir: string, context: RenderContext, currentPkgJson: any): Promise<any> {
    const filesDir = path.join(fragPath, 'files');
    try { await fs.access(filesDir); } catch { return currentPkgJson; }
    const files = await fs.readdir(filesDir, { recursive: true });
    let pkgJson = currentPkgJson;

    for (const file of files) {
      const srcPath = path.join(filesDir, file as string);
      const stat = await fs.stat(srcPath);
      if (stat.isDirectory()) continue;

      const isTsFile = file.endsWith('.ts.eta') || file.endsWith('.ts');
      const isJsFile = file.endsWith('.js.eta') || file.endsWith('.js');
      const isTsLang = context.config.language === 'typescript';
      if (isTsFile && !isTsLang) continue;
      if (isJsFile && isTsLang) continue;

      let destPath = path.join(targetDir, file as string);
      if (destPath.endsWith('.eta')) destPath = destPath.slice(0, -4);
      const fileName = path.basename(destPath);
      if (fileName.startsWith('_')) destPath = path.join(path.dirname(destPath), '.' + fileName.slice(1));

      if (fileName === 'package.json' || fileName === 'package.json.eta') {
        const rendered = await this.renderer.renderFile(srcPath, context);
        try {
          const parsed = JSON.parse(rendered);
          pkgJson = deepMerge(pkgJson, parsed);
        } catch (err) {
          throw new Error(`Invalid JSON in package.json.eta at ${fragPath}: ${(err as Error).message}`);
        }
        continue;
      }

      await fs.mkdir(path.dirname(destPath), { recursive: true });
      if (srcPath.endsWith('.eta')) {
        const rendered = await this.renderer.renderFile(srcPath, context);
        await fs.writeFile(destPath, rendered, 'utf-8');
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
    return pkgJson;
  }
}