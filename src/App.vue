<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { watch } from 'vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { useDark } from '@vueuse/core';
import { darkChange } from '@/layout/hooks/useThemeChange';
import useUserStore from '@/store/modules/user.ts';

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

useStore.verifyAccessToekn();
</script>
