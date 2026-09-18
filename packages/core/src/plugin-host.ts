import { HookName, HookContext } from '@scaffold-forge/plugin-sdk';

export class PluginHost {
  private registeredHooks: Map<HookName, Array<(ctx: HookContext) => Promise<void>>> = new Map();

  registerHook(hook: HookName, handler: (ctx: HookContext) => Promise<void>) {
    if (!this.registeredHooks.has(hook)) {
      this.registeredHooks.set(hook, []);
    }
    this.registeredHooks.get(hook)!.push(handler);
  }

  async executeHook(hook: HookName, context: HookContext) {
    const handlers = this.registeredHooks.get(hook) || [];
    for (const handler of handlers) {
      try {
        await handler(context);
      } catch (err) {
        console.error(`[PluginHost] Error executing hook ${hook}:`, err);
      }
    }
  }
}