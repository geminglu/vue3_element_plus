import type { AxiosProgressEvent, GenericAbortSignal } from 'axios';
import { request } from '@/utils/request';
import useChatStore from '@/store/modules/chat';
import type { SessionResponse } from '@/store/modules/chat';

export interface ConfigState {
  timeoutMs?: number;
  reverseProxy?: string;
  apiModel?: string;
  socksProxy?: string;
  httpsProxy?: string;
  usage?: string;
}

export function fetchChatAPI(
  prompt: string,
  options?: { conversationId?: string; parentMessageId?: string },
  signal?: GenericAbortSignal
) {
  return request({
    method: 'post',
    url: '/chat',
    data: { prompt, options },
    signal,
  });
}

export function fetchChatConfig() {
  return request<ConfigState>({
    method: 'post',
    url: '/config',
  });
}

export function fetchChatAPIProcess(params: {
  prompt: string;
  options?: { conversationId?: string; parentMessageId?: string };
  signal?: GenericAbortSignal;
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
}) {
  const authStore = useChatStore();

  let data: Record<string, any> = {
    prompt: params.prompt,
    options: params.options,
  };

  if (authStore.isChatGPTAPI) {
    data = {
      ...data,
      systemMessage: authStore.systemMessage,
      temperature: authStore.temperature,
      top_p: authStore.top_p,
    };
  }

  return request<Chat.ConversationResponse>({
    url: '/v1/chatGpt/chat-process',
    method: 'post',
    data,
    signal: params.signal,
    onDownloadProgress: params.onDownloadProgress,
  });
}

export function fetchSession() {
  return request<SessionResponse>({
    url: '/session',
    method: 'post',
  });
}

export function fetchVerify(token: string) {
  return request({
    url: '/verify',
    method: 'post',
    data: { token },
  });
}
