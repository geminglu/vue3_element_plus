<template>
  <div class="flex flex-col w-full h-full">
    <HeaderComponent
      v-if="isMobile"
      :using-context="usingContext"
      @export="handleExport"
      @handle-clear="handleClear"
    />
    <main class="flex-1 overflow-hidden">
      <div id="scrollRef" ref="scrollRef" class="h-full overflow-hidden overflow-y-auto">
        <!-- <el-scrollbar> -->
        <div
          id="image-wrapper"
          class="w-full max-w-screen-xl m-auto dark:bg-[#101014]"
          :class="[isMobile ? 'p-2' : 'p-4']"
        >
          <div
            v-if="!dataSources.length"
            class="flex items-center justify-center mt-4 text-center text-neutral-300"
          >
            <span>Aha~</span>
          </div>
          <div v-else>
            <Message
              v-for="(item, index) of dataSources"
              :key="index"
              :date-time="item.dateTime"
              :text="item.text"
              :inversion="item.inversion"
              :error="item.error"
              :loading="item.loading"
              @regenerate="onRegenerate(index)"
              @delete="handleDelete(index)"
            />
            <div class="sticky bottom-0 left-0 flex justify-center">
              <el-button v-if="loading" type="warning" plain @click="handleStop">
                <span class="iconfont icon-stop" />&nbsp;
                {{ t('common.stopResponding') }}
              </el-button>
            </div>
          </div>
        </div>
        <!-- </el-scrollbar> -->
      </div>
    </main>
    <footer :class="footerClass">
      <div class="w-full max-w-screen-xl m-auto">
        <div class="flex items-center justify-between space-x-2">
          <HoverButton v-if="!isMobile" @click="handleClear" :title="t('chat.clearChat')">
            <span class="text-xl text-[#4f555e] dark:text-white iconfont icon-delete" />
          </HoverButton>
          <HoverButton v-if="!isMobile" @click="handleExport" :title="t('chat.exportImage')">
            <span class="text-xl text-[#4f555e] dark:text-white iconfont icon-download" />
          </HoverButton>
          <HoverButton @click="toggleUsingContext">
            <span
              :class="{ 'text-[#4b9e5f]': usingContext, 'text-[#a8071a]': !usingContext }"
              class="text-xl iconfont icon-chat-history-line"
            />
          </HoverButton>
          <el-autocomplete
            fit-input-width
            class="autocomplete"
            ref="inputRef"
            v-model="prompt"
            :fetch-suggestions="querySearch"
            type="textarea"
            :placeholder="placeholder"
            :autosize="{ minRows: 1, maxRows: isMobile ? 4 : 8 }"
            @keypress="handleEnter"
          >
            <template #default="{ item }">
              <span>{{ item.label }}</span>
            </template>
          </el-autocomplete>
          <el-button
            style="height: 35px"
            type="primary"
            :title="t('common.send')"
            :disabled="buttonDisabled"
            @click="handleSubmit"
          >
            <span class="text-xl iconfont icon-send" />
          </el-button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { ElMessage, ElMessageBox } from 'element-plus';
import html2canvas from 'html2canvas';
import { Message } from './components';
import { useScroll } from './hooks/useScroll';
import { useChat } from './hooks/useChat';
import { useUsingContext } from './hooks/useUsingContext';
import { useBasicLayout } from '@/hooks/useBasicLayout';
import useChatStore from '@/store/modules/chat';
import usePromptStore from '@/store/modules/prompt';
import { fetchChatAPIProcess } from '@/serivce/chat';
import { t } from '@/locales';
import HoverButton from '@/components/common/HoverButton/index.vue';
import HeaderComponent from './components/Header/index.vue';

defineOptions({
  name: 'Chat',
});
let controller = new AbortController();

const openLongReply = process.env.VITE_GLOB_OPEN_LONG_REPLY === 'true';

const route = useRoute();
// const dialog = useDialog();
const ms = ElMessage;

const chatStore = useChatStore();

const { isMobile } = useBasicLayout();
const { addChat, updateChat, updateChatSome, getChatByUuidAndIndex } = useChat();
const { scrollRef, scrollToBottom, scrollToBottomIfAtBottom } = useScroll();
const { usingContext, toggleUsingContext } = useUsingContext();

const { uuid } = route.params as { uuid: string };

const dataSources = computed(() => chatStore.getChatByUuid(+uuid));
const conversationList = computed(() =>
  dataSources.value.filter((item) => !item.inversion && !!item.conversationOptions)
);

const prompt = ref<string>('');
const loading = ref<boolean>(false);
const inputRef = ref<Ref | null>(null);

// 添加PromptStore
const promptStore = usePromptStore();

