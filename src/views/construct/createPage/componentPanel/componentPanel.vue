<template>
  <el-scrollbar class="scrollbarPanel">
    <InputPanel v-if="activeItem?.tag === TagType.input" />
    <InputNumberPanel v-if="activeItem?.tag === TagType.inputNumber" />
    <FormPanel v-if="activeItem?.tag === TagType.form" />
  </el-scrollbar>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import type { Components } from '@/views/construct/configType';
import { TagType } from '@/views/construct/configType';
import { InputPanel, InputNumberPanel, FormPanel } from './index';

defineOptions({
  name: 'ComponentPanel',
});

const activeItem = inject<Components>('activeItemProvide');
</script>

<style scoped lang="less">
.scrollbarPanel {
  padding: 0 12px;
}
</style>
