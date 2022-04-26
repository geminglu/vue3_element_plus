import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Laout from '@/layout/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Laout,
  },
  {
    path: '/:path(.*)',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
