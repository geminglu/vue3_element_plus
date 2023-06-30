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
      {
        path: '/userList',
        name: 'UserManage',
        component: () => import('@/views/userManage/index.vue'),
      },
      {
        path: 'createPage',
        component: () => import('@/views/construct/createPage/index.vue'),
        name: 'CreatePage',
        meta: { title: '创建页面', icon: 'icon-order' },
      },
    ],
  },
];

export default asyncRoutes;
