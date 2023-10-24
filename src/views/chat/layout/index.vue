<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Sider from './sider/index.vue';
import { useBasicLayout, chatDrawer } from '@/hooks/useBasicLayout';
import useChatStore from '@/store/modules/chat';

defineOptions({
  name: 'ChatLayout',
});

const router = useRouter();
const chatStore = useChatStore();

router.replace({ name: 'Chat', params: { uuid: chatStore.active } });

const { isMobile } = useBasicLayout();

const getMobileClass = computed(() => {
  if (isMobile.value) return ['rounded-none', 'shadow-none'];
  return ['border', 'rounded-md', 'shadow-md', 'dark:border-neutral-800'];
});
</script>

<template>
  <div class="h-full dark:bg-[#24272e] transition-all" :class="[isMobile ? 'p-0' : 'p-4']">
    <div class="h-full overflow-hidden dark:bg-[#101014]" :class="getMobileClass">
      <div class="z-40 transition h-full flex">
        <el-drawer
          v-if="isMobile"
          v-model="chatDrawer"
          direction="ltr"
          :with-header="false"
          destroy-on-close
          size="300px"
        >
          <Sider />
        </el-drawer>
        <Sider class="siders" v-else />
        <div class="h-full" style="flex: 1">
          <RouterView v-slot="{ Component, route }">
            <component :is="Component" :key="route.fullPath" />
          </RouterView>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.siders {
  border-right: var(--el-border);
}
</style>
