<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { useDark } from '@vueuse/core';
import { darkChange } from '@/layout/hooks/useThemeChange';
import useUserStore from '@/store/modules/user';
import useAppStore from '@/store/modules/app';

useDark();
watch(
  useDark(),
  () => {
    darkChange();
  },
  {
    immediate: true,
  }
);

const useStore = useUserStore();
const appStore = useAppStore();

useStore.verifyAccessToekn();

window.onresize = () => {
  resize();
};

// 判断是否可自动关闭菜单栏
let isAutoCloseSidebar = true;

function resize() {
  /** width app-wrapper类容器宽度
   * 0 < width <= 760 隐藏侧边栏
   * 760 < width <= 990 折叠侧边栏
   * width > 990 展开侧边栏
   */
  const width = document.body.clientWidth;
  if (width <= 760) {
    appStore.device = 'mobile';
    isAutoCloseSidebar = true;
  } else if (width > 760 && width <= 990) {
    if (isAutoCloseSidebar) {
      appStore.device = 'desktop';
      appStore.menuCollapse = true;
      isAutoCloseSidebar = false;
    }
  } else if (width > 990) {
    if (!isAutoCloseSidebar) {
      appStore.menuCollapse = false;
    }
    isAutoCloseSidebar = true;
    appStore.device = 'desktop';
  }
}
</script>
