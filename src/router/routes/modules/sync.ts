import type { AppRouteRecordRaw } from '#/router';
import Layout from '@/layout/index.vue';

const asyncRoutes: Array<AppRouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/menu',
    children: [
      {
        path: '/menu',
        component: () => import('@/views/menu/index.vue'),
        name: 'Menu',
      },
    ],
  },
];

export default asyncRoutes;
