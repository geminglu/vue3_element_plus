import { createApp } from 'vue';
import './assets/icon/iconfont';
import './style/index.css';
import SvgIcon from '@/components/SvgIcon/index.vue';
import './components/SvgIcon/index';

const app = createApp(App);
app.component('svg-icon', SvgIcon);
app.mount('#app');
