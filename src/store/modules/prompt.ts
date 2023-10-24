import { defineStore } from 'pinia';

export type PromptList = [];

export interface PromptStore {
  promptList: PromptList;
}

const usePromptStore = defineStore('prompt-store', {
  state: (): PromptStore => ({
    promptList: [],
  }),

  persist: true,

  actions: {
    updatePromptList(promptList: []) {
      this.$patch({ promptList });
    },
    getPromptList() {
      return this.$state;
    },
  },
});

export default usePromptStore;
