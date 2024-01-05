import { computed } from 'vue';
import { t } from '@/locales';
import useChatStore from '@/store/modules/chat';
import { ElMessage } from 'element-plus';

export function useUsingContext() {
  const ms = ElMessage;
  const chatStore = useChatStore();
  const usingContext = computed<boolean>(() => chatStore.usingContext);

  function toggleUsingContext() {
    chatStore.setUsingContext(!usingContext.value);
    if (usingContext.value) ms.success(t('chat.turnOnContext'));
    else ms.warning(t('chat.turnOffContext'));
  }

  return {
    usingContext,
    toggleUsingContext,
  };
}