import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './style/global.less';
import './style/index.css';
import './assets/icon/iconfont';
import PageHeaderWrapper from './components/PageHeaderWrapper/index.vue';
import SvgIcon from '@/components/SvgIcon/index.vue';

const app = createApp(App);
app.component('svg-icon', SvgIcon);

app.use(store);
app.use(router);
app.component('page-header-wrapper', PageHeaderWrapper);
app.mount('#app');
