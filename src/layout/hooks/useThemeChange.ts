import { ref } from 'vue';
import useAppStore from '@/store/modules/app';
import { useDark } from '@vueuse/core';
import { themeColorsType } from '../types';
import { darken, lighten } from '@/utils';

export const themeColors = ref<themeColorsType[]>([
  { color: '#1677ff', themeColor: 'default', lable: '道奇蓝' },
  { color: '#ffffff', themeColor: 'light', lable: '亮白色' },
  { color: '#f5222d', themeColor: 'dusk', lable: '猩红色' },
  { color: '#fa541c', themeColor: 'volcano', lable: '橙红色' },
  { color: '#fadb14', themeColor: 'yellow', lable: '金色' },
  { color: '#13c2c2', themeColor: 'mingQing', lable: '绿宝石' },
  { color: '#52c41a', themeColor: 'auroraGreen', lable: '酸橙绿' },
  { color: '#eb2f96', themeColor: 'pink', lable: '深粉色' },
  { color: '#722ed1', themeColor: 'saucePurple', lable: '深紫罗兰色' },
]);

/**
 * 切换主题色
 * @param color
 * @param colorName
 */
export function themeColorChange(color?: string, colorName?: string) {
  const appStore = useAppStore();
  let c = color;
  if (colorName === 'default' || colorName === 'light') {
    c = themeColors.value.filter((f) => f.themeColor === 'default')[0].color;
  }
  if (c) {
    appStore.setColorChange(c, colorName);
  } else {
    c = appStore.themeColor;
  }

  const colors = themeColors.value.map((item) => item.themeColor);
  for (const i of colors) {
    document.documentElement.classList.remove(i);
  }
  document.documentElement.classList.remove('customColor');
  document.documentElement.classList.add(colorName || 'customColor');

  document.documentElement.style.setProperty('--el-color-primary', c);
  for (let i = 1; i <= 2; i++) {
    setPropertyPrimary('dark', i, c);
  }
  for (let i = 1; i <= 9; i++) {
    setPropertyPrimary('light', i, c);
  }
}

/**
 * 切换暗黑模式
 */
export function darkChange() {
  setTimeout(() => {
    // 当切换到暗黑模式后为什么主题色为‘light’就把主题色切换到‘default’
    const appStore = useAppStore();
    if (useDark().value && appStore.themeColorName === 'light') {
      const color = themeColors.value.filter((item) => item.themeColor === 'default')[0];
      themeColorChange(color.color, color.themeColor);
    } else {
      themeColorChange(appStore.themeColor, appStore.themeColorName);
    }
  }, 0);
}

function setPropertyPrimary(mode: 'dark' | 'light', i: number, color: string) {
  if (mode === 'dark') {
    document.documentElement.style.setProperty(
      `--el-color-primary-${mode}-${i}`,
      !useDark().value ? darken(color, i / 11) : lighten(color, i / 11)
    );
  } else {
    document.documentElement.style.setProperty(
      `--el-color-primary-${mode}-${i}`,
      useDark().value ? darken(color, i / 11) : lighten(color, i / 11)
    );
  }
}
