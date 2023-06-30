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
    if (!userStore.access_token) {
      next(`/signIn?to=${to.fullPath}`);
      return;
    }

    // 如果已经登陆并且没有菜单就要获取菜单
    if (!permissioStore.systemMenu.length && userStore.access_token) {
      await permissioStore.getSystemMenu();

      router.addRoute({
        path: '/:pathMatch(.*)',
        name: '404',
        component: () => import('@/views/404.vue'),
      });
      next({ ...to, replace: true });
      return;
    }

    next();
  });

  router.afterEach((to, from, next) => {
    NProgress.done();
  });
}
