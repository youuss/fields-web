import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver(),
      ],
      // relative paths to the directory to search for components.
      dirs: ['src/components'],

      // valid file extensions for components.
      extensions: ['vue'],
      // search for subdirectories
      deep: true,

      // generate `components.d.ts` global declarations,
      // also accepts a path for custom filename
      // default: `true` if package typescript is installed
      dts: true,

      // Allow subdirectories as namespace prefix for components.
      directoryAsNamespace: false,
      // Subdirectory paths for ignoring namespace prefixes
      // works when `directoryAsNamespace: true`
      globalNamespaces: [],

      // auto import for directives
      // default: `true` for Vue 3, `false` for Vue 2
      // Babel is needed to do the transformation for Vue 2, it's disabled by default for performance concerns.
      // To install Babel, run: `npm install -D @babel/parser @babel/traverse`
      directives: true,

      // Transform path before resolving
      importPathTransform: v => v,

      // Allow for components to override other components with the same name
      allowOverrides: false,

      // filters for transforming targets
      include: [/\.vue$/, /\.vue\?vue/],
      exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue\??/, // .vue
      ],
      imports: [
        'vue',
        'vue-router',
        {
          'ant-design-vue': ['message'],
        },
      ],
      dts: true,
    }),
  ],
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss'],
  },
});
