import { glob } from 'glob';
import { join as pathJoin, resolve as pathResolve } from 'node:path';
import { spawn } from 'node:child_process';
import { __base__ } from '../__base__';

const { __dirname } = __base__(import.meta.url);

(async function main() {
  // 获取根路径
  const rootPath = pathResolve(__dirname, '../..');
  const filePaths = await glob('*/**/index.ts', {
    cwd: pathJoin(rootPath, 'src'),
    nodir: true,
  });
  for (const path of filePaths) {
    const realPath = pathJoin('src', path);
    spawn(`npx`, ['esno', pathResolve(__dirname, './subtask.ts')], {
      stdio: 'inherit',
      env: { ...process.env, rootPath, realPath },
    });
  }
})();
