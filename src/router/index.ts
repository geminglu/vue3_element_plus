import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { constantRoutes } from './routes';
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes as unknown as RouteRecordRaw[],
});

export default router;
