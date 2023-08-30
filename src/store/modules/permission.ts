import { defineStore } from 'pinia';
import { getPermissionMenu } from '@/serivce/system';
import { syncRoutes, constantRoutes } from '@/router/routes';
import { arrayToTree, flattenTree } from '@/utils';
import router from '@/router';
import type { AppRouteRecordRaw, systemMenuType } from '#/router';

export interface userType {
  addRoute: AppRouteRecordRaw[];
  systemMenu: systemMenuType[] | null;
  flattenConstantRoutes: AppRouteRecordRaw[];
}

const usePermissioStore = defineStore('permissionStore', {
  state: (): userType => ({
    addRoute: [],
    systemMenu: null,
    /**
     * 静态路由平铺的数据
     */
    flattenConstantRoutes: [],
  }),

  actions: {
    async getSystemMenu() {
      this.flattenConstantRoutes = flattenTree(constantRoutes);

      let menus = [];
      const result = await getPermissionMenu();
      menus =
        result.data?.map((item: any) => ({
          ...item,
          hidden: item.hidden !== '0',
        })) || [];
      this.systemMenu = arrayToTree(menus);

      const routes = this.reRoutes(menus, syncRoutes);

      this.addRoute = routes;

      routes.forEach((item: any) => {
        router.addRoute(item);
      });
      return routes;
    },

    /**
     * 移除动态路由
     */
    removeRouter(routers?: AppRouteRecordRaw[]) {
      if (!routers) routers = this.addRoute;
      routers.forEach((item) => {
        // 如果这条路有属于静态路由就跳过
        if (!this.flattenConstantRoutes.map((i) => i.name).includes(item.name)) {
          router.removeRoute(item.name);
        } else if (item.children) {
          this.removeRouter(item.children);
        }
      });

      this.addRoute = [];
      this.systemMenu = null;
    },

    /**
     * 重置动态路由
     * @param menu 系统菜单，动态路由需要根据系统菜单获取
     * @param routes
     */
    reRoutes(menu: systemMenuType[], routes: AppRouteRecordRaw[]): AppRouteRecordRaw[] {
      const route: AppRouteRecordRaw[] = [];
      routes.forEach((item) => {
        // 验证异步路由在菜单中存在后在静态路由中存在
        const constantRoute = this.flattenConstantRoutes.filter((f) => f.name === item.name);
        if (menu.map((i) => i.name).includes(item.name) || constantRoute.length) {
          const children: AppRouteRecordRaw[] = [];
          if (item.children && item.children.length) {
            children.push(...this.reRoutes(menu, item.children));
          }
          route.push({
            ...constantRoute[0],
            ...item,
            children,
          });
        }
      });
      return route;
    },
  },
});

export default usePermissioStore;
