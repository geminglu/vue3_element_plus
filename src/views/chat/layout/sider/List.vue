<script setup lang="ts">
import { computed } from 'vue';
import useAppStore from '@/store/modules/app';
import useChatStore from '@/store/modules/chat';
import { useBasicLayout } from '@/hooks/useBasicLayout';

const { isMobile } = useBasicLayout();

const appStore = useAppStore();
const chatStore = useChatStore();

const dataSources = computed(() => chatStore.history);

async function handleSelect({ uuid }: Chat.History) {
  if (isActive(uuid)) return;

  if (chatStore.active) chatStore.updateHistory(chatStore.active, { isEdit: false });
  await chatStore.setActive(uuid);
}

function handleEdit({ uuid }: Chat.History, isEdit: boolean, event?: MouseEvent) {
  event?.stopPropagation();
  chatStore.updateHistory(uuid, { isEdit });
}

function handleDelete(index: number, event?: MouseEvent | TouchEvent) {
  event?.stopPropagation();
  chatStore.deleteHistory(index);
}

function handleEnter({ uuid }: Chat.History, isEdit: boolean, event: KeyboardEvent) {
  event?.stopPropagation();
  if (event.key === 'Enter') chatStore.updateHistory(uuid, { isEdit });
}

function isActive(uuid: number) {
  return chatStore.active === uuid;
}
</script>

<template>
  <el-scrollbar class="px-4">
    <div class="flex flex-col gap-2 text-sm">
      <template v-if="!dataSources.length">
        <div class="flex flex-col items-center mt-4 text-center text-neutral-300">
          <span class="iconfont icon-zanwushuju" style="font-size: 34px; line-height: 1.5em"></span>
          <span>{{ $t('common.noData') }}</span>
        </div>
      </template>
      <template v-else>
        <div v-for="(item, index) of dataSources" :key="index">
          <a
            class="relative flex items-center gap-3 px-3 py-3 break-all border rounded-md cursor-pointer hover:bg-neutral-100 group dark:border-neutral-800 dark:hover:bg-[#24272e]"
            :class="isActive(item.uuid) && ['bg-neutral-100', 'dark:bg-[#24272e]', 'pr-14']"
            :style="
              isActive(item.uuid)
                ? { border: '1px solid var(--el-color-primary)', color: 'var(--el-color-primary)' }
                : ''
            "
            @click="handleSelect(item)"
          >
            <span class="iconfont icon-xingxi"></span>
            <div class="relative flex-1 overflow-hidden break-all text-ellipsis whitespace-nowrap">
              <el-input
                v-if="item.isEdit"
                v-model="item.title"
                size="small"
                @keypress="handleEnter(item, false, $event)"
              />
              <span v-else>{{ item.title }}</span>
            </div>
            <div v-if="isActive(item.uuid)" class="absolute z-10 flex visible right-1">
              <template v-if="item.isEdit">
                <button class="p-1" @click="handleEdit(item, false, $event)">
                  <span class="iconfont icon-baocun"></span>
                </button>
              </template>
              <template v-else>
                <button class="p-1" @click="handleEdit(item, true, $event)">
                  <span class="iconfont icon-edit"></span>
                </button>
                <el-popconfirm
                  :title="$t('chat.deleteHistoryConfirm')"
                  @confirm="handleDelete(index, $event)"
                >
                  <template #reference>
                    <button class="p-1">
                      <span class="iconfont icon-delete"></span>
                    </button>
                  </template>
                </el-popconfirm>
              </template>
            </div>
          </a>
        </div>
      </template>
    </div>
  </el-scrollbar>
</template>
