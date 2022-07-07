const { defineConfig } = require('@vue/cli-service');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    onBeforeSetupMiddleware:
      process.env.VUE_APP_ENV === 'mock'
        ? require('./mock/mock-server')
        : () => {},
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
      fallback: { path: require.resolve('path-browserify') },
    },
    plugins: [
      // AutoImport({
      //   resolvers: [ElementPlusResolver()],
      // }),
      // Components({
      //   resolvers: [ElementPlusResolver()],
      // }),
    ],
  },
});
