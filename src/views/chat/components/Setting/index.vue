<script setup lang="ts">
import { computed, ref } from 'vue';
import General from './General.vue';
import Advanced from './Advanced.vue';
import About from './About.vue';
import useChatStore from '@/store/modules/chat';
import Modal from '@/components/baseUi/modal/BaseModal.vue';
import { t } from '@/locales/index';

interface Props {
  visible: boolean;
}

interface Emit {
  (e: 'update:visible', visible: boolean): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emit>();

const chatStore = useChatStore();

const isChatGPTAPI = computed<boolean>(() => !!chatStore.isChatGPTAPI);

const active = ref('General');

const show = computed({
  get() {
    return props.visible;
  },
  set(visible: boolean) {
    emit('update:visible', visible);
  },
});
</script>

<template>
  <Modal v-model="show" title=" " draggable :is-show-footer="false">
    <el-tabs v-model="active" type="card">
      <el-tab-pane :label="t('setting.general')" name="General">
        <div class="min-h-[100px]">
          <General />
        </div>
      </el-tab-pane>
      <el-tab-pane :label="t('setting.advanced')" name="Advanced">
        <div class="min-h-[100px]">
          <Advanced /></div
      ></el-tab-pane>
      <el-tab-pane :label="t('setting.config')" name="Config"><About /></el-tab-pane>
    </el-tabs>
  </Modal>
</template>
