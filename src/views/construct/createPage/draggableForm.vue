<template>
  <el-form
    class="draggabl-form"
    ref="ruleFormRef"
    :labelWidth="element.prop?.labelWidth"
    :labelPosition="element.prop?.labelPosition"
    :labelSuffix="element.prop?.labelSuffix"
    :hideRequiredAsterisk="element.prop?.hideRequiredAsterisk"
    :showMessage="element.prop?.showMessage"
    :inlineMessage="element.prop?.inlineMessage"
    :statusIcon="element.prop?.statusIcon"
    :validateOnRuleChange="element.prop?.validateOnRuleChange"
    :size="element.prop?.size"
    :disabled="element.prop?.disabled"
    :scrollToError="element.prop?.scrollToError"
  >
    <draggable
      :model="ruleForm"
      :list="element.components"
      :animation="250"
      group="formGroup"
      itemKey="id"
    >
      <template #item="{ element }">
        <div
          @click.stop.prevent="handlerActiveProvide(element)"
          class="draggabl-form-item"
          :class="activeIdProvide === element.id ? 'draggabl-form-item-active' : ''"
        >
          <DraggableFormItem :element="element" />
        </div>
      </template>
    </draggable>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { inject, ref, reactive, computed, watchEffect } from 'vue';
import draggable from 'vuedraggable';
import type { Components } from '@/views/construct/configType';
import DraggableFormItem from './draggableFormItem.vue';
import { TagType, Positio } from '@/views/construct/configType';
import type { FormInstance } from 'element-plus';

const ruleFormRef = ref<FormInstance>();

defineOptions({
  name: 'DraggableForm',
  inheritAttrs: true,
});
interface Props {
  /** 当前选中的元素 */
  element: Components;
}
const props = defineProps<Props>();

const handlerActiveProvide = inject('handlerActiveProvide');
const activeIdProvide = inject('activeIdProvide');

// const ruleForm = computed(() => {
//   const obj = {};
//   props.element.components.forEach(
//     (item: { prop: { field: string | number; value: any } }) => {
//       console.log('ruleForm1', item.prop);

//       obj[item.prop.field] = item.prop.value;
//     }
//   );
//   return obj;
// });

let ruleForm = reactive({});

watchEffect(() => {
  const obj = {};

  props.element.components.forEach((item: { prop: { field: string | number; value: any } }) => {
    obj[item.prop.field] = item.prop.value;
  });
  ruleForm = obj;
});

const submitForm = (formEl: FormInstance | undefined) => {
  console.log(ruleForm);

  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!', valid);
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped lang="less">
@activeItem: #e8f5ff;
.draggabl-form {
  &:deep .components-item {
    padding: 18px;
    height: 32px;
    overflow: hidden;
    border-radius: 4px;
    line-height: 32px;
    background: rgb(235, 246, 255);
  }
  &:deep .el-form-item {
    margin-bottom: 0;
  }
  .draggabl-form-item {
    padding: 18px;
    overflow: hidden;
    border-radius: 4px;
    cursor: all-scroll;
    &:hover {
      background: rgb(235, 246, 255);
    }
  }
  .draggabl-form-item-active {
    background-color: @activeItem !important;
  }
}
</style>
