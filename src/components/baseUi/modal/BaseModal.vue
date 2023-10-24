<template>
  <el-dialog
    v-model="visible"
    destroy-on-close
    :width="width"
    :show-close="false"
    :top="top"
    :before-close="handleClose"
    :fullscreen="isFullscreen"
    :draggable="draggable"
    :align-center="!top && alignCenter"
    @open="open"
    @opened="opened"
    @close="close"
    @closed="closed"
    @open-auto-focus="openAutoFocus"
    @close-auto-focus="closeAutoFocus"
    height="200px"
    class="base_modal"
    :class="isFullscreen ? '' : 'fullscreen_modal'"
    :close-on-click-modal="closeOnClickModal"
  >
    <template #header="{ close, titleId, titleClass }">
      <div class="header">
        <slot name="header" :close="close" :title-id="titleId" :title-class="titleClass" />
        <expandDom
          class="header_title"
          v-if="header && !$slots.header"
          :render="header"
          :params="{ close, titleId, titleClass }"
        />
        <h3 v-if="!header && !$slots.header" class="header_title">{{ title }}</h3>
        <div class="butgure">
          <template v-if="showFullscreen">
            <span
              v-if="isFullscreen"
              class="butitem iconfont icon-window-window_line"
              @click="handelFullscreen(false)"
            />
            <span
              v-else
              class="butitem iconfont icon-window-max_line"
              @click="handelFullscreen(true)"
            />
          </template>
          <span v-if="showClose" class="butitem iconfont icon-shanchu2" @click="close" />
        </div>
      </div>
    </template>
    <el-scrollbar class="modal_body">
      <slot />
      <expandDom v-if="body" :render="body" />
    </el-scrollbar>

    <template #footer v-if="isShowFooter">
      <slot v-if="$slots.footer" name="footer" />
      <expandDom v-else-if="footer" :render="footer" />
      <span v-else>
        <el-button type="primary" @click="handleConfirm" :loading="confirmLoading">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="tsx">
import { ref, defineComponent, watch } from 'vue';
import { BaseModalProps } from './baseModal';
import { ElMessage } from 'element-plus';

const props = withDefaults(defineProps<Partial<BaseModalProps>>(), {
  fullscreen: false,
  showClose: true,
  draggable: false,
  alignCenter: true,
  showFullscreen: true,
  isShowFooter: true,
  comfirmText: '确认',
  closeOnClickModal: false,
  onConfirm: () => {},
});

const isFullscreen = ref<boolean>(false);
const visible = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);

watch(
  () => props.fullscreen,
  () => {
    isFullscreen.value = Boolean(props.fullscreen);
  },
  {
    immediate: true,
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void;
}>();

defineExpose({
  visible,
});

function hide() {
  emit('update:modelValue', false);
  visible.value = false;
}

function handleClose() {
  if (typeof props.beforeClose === 'function') {
    props.beforeClose(hide);
  } else {
    hide();
  }
}

/**
 * 确认事件支持异步关闭
 * @desc 点击确定回调，返回false | Promise.resolve(false)或Promise.reject()不会关闭， 其他自动关闭
 */
async function handleConfirm() {
  // 判断返回的数据是否是Promise
  try {
    confirmLoading.value = true;
    const result = await props.onConfirm();
    if (result !== false) {
      handleClose();
    }
  } catch (error: any) {
    error.message &&
      ElMessage({
        message: error?.message,
        type: 'error',
      });
    throw error;
  } finally {
    confirmLoading.value = false;
  }
}

function handelFullscreen(status: boolean) {
  isFullscreen.value = status;
}

const expandDom = defineComponent({
  name: 'expandDom',
  functional: true,
  props: ['render', 'params'],
  render() {
    return typeof this.render === 'function' ? this.render(this.params) : this.render;
  },
});
</script>

<style lang="less">
.base_modal {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  max-height: 100vh;

  .el-dialog__header {
    margin-right: 0 !important;
  }

  .el-dialog__body {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
}
.fullscreen_modal {
  max-width: calc(100vw - 32px);
}
</style>
<style scoped lang="less">
.modal_body {
  height: auto;
  width: 100%;
}

.header {
  position: relative;
  overflow: hidden;

  .header_title {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  }

  .butgure {
    position: absolute;
    top: 0;
    right: 0;

    .butitem {
      margin-left: 6px;
      padding: 6px;
      cursor: pointer;
      color: var(--el-color-info);

      &:hover {
        color: var(--el-color-primary);
      }
    }
  }
}
</style>
