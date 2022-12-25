import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { hidden: true },
  },
  {
    path: '/',
    name: 'Index',
    component: Layout,
    redirect: '/dashboard',
    meta: { hidden: false, icon: 'icon-message-center' },
    children: [
      {
        path: '/dashboard',
        component: () => import('../views/Index.vue'),
        meta: { title: 'dashboard', hidden: false },
      },
    ],
  },
];

export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    name: 'Permission',
    meta: { title: 'Permission', icon: 'icon-order' },
    children: [
      {
        path: 'page',
        component: () => import('../views/permission/page.vue'),
        name: 'PagePermission',
        meta: { title: 'Page Permission' },
      },
      {
        path: 'directive',
        component: () => import('../views/permission/directive.vue'),
        name: 'DirectivePermission',
        meta: { title: 'Directive Permission' },
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role.vue'),
        name: 'RolePermission',
        meta: { title: 'Role Permission' },
      },
    ],
  },
  {
    path: '/icon',
    name: 'icon',
    component: Layout,
    meta: { title: 'icon', icon: 'icon-price' },
    children: [
      {
        path: 'index',
        component: () => import('../views/icons/index.vue'),
        name: 'Icons',
        meta: { title: 'Icons' },
      },
    ],
  },
  {
    path: '/2',
    name: '2',
    component: Layout,
    meta: {
      title: '2',
      icon: 'icon-supplier-ship',
    },
    children: [
      {
        path: '2.1',
        name: '2.1',
        component: () => import('../views/icons/index.vue'),
        meta: {
          title: '2.1',
          icon: 'icon-logistics-track',
        },
        children: [
          {
            path: '2.1.1',
            name: '2.1.1',
            component: () => import('@/views/permission/role.vue'),
            meta: {
              title: '2.1.1',
              icon: 'icon-payable',
            },
            children: [
              {
                path: '2.1.1.1',
                name: '2.1.1.1',
                meta: { title: '2.1.1.1' },
                component: () => import('../views/permission/page.vue'),
              },
              {
                path: '2.1.1.2',
                name: '2.1.1.2',
                meta: { title: '2.1.1.2' },
                component: () => import('../views/permission/page.vue'),
              },
            ],
          },
        ],
      },
      {
        path: '2.2',
        name: '2.2',
        meta: { title: '2.2' },
        component: () => import('../views/permission/page.vue'),
      },
      {
        path: '2.3',
        name: '2.3',
        meta: { title: '2.2' },
        component: () => import('../views/permission/page.vue'),
      },
    ],
  },
  {
    path: '/utils',
    name: 'utils',
    component: Layout,
    redirect: '/utils/decimalJs',
    meta: { title: 'utils', icon: 'icon-price' },
    children: [
      {
        path: 'decimalJs',
        component: () => import('../views/utils/decimalJs/index.vue'),
        name: 'decimalJs',
        meta: { title: 'decimalJs' },
      },
      {
        path: 'echarts',
        component: () => import('../views/echarts/index.vue'),
        name: 'echarts',
        meta: { title: 'echarts' },
      },
      {
        path: 'antv',
        component: () => import('../views/utils/antv/index.vue'),
        name: 'antv',
        meta: { title: 'antv' },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes,
});

export default router;
