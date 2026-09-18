export function deepMerge(target: any, source: any): any {
  const isObject = (obj: any) => obj && typeof obj === 'object' && !Array.isArray(obj);
  if (!isObject(target) || !isObject(source)) {
    return source;
  }

  const output = { ...target };
  for (const key of Object.keys(source)) {
    if (isObject(source[key])) {
      if (!(key in target)) {
        Object.assign(output, { [key]: source[key] });
      } else {
        output[key] = deepMerge(target[key], source[key]);
      }
    } else if (Array.isArray(source[key])) {
      output[key] = Array.from(new Set([...(target[key] || []), ...source[key]]));
    } else {
      Object.assign(output, { [key]: source[key] });
    }
  }
  return output;
}