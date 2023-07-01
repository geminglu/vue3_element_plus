import { defineStore } from 'pinia';
export interface appType {
  /** 菜单是否展开 */
  menuCollapse: boolean;
  /**
   * 被缓存起来的路由组件
   */
  keepAlives: string[];
}

const useAppStore = defineStore('appStore', {
  state: (): appType => ({
    menuCollapse: true,
    keepAlives: [],
  }),
  persist: true,
  actions: {
    /**
     * 设置缓存
     */
    setkeepAlives(value: string) {
      !this.keepAlives.includes(value) && this.keepAlives.push(value);
    },

    /**
     * 删除缓存
     */
    delkeepAlives(value: string) {
      this.keepAlives.includes(value) && this.keepAlives.splice(this.keepAlives.indexOf(value), 1);
    },
  },
});

export default useAppStore;
