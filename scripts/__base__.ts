import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const __base__ = (metaUrl: string) => {
  const __filename = fileURLToPath(metaUrl);
  return { __filename, __dirname: dirname(__filename) };
};
