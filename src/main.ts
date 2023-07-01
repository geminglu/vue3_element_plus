import { createApp } from 'vue';
import './assets/icon/iconfont';
import 'element-plus/dist/index.css';
import './style/index.css';
import router from './router';
import './style/light.css';
import './style/dark.css';
import store from './store';
import SvgIcon from '@/components/SvgIcon/index.vue';
import './components/SvgIcon/index';
import App from './App.vue';

const app = createApp(App);
app.component('svg-icon', SvgIcon);

app.use(store);
app.use(router);
app.mount('#app');
