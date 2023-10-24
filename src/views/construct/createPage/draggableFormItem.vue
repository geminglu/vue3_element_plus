<template>
  <el-form-item :label="$props.element.prop?.title">
    <el-input
      v-if="$props.element.tag === TagType.input"
      v-model="$props.element.prop.value"
      :type="$props.element.prop.type"
      :maxlength="$props.element.prop.maxlength"
      :minlength="$props.element.prop.minlength"
      :showWordLimit="$props.element.prop.showWordLimit"
      :placeholder="$props.element.prop.placeholder"
      :clearable="$props.element.prop.clearable"
      :showPassword="$props.element.prop.showPassword"
      :disabled="$props.element.prop.disabled"
      :rows="$props.element.prop.rows"
      :readonly="$props.element.prop.readonly"
    >
      <template v-if="$props.element.prop.prepend" #prepend>
        {{ $props.element.prop.prepend }}
      </template>
      <template v-if="$props.element.prop.append" #append>
        {{ $props.element.prop.append }}
      </template>
      <template #prefix>
        <span
          v-if="$props.element.prop.prefixIcon"
          class="iconfont"
          :class="$props.element.prop.prefixIcon"
        />
      </template>
      <template #suffix>
        <span
          v-if="$props.element.prop.suffixIcon"
          class="iconfont"
          :class="$props.element.prop.suffixIcon"
        ></span>
      </template>
    </el-input>
    <el-input-number
      v-if="$props.element.tag === TagType.inputNumber"
      v-model.number="$props.element.prop.value"
      :min="$props.element.prop.min"
      :max="$props.element.prop.max"
      :step="$props.element.prop.step"
      :stepStrictly="$props.element.prop.stepStrictly"
      :precision="$props.element.prop.precision"
      :readonly="$props.element.prop.readonly"
      :disabled="$props.element.prop.disabled"
      :controls="$props.element.prop.controls"
      :placeholder="$props.element.prop.placeholder"
    />
  </el-form-item>
</template>

<script setup lang="ts">
import type { Components } from '@/views/construct/configType';
import { TagType } from '@/views/construct/configType';

defineOptions({
  name: 'DraggableFormItem',
  inheritAttrs: true,
});

interface Props {
  /** 当前选中的元素 */
  element: Components;
}
defineProps<Props>();
</script>
