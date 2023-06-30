import type { AppRouteRecordRaw } from '#/router';
import Layout from '@/layout/index.vue';

const modulesFiles = require.context('./modules', true, /\.ts$/);

/** 异步路由 */
export const syncRoutes: AppRouteRecordRaw[] = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  modules.push(...value.default);
  return modules;
}, []);

/**
 * 静态路由
 */
export const constantRoutes: Array<AppRouteRecordRaw> = [
  /** 登录页 */
  {
    path: '/signIn',
    name: 'SignIn',
    component: () => import('@/views/logIn/index.vue'),
  },
];
