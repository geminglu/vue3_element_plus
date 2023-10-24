<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import List from './List.vue';
import Footer from './Footer.vue';
import useAppStore from '@/store/modules/app';
import useChatStore from '@/store/modules/chat';
import { useBasicLayout } from '@/hooks/useBasicLayout';
import { t } from '@/locales';
import PromptStore from '@/components/common/PromptStore/index.vue';

defineOptions({
  name: 'Chatsider',
});

const appStore = useAppStore();
const chatStore = useChatStore();

const { isMobile } = useBasicLayout();
const show = ref(false);

const collapsed = computed(() => appStore.siderCollapsed);

function handleAdd() {
  chatStore.addHistory({ title: 'New Chat', uuid: Date.now(), isEdit: false });
  if (isMobile.value) appStore.setSiderCollapsed(true);
}

function handleUpdateCollapsed() {
  appStore.setSiderCollapsed(!collapsed.value);
}

const mobileSafeArea = computed(() => {
  if (isMobile.value) {
    return {
      paddingBottom: 'env(safe-area-inset-bottom)',
    };
  }
  return {};
});
</script>

<template>
  <div class="sider" :class="collapsed && !isMobile ? 'sider_act' : ''">
    <div class="flex flex-col h-full sl" :style="mobileSafeArea">
      <main class="flex flex-col flex-1 min-h-0">
        <div class="p-4">
          <el-button class="add_chat" size="large" plain @click="handleAdd">
            {{ t('chat.newChatButton') }}
          </el-button>
        </div>
        <div class="flex-1 min-h-0 pb-4 overflow-hidden">
          <List />
        </div>
        <div class="p-4">
          <el-button plain @click="show = true" size="large" style="width: 100%">
            {{ t('store.siderButton') }}
          </el-button>
        </div>
      </main>
      <Footer />
    </div>
    <PromptStore v-model:visible="show" />
    <span
      v-if="!isMobile"
      class="iconfont icon-zhankai zhankai"
      :class="collapsed ? 'zhankai_act' : ''"
      @click="handleUpdateCollapsed"
    />
  </div>
</template>

<style scoped lang="less">
.sider {
  display: flex;
  justify-content: flex-end;
  width: 260px;
  max-width: 260px;
  height: 100%;
  position: relative;
  // border-right: var(--el-border);
  transition: 0.25s;
  .add_chat {
    width: 100%;
    border: 1px dashed var(--el-color-primary);
  }
  .zhankai {
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%) rotateZ(90deg);
    height: 24px;
    width: 24px;
    line-height: 24px;
    border-radius: 50%;
    text-align: center;
    font-size: 14px;
    background: var(--el-fill-color-darker);
    cursor: pointer;
    transition: 0.25s;
  }
  .zhankai_act {
    transform: translate(50%, -50%) rotateZ(270deg);
  }
}
.sider_act {
  width: 0;
  border-right: transparent !important;
}
.sl {
  min-width: 260px;
}
</style>
