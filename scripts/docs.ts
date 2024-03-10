import { glob } from 'glob';
import { resolve as pathResolve, join as pathJoin } from 'node:path';
import { Application, type TypeDocOptions } from 'typedoc';
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
    const parentPath = pathResolve(path, '..');
    return new Promise<boolean>(async resolve => {
      const app = await Application.bootstrapWithPlugins({
        plugin: ['typedoc-plugin-markdown'],
        entryPoints: [pathJoin(parentPath, 'index.ts')],
        outputFileStrategy: 'modules',
        readme: pathJoin(rootPath, 'EMPTY.md'),
        disableSources: true,
        mergeReadme: true,
        hidePageHeader: true,
        hidePageTitle: true,
        hideBreadcrumbs: true,
        cleanOutputDir: false,
        excludeInternal: true,
        excludePrivate: true,
      } as Partial<TypeDocOptions>);

      const project = await app.convert();
      if (!project) {
        resolve(false);
        return;
      }

      await app.generateDocs(project, parentPath);
    });
  });
  tasks.length > 0 && (await Promise.all(tasks));
})();
