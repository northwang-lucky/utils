import { execSync as exec } from 'node:child_process';
import { glob } from 'glob';
import { resolve as pathResolve, sep } from 'node:path';
import packageJson from '../package.json';
import { __dirname } from './__base__';

(async function main() {
  // 获取根路径
  const rootPath = pathResolve(__dirname, '..');
  const patterns = packageJson.files.filter(pattern => pattern.endsWith('.d.ts') && pattern !== 'index.d.ts');
  // 扫描
  const filePaths = await glob(patterns, {
    cwd: rootPath,
    nodir: true,
    ignore: 'node_modules/**',
    maxDepth: 3,
  });
  // 生成文档
  const tasks = filePaths.map(path => {
    const parentPath = path.split(sep).slice(0, -1).join(sep);
    const command = `npx simple-tsdoc ${path} -o ${parentPath}${sep}README.md`;
    return new Promise<void>(resolve => {
      exec(command, { stdio: 'inherit', encoding: 'utf-8' });
      resolve();
    });
  });
  tasks.length > 0 && (await Promise.all(tasks));
})();
