const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    onBeforeSetupMiddleware:
      process.env.VUE_APP_ENV === 'mock'
        ? require('./mock/mock-server')
        : () => {},
  },
});
