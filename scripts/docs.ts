import { glob } from 'glob';
import { resolve as pathResolve, join as pathJoin } from 'node:path';
import { Application, type TypeDocOptions } from 'typedoc';
import { __dirname } from './__base__';

(async function main() {
  // 获取根路径
  const rootPath = pathResolve(__dirname, '..');

  // 扫描
  const filePaths = await glob('*/**/index.ts', {
    cwd: pathJoin(rootPath, 'src'),
    nodir: true,
  });

  // 生成文档
  const tasks = filePaths.map(path => {
    return new Promise<boolean>(async resolve => {
      const realPath = pathJoin('src', path);
      const app = await Application.bootstrapWithPlugins({
        plugin: ['typedoc-plugin-markdown'],
        entryPoints: [realPath],
        outputFileStrategy: 'modules',
        readme: pathJoin(rootPath, 'HEADER.md'),
        disableSources: true,
        mergeReadme: true,
        hidePageHeader: true,
        hidePageTitle: true,
        hideBreadcrumbs: true,
        cleanOutputDir: false,
        excludeInternal: true,
        excludePrivate: true,
        textContentMappings: {
          'kind.function.plural': 'Function',
          'kind.class.plural': 'Class',
        },
      } as Partial<TypeDocOptions>);

      const project = await app.convert();
      if (!project) {
        resolve(false);
        return;
      }

      const parentPath = pathResolve(realPath, '..');
      await app.generateDocs(project, parentPath);
    });
  });
  tasks.length > 0 && (await Promise.all(tasks));
})();
