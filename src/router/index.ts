import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Layout,
    meta: { hidden: false },
  },
  {
    path: '/:path(.*)',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: { hidden: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { hidden: true },
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
    },
    children: [
      {
        path: 'page',
        component: () => import('../views/permission/page.vue'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
        },
      },
      {
        path: 'directive',
        component: () => import('../views/permission/directive.vue'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission',
        },
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role.vue'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
        },
      },
    ],
  },
  {
    path: '/icon',
    name: 'icon',
    component: Layout,
    meta: { title: 'icon', icon: 'icon' },
    children: [
      {
        path: 'index',
        component: () => import('../views/icons/index.vue'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon' },
      },
    ],
  },
  {
    path: '/2',
    name: '2',
    component: Layout,
    meta: {
      title: '2',
      icon: 'lock',
    },
    children: [
      {
        path: '2.1',
        name: '2.1',
        component: () => import('../views/icons/index.vue'),
        meta: {
          title: '2.1',
          icon: 'lock',
        },
        children: [
          {
            path: '2.1.1',
            name: '2.1.1',
            component: () => import('@/views/permission/role.vue'),
            meta: {
              title: '2.1.1',
              icon: 'lock',
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
