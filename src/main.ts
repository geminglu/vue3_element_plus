import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './global.less';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '../mock';

// main.js 开启mock 服务
// const { mockXHR } = require('../mock');
// mockXHR();

console.log(process.env);

const app = createApp(App);
app.use(ElementPlus);
app.use(store);
app.use(router);
app.mount('#app');