// 使用storeToRefs，保证store修改后，联想部分能够重新渲染
const { promptList: promptTemplate } = storeToRefs<any>(promptStore);

// 未知原因刷新页面，loading 状态不会重置，手动重置
dataSources.value.forEach((item, index) => {
  if (item.loading) updateChatSome(+uuid, index, { loading: false });
});

function handleSubmit() {
  onConversation();
}

async function onConversation() {
  let message = prompt.value;

  if (loading.value) return;

  if (!message || message.trim() === '') return;

  controller = new AbortController();

  addChat(+uuid, {
    dateTime: new Date().toLocaleString(),
    text: message,
    inversion: true,
    error: false,
    conversationOptions: null,
    requestOptions: { prompt: message, options: null },
  });
  scrollToBottom();

  loading.value = true;
  prompt.value = '';

  let options: Chat.ConversationRequest = {};
  const lastContext =
    conversationList.value[conversationList.value.length - 1]?.conversationOptions;

  if (lastContext && usingContext.value) options = { ...lastContext };

  addChat(+uuid, {
    dateTime: new Date().toLocaleString(),
    text: '',
    loading: true,
    inversion: false,
    error: false,
    conversationOptions: null,
    requestOptions: { prompt: message, options: { ...options } },
  });
  scrollToBottom();

  try {
    let lastText = '';
    const fetchChatAPIOnce = async () => {
      await fetchChatAPIProcess({
        prompt: message,
        options,
        signal: controller.signal,
        onDownloadProgress: ({ event }) => {
          const xhr = event.target;
          const { responseText } = xhr;
          // Always process the final line
          const lastIndex = responseText.lastIndexOf('\n', responseText.length - 2);
          let chunk = responseText;
          if (lastIndex !== -1) chunk = responseText.substring(lastIndex);
          try {
            const data = JSON.parse(chunk);
            updateChat(+uuid, dataSources.value.length - 1, {
              dateTime: new Date().toLocaleString(),
              text: lastText + (data.text ?? ''),
              inversion: false,
              error: false,
              loading: true,
              conversationOptions: {
                conversationId: data.conversationId,
                parentMessageId: data.id,
              },
              requestOptions: { prompt: message, options: { ...options } },
            });

            if (openLongReply && data.detail.choices[0].finish_reason === 'length') {
              options.parentMessageId = data.id;
              lastText = data.text;
              message = '';
              return fetchChatAPIOnce();
            }

            scrollToBottomIfAtBottom();
          } catch (error) {
            //
          }
        },
      });
      updateChatSome(+uuid, dataSources.value.length - 1, { loading: false });
    };

    await fetchChatAPIOnce();
  } catch (error: any) {
    const errorMessage = error?.message ?? t('common.wrong');

    if (error.message === 'canceled') {
      updateChatSome(+uuid, dataSources.value.length - 1, {
        loading: false,
      });
      scrollToBottomIfAtBottom();
      return;
    }

    const currentChat = getChatByUuidAndIndex(+uuid, dataSources.value.length - 1);

    if (currentChat?.text && currentChat.text !== '') {
      updateChatSome(+uuid, dataSources.value.length - 1, {
        text: `${currentChat.text}\n[${errorMessage}]`,
        error: false,
        loading: false,
      });
      return;
    }

    updateChat(+uuid, dataSources.value.length - 1, {
      dateTime: new Date().toLocaleString(),
      text: errorMessage,
      inversion: false,
      error: true,
      loading: false,
      conversationOptions: null,
      requestOptions: { prompt: message, options: { ...options } },
    });
    scrollToBottomIfAtBottom();
  } finally {
    loading.value = false;
  }
}

