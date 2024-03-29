import { join as pathJoin, resolve as pathResolve } from 'node:path';
import { Application, TypeDocOptions } from 'typedoc';

(async function main() {
  const { rootPath, realPath } = process.env as typeof process.env & {
    rootPath: string;
    realPath: string;
  };

  const app = await Application.bootstrapWithPlugins({
    plugin: ['typedoc-plugin-markdown'],
    entryPoints: [realPath],
    outputFileStrategy: 'modules',
    logLevel: 'Warn',
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
    return;
  }

  const parentPath = pathResolve(realPath, '..');

  try {
    await app.generateDocs(project, parentPath);
  } catch (err) {
    console.error(err);
    return;
  }

  const relativePath = pathJoin(parentPath.replace(rootPath, ''), 'README.md');
  console.log('Documentation generated at', relativePath.slice(1));
})();
