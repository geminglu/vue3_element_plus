import type { Router, RouteRecordRaw } from 'vue-router';
import usePermissioStore from '@/store/modules/permission';
import useUserStore from '@/store/modules/user';
import NProgress from '@/utils/nprogress';
import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import useAppStore from '@/store/modules/app';
import asyncRoutes from './routes/modules/sync';

export default function routerGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const userStore = useUserStore(store);
    const permissioStore = usePermissioStore();

    if (to.name === 'SignIn') {
      next();
      return;
    }

    // 如果当前路由名称是NotFound并且在动态路由中存在就跳转到登录页面
    // 如果这条路由要是在动态路由中存在并且路由名称为NotFound说明这条路由还没有加载，也就是用户还没有登录，需要跳转到登录页完成登录
    if (to.name === 'NotFound' && !userStore.access_token) {
      const routes = createRouter({
        routes: asyncRoutes as unknown as RouteRecordRaw[],
        history: createWebHistory(),
      }).getRoutes();
      if (routes.filter((item) => item.path === to.path).length) {
        next({ name: 'SignIn', query: { to: to.path } });
        return;
      }
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
