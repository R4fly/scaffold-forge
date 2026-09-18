export type HookName = 'beforeResolve' | 'afterResolve' | 'beforeCompose' | 'afterCompose' | 'beforeRender' | 'afterRender' | 'afterWrite' | 'onError';

export type Permission = 'fs:read:project' | 'fs:write:project' | 'fs:read:system' | 'fs:write:system' | 'network' | 'exec' | 'env:read';

export interface PluginManifest {
  name: string;
  version: string;
  sfgVersion: string;
  hooks: HookName[];
  permissions: Permission[];
  entrypoint: string;
}

export interface HookContext {
  config: any;
  projectDir: string;
}

export interface SfgPlugin {
  manifest: PluginManifest;
  execute(hook: HookName, context: HookContext): Promise<void>;
}