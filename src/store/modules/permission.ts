import { defineStore } from 'pinia';
import { getMenu } from '@/serivce/system';
import { syncRoutes, constantRoutes } from '@/router/routes';
import { arrayToTree, flattenTree } from '@/utils';
import router from '@/router';
import type { AppRouteRecordRaw, systemMenuType } from '#/router';

export interface userType {
  addRoute: AppRouteRecordRaw[];
  systemMenu: systemMenuType[];
  flattenConstantRoutes: AppRouteRecordRaw[];
}

const usePermissioStore = defineStore('permissionStore', {
  state: (): userType => ({
    addRoute: [],
    systemMenu: [],
    /**
     * 静态路由平铺的数据
     */
    flattenConstantRoutes: [],
  }),

  actions: {
    async getSystemMenu() {
      this.flattenConstantRoutes = flattenTree(constantRoutes);

      let menus = [];
      try {
        const result = await getMenu();
        menus =
          result.data?.map((item: any) => ({
            ...item,
            hidden: item.hidden !== '0',
          })) || [];
      } catch (error) {}
      this.systemMenu = arrayToTree(menus);

      const routes = this.reRoutes(menus, syncRoutes);

      this.addRoute = routes;

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
        // 验证一步路由在菜单中存在后在静态路由中存在
        if (
          menu.map((i) => i.name).includes(item.name) ||
          this.flattenConstantRoutes.map((i) => i.name).includes(item.name)
        ) {
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
