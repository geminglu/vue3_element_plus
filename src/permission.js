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

  if (!store.getters.addRoutes.length) {
    const asyncRoutes = await store.dispatch('permission/generateRoutes');
    asyncRoutes.forEach((item) => {
      router.addRoute(item);
    });
    router.addRoute({
      path: '/:path(.*)',
      name: 'NotFound',
      component: () => import('./views/NotFound.vue'),
      meta: { hidden: true },
    });
    next({ ...to, replace: true });
  } else {
    next();
  }
});
