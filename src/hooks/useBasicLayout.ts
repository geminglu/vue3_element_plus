import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { ref } from 'vue';

export const chatDrawer = ref(false);

export function useBasicLayout() {
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const isMobile = breakpoints.smaller('sm');

  function changeChatDrawer() {
    chatDrawer.value = !chatDrawer.value;
  }
  return { isMobile, chatDrawer, changeChatDrawer };
}
