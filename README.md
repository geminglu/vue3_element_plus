# vue3_element_plus

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 使用 webpack-bundle-analyzer 包分析包的小大

### 安装

```shell
yarn add -D webpack-bundle-analyzer

```

### 配置 vue.config.vue

```js
chainWebpack: (config) => {
  if (process.env.use_analyzer) {
    config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin);
  }
};
```

### 配置 packge.json > script
```json
  "scripts": {
    "analyzer": "cross-env use_analyzer=true npm run build"
  },

```

## FQA

1. 如果要在项目中使用 import 引入 path 就要安装`path-browserify` 依赖。

```shell
yarn add path-browserify
```

然后在`vue.config.js` 中配置

```js
resolve: {
  fallback: { path: require.resolve('path-browserify') },
},
```
