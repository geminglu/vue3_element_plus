import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import enUS from './en-US';
import koKR from './ko-KR';
import zhCN from './zh-CN';
import zhTW from './zh-TW';
import ruRU from './ru-RU';
import store from '@/store/index';
import useAppStore from '@/store/modules/app';
import type { LanguageType } from '@/store/modules/app';

const i18n = createI18n({
  fallbackLocale: 'en-US',
  allowComposition: true,
  messages: {
    'en-US': enUS,
    'ko-KR': koKR,
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    'ru-RU': ruRU,
  },
});

export const t = i18n.global.t;

export function setLocale(locale: LanguageType) {
  i18n.global.locale = locale;
}

export function setupI18n(app: App) {
  const appStore = useAppStore(store);
  const defaultLocale = appStore.language || 'zh-CN';
  setLocale(defaultLocale);
  app.use(i18n);
}

export default i18n;
