import { defineStore } from 'pinia';
import { getMenu } from '@/serivce/system';
import { syncRoutes, constantRoutes } from '@/router/routes';
import type { AppRouteRecordRaw, systemMenuType } from '#/router';
import { arrayToTree } from '@/utils';
import router from '@/router';

export interface userType {
  addRoute: AppRouteRecordRaw[];
  systemMenu: systemMenuType[];
}

const usePermissioStore = defineStore('permissionStore', {
  state: (): userType => ({
    addRoute: [],
    systemMenu: [],
  }),

  actions: {
    async getSystemMenu() {
      const result = await getMenu();
      const menus =
        result.data?.map((item: any) => ({
          ...item,
          hidden: item.hidden !== '0',
        })) || [];
      this.systemMenu = arrayToTree(menus);

      const routes = this.reRoutes(menus, syncRoutes);

      this.addRoute = routes;
      // 获取当前默认路由
      const currenRoutes = constantRoutes;

      routes.forEach((item) => {
        // has用于判断当前路由中是否已经具有，避免重复
        const has = currenRoutes.some((it) => it.path === item.path);
        if (!has) {
          currenRoutes.push(item);
        }
      });

      routes.forEach((item: any) => {
        router.addRoute(item);
      });

      return routes;
    },

    /**
     * 重置动态路由
     * @param menu 系统菜单，动态路由需要根据系统菜单获取
     * @param routes
     */
    reRoutes(menu: systemMenuType[], routes: AppRouteRecordRaw[]): AppRouteRecordRaw[] {
      const route: AppRouteRecordRaw[] = [];
      routes.forEach((item) => {
        if (menu.filter((f) => f.name === item.name).length) {
          const children: AppRouteRecordRaw[] = [];
          if (item.children && item.children.length) {
            children.push(...this.reRoutes(menu, item.children));
          }
          route.push({
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
