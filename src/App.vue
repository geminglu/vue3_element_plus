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
</script>
