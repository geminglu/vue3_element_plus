<template>
  <el-form :model="activeItemProvide.prop" label-width="100px" label-position="left">
    <el-form-item label="字段名">
      <el-input v-model="activeItemProvide.prop.field" />
    </el-form-item>
    <el-form-item label="标题">
      <el-input v-model="activeItemProvide.prop.title" />
    </el-form-item>
    <el-form-item label="默认值" key="value">
      <el-input-number v-model="activeItemProvide.prop.value" :controls="false" />
    </el-form-item>
    <el-form-item label="占位文本" key="placeholder">
      <el-input v-model="activeItemProvide.prop.placeholder" />
    </el-form-item>
    <el-form-item label="最小值" key="min">
      <el-input-number v-model="activeItemProvide.prop.min" />
    </el-form-item>
    <el-form-item label="最大值" key="max">
      <el-input-number v-model="activeItemProvide.prop.max" />
    </el-form-item>
    <el-form-item label="步长" key="step">
      <el-input-number v-model="activeItemProvide.prop.step" />
    </el-form-item>
    <el-form-item label="步长的倍数" key="stepStrictly">
      <el-switch v-model="activeItemProvide.prop.stepStrictly" />
    </el-form-item>
    <el-form-item label="数值精度" key="precision">
      <el-input-number v-model="activeItemProvide.prop.precision" />
    </el-form-item>
    <el-form-item label="只读" key="readonly">
      <el-switch v-model="activeItemProvide.prop.readonly" />
    </el-form-item>
    <el-form-item label="禁用" key="disabled">
      <el-switch v-model="activeItemProvide.prop.disabled" />
    </el-form-item>
    <el-form-item label="使用控制按钮" key="controls">
      <el-switch v-model="activeItemProvide.prop.controls" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, inject, watch } from 'vue';
import { Search } from '@element-plus/icons-vue';
import type { ConfigInputProps, Components } from '@/views/construct/configType';
import { inputType } from '@/views/construct/configType';
import IconsDialog from '@/views/construct/components/iconsDialog.vue';

defineOptions({ name: 'InputNumberPanel' });

const iconValue = ref<string>('');
const dialogVisiblePrefix = ref(false);
const dialogVisibleSuffix = ref(false);
const activeItemProvide = inject<Components>('activeItemProvide');
</script>
