import router from './router';
import store from '@/store';

router.beforeEach(async (to, from, next) => {
  // 设置路由缓存
  const fromKeepAlive = from.meta?.keepAlive || [];
  const toKeepAlive = to.meta?.keepAlive || [];

  if (fromKeepAlive.includes(to.name)) {
    await store.dispatch('app/addKeepAlive', from.name);
  } else {
    await store.dispatch('app/deleteKeepAlive', from.name);
  }
  if (!toKeepAlive.includes(from.name)) {
    await store.dispatch('app/deleteKeepAlive', to.name);
  }

  await store.dispatch('permission/generateRoutes');

  next();
});