async function onRegenerate(index: number) {
  if (loading.value) return;

  controller = new AbortController();

  const { requestOptions } = dataSources.value[index];

  let message = requestOptions?.prompt ?? '';

  let options: Chat.ConversationRequest = {};

  if (requestOptions.options) options = { ...requestOptions.options };

  loading.value = true;

  updateChat(+uuid, index, {
    dateTime: new Date().toLocaleString(),
    text: '',
    inversion: false,
    error: false,
    loading: true,
    conversationOptions: null,
    requestOptions: { prompt: message, options: { ...options } },
  });

  try {
    let lastText = '';
    const fetchChatAPIOnce = async () => {
      await fetchChatAPIProcess({
        prompt: message,
        options,
        signal: controller.signal,
        onDownloadProgress: ({ event }) => {
          const xhr = event.target;
          const { responseText } = xhr;
          // Always process the final line
          const lastIndex = responseText.lastIndexOf('\n', responseText.length - 2);
          let chunk = responseText;
          if (lastIndex !== -1) chunk = responseText.substring(lastIndex);
          try {
            const data = JSON.parse(chunk);
            updateChat(+uuid, index, {
              dateTime: new Date().toLocaleString(),
              text: lastText + (data.text ?? ''),
              inversion: false,
              error: false,
              loading: true,
              conversationOptions: {
                conversationId: data.conversationId,
                parentMessageId: data.id,
              },
              requestOptions: { prompt: message, options: { ...options } },
            });

            if (openLongReply && data.detail.choices[0].finish_reason === 'length') {
              options.parentMessageId = data.id;
              lastText = data.text;
              message = '';
              return fetchChatAPIOnce();
            }
          } catch (error) {
            //
          }
        },
      });
      updateChatSome(+uuid, index, { loading: false });
    };
    await fetchChatAPIOnce();
  } catch (error: any) {
    if (error.message === 'canceled') {
      updateChatSome(+uuid, index, {
        loading: false,
      });
      return;
    }

    const errorMessage = error?.message ?? t('common.wrong');

    updateChat(+uuid, index, {
      dateTime: new Date().toLocaleString(),
      text: errorMessage,
      inversion: false,
      error: true,
      loading: false,
      conversationOptions: null,
      requestOptions: { prompt: message, options: { ...options } },
    });
  } finally {
    loading.value = false;
  }
}

/**
 * 保存会话到图片
 */
function handleExport() {
  if (loading.value) return;
  ElMessageBox.confirm(t('chat.exportImage'), t('chat.exportImageConfirm'), {
    confirmButtonText: t('common.yes'),
    cancelButtonText: t('common.no'),
    draggable: true,
    type: 'warning',
  }).then(async () => {
    try {
      const ele = document.getElementById('image-wrapper');
      const canvas = await html2canvas(ele as HTMLDivElement, {
        // useCORS: true,
        scale: 2,
      });
      const imgUrl = canvas.toDataURL('image/png');
      const tempLink = document.createElement('a');
      tempLink.style.display = 'none';
      tempLink.href = imgUrl;
      tempLink.setAttribute('download', 'chat-shot.png');
      if (typeof tempLink.download === 'undefined') tempLink.setAttribute('target', '_blank');

      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(imgUrl);
      ms.success(t('chat.exportSuccess'));
      Promise.resolve();
    } catch (error: any) {
      ms.error(t('chat.exportFailed'));
    }
  });
}

function handleDelete(index: number) {
  if (loading.value) return;
  ElMessageBox.confirm(t('chat.deleteMessageConfirm'), t('chat.deleteMessage'), {
    confirmButtonText: t('common.yes'),
    cancelButtonText: t('common.no'),
    draggable: true,
    type: 'warning',
  }).then(() => {
    chatStore.deleteChatByUuid(+uuid, index);
  });
}

/**
 * 清空会话
 */
function handleClear() {
  if (loading.value) return;
  ElMessageBox.confirm(t('chat.clearChatConfirm'), t('chat.clearChat'), {
    confirmButtonText: t('common.yes'),
    cancelButtonText: t('common.no'),
    draggable: true,
    type: 'warning',
  }).then(() => {
    chatStore.clearChatByUuid(+uuid);
  });
}

function handleEnter(event: KeyboardEvent) {
  if (!isMobile.value) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  } else {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault();
      handleSubmit();
    }
  }
}

function handleStop() {
  if (loading.value) {
    controller.abort();
    loading.value = false;
  }
}

const querySearch = (queryString: string, cb: any) => {
  let results = [];
  if (queryString.startsWith('/')) {
    results = promptTemplate.value
      .filter((item: { key: string }) =>
        item.key.toLowerCase().includes(prompt.value.substring(1).toLowerCase())
      )
      .map((obj: { value: any; key: string }) => {
        return {
          label: obj.key,
          value: obj.value,
        };
      });
  } else {
    results = [];
  }
  cb(results);
};

const placeholder = computed(() => {
  if (isMobile.value) return t('chat.placeholderMobile');
  return t('chat.placeholder');
});

const buttonDisabled = computed(() => {
  return loading.value || !prompt.value || prompt.value.trim() === '';
});

const footerClass = computed(() => {
  let classes = ['p-4'];
  if (isMobile.value)
    classes = ['sticky', 'left-0', 'bottom-0', 'right-0', 'p-2', 'pr-3', 'overflow-hidden'];
  return classes;
});

onMounted(() => {
  scrollToBottom();
  if (inputRef.value && !isMobile.value) inputRef.value?.focus();
});

onUnmounted(() => {
  if (loading.value) controller.abort();
});

chatStore.getSession();
</script>

<style scoped lang="less">
:deep(.autocomplete) {
  flex: 1;
  textarea {
    min-height: 35px !important;
    resize: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
