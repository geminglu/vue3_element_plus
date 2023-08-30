import { defineStore } from 'pinia';

export type LanguageType = 'zh-CN' | 'zh-TW' | 'en-US' | 'ko-KR' | 'ru-RU';

export interface appType {
  /** 菜单是否展开 */
  menuCollapse: boolean;
  /**
   * 被缓存起来的路由组件
   */
  keepAlives: string[];
  /** 主题色 */
  themeColor: string;
  /** 主题色名称 */
  themeColorName: string;
  language: LanguageType;
  /** 聊天面板展开与折叠 */
  siderCollapsed: boolean;
}

const { themeColor, themeColorName } = JSON.parse(localStorage.getItem('appStore') || '{}');

const useAppStore = defineStore('appStore', {
  state: (): appType => ({
    menuCollapse: true,
    siderCollapsed: true,
    keepAlives: [],
    themeColor: themeColor || '#1b2a47',
    themeColorName: themeColorName || 'default',
    language: 'zh-CN',
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

    /**
     * 设置主题
     */
    setColorChange(themeColor: string, themeColorName?: string) {
      this.themeColor = themeColor;
      this.themeColorName = themeColorName || 'custom';
    },

    setLanguage(language: LanguageType) {
      if (this.language !== language) {
        this.language = language;
      }
    },

    setSiderCollapsed(collapsed: boolean) {
      this.siderCollapsed = collapsed;
    },
  },
});

export default useAppStore;
