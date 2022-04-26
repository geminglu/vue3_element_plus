import { createStore } from 'vuex';
import getters from './getters';

const modulesFiles = require.context('./modules', true, /\.js$/);

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  modules[moduleName] = value.default;
  return modules;
}, {});

export default createStore({
  getters,
  mutations: {},
  actions: {},
  modules,
});
