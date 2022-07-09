import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './permission';
import './style/global.less';
import './style/index.css';
import './assets/icon/iconfont';
import PageHeaderWrapper from './components/PageHeaderWrapper/index.vue';

const app = createApp(App);
app.use(store);
app.use(router);
app.component('page-header-wrapper', PageHeaderWrapper);
app.mount('#app');
