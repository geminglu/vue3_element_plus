<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';

const Setting = defineAsyncComponent(() => import('@/views/chat/components/Setting/index.vue'));

const show = ref(false);
</script>

<template>
  <footer class="f">
    <HoverButton @click="show = true">
      <span class="text-xl text-[#4f555e] dark:text-white">
        <span class="iconfont icon-s-tools"></span>
      </span>
    </HoverButton>

    <Setting v-if="show" v-model:visible="show" />
  </footer>
</template>

<style scoped lang="less">
.f {
  padding: 12px;
  border-top: 1px solid var(--el-border-color-lighter);
}
</style>
