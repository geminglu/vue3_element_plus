import type { Router, RouteRecordRaw, RouteLocationNormalized } from 'vue-router';
import usePermissioStore from '@/store/modules/permission';
import useUserStore from '@/store/modules/user';
import NProgress from '@/utils/nprogress';
import store from '@/store';
import useAppStore from '@/store/modules/app';

export default function routerGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const userStore = useUserStore(store);
    const permissioStore = usePermissioStore();

    if (to.name === 'SignIn') {
      next();
      return;
    }

    // 如果已经登陆并且没有菜单就要获取菜单
    if (permissioStore.systemMenu === null && userStore.access_token) {
      await permissioStore.getSystemMenu();

      const { name, ...res } = to;
      next({ ...res, replace: true });
      return;
    }
    // 设置路由缓存
    const appStore = useAppStore();

    // 自动缓存配置
    if (from.meta?.keepAlive instanceof Array && to.name) {
      if (from.meta.keepAlive.includes(to.name as string)) {
        appStore.setkeepAlives(from.name as string);
      } else {
        appStore.delkeepAlives(from.name as string);
      }
    } else if (typeof from.meta?.keepAlive === 'boolean' && from.meta?.keepAlive) {
      appStore.setkeepAlives(from.name as string);
    } else if (typeof from.meta?.keepAlive === 'boolean' && !from.meta?.keepAlive) {
      appStore.delkeepAlives(from.name as string);
    }

    if (to.meta?.keepAlive instanceof Array) {
      if (!to.meta?.keepAlive.includes(from.name as string)) {
        appStore.delkeepAlives(to.name as string);
      }
    }

    next();
  });

  router.afterEach((to, from, next) => {
    NProgress.done();
  });
}
