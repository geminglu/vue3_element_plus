<script lang="ts" setup>
import { computed, nextTick } from 'vue';
import HoverButton from '@/components/common/HoverButton/index.vue';
import useChatStore from '@/store/modules/chat';
import { chatDrawer } from '@/hooks/useBasicLayout';

interface Props {
  usingContext: boolean;
}

interface Emit {
  (ev: 'export'): void;
  (ev: 'handleClear'): void;
}

defineProps<Props>();

const emit = defineEmits<Emit>();

const chatStore = useChatStore();
const currentChatHistory = computed(() => chatStore.getChatHistoryByCurrentActive);

function onScrollToTop() {
  const scrollRef = document.querySelector('#scrollRef');
  if (scrollRef) nextTick(() => (scrollRef.scrollTop = 0));
}

function handleExport() {
  emit('export');
}

function handleClear() {
  emit('handleClear');
}
</script>

<template>
  <header
    class="sticky top-0 left-0 right-0 z-30 border-b dark:border-neutral-800 bg-white/80 dark:bg-black/20 backdrop-blur"
  >
    <div class="relative flex items-center justify-between min-w-0 overflow-hidden h-14">
      <div class="flex items-center">
        <button
          class="flex items-center justify-center w-11 h-11"
          @click="chatDrawer = !chatDrawer"
        >
          <span v-if="!chatDrawer" class="iconfont icon-a-yousuojin3x s_collapse" />
          <span v-else class="iconfont icon-a-zuosuojin3x s_collapse" />
        </button>
      </div>
      <h1
        class="flex-1 px-4 pr-6 overflow-hidden cursor-pointer select-none text-ellipsis whitespace-nowrap"
        @dblclick="onScrollToTop"
      >
        {{ currentChatHistory?.title ?? '' }}
      </h1>
      <div class="flex items-center space-x-2">
        <HoverButton @click="handleExport">
          <span class="text-xl text-[#4f555e] dark:text-white iconfont icon-download" />
        </HoverButton>
        <HoverButton @click="handleClear">
          <span class="text-xl text-[#4f555e] dark:text-white iconfont icon-delete" />
        </HoverButton>
      </div>
    </div>
  </header>
</template>

<style scoped lang="less">
.s_collapse {
  font-size: 22px;
}
</style>
