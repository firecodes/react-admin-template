import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginLess } from '@rsbuild/plugin-less';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginSvgr } from '@rsbuild/plugin-svgr';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginSvgr({ mixedImport: true }),
    pluginLess(),
    pluginSass({
      // sassLoaderOptions: {
      //   api: 'legacy',
      //   sassOptions: {
      //     silenceDeprecations: [
      //       'legacy-js-api',
      //       'import',
      //       'global-builtin',
      //       'color-functions',
      //       'mixed-decls',
      //     ],
      //   },
      // },
    }),
  ],
  // html: {
  //   template: path.resolve(projectCWD, './public/index.html'),
  //   template: './public/index.html',
  // },
});
