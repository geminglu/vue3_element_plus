<template>
  <el-form :model="activeItemProvide.prop" label-width="100px" label-position="left">
    <el-form-item label="字段名" key="field">
      <el-input v-model="activeItemProvide.prop.field" />
    </el-form-item>
    <el-form-item label="标题" key="title">
      <el-input v-model="activeItemProvide.prop.title" />
    </el-form-item>
    <el-form-item label="默认值" key="value">
      <el-input v-model="activeItemProvide.prop.value" />
    </el-form-item>
    <el-form-item label="类型" key="type">
      <el-select v-model="activeItemProvide.prop.type" placeholder="请选择文本框类型">
        <el-option v-for="(value, key) in inputType" :key="key" :label="key" :value="value" />
      </el-select>
    </el-form-item>
    <el-form-item label="最大输入长度" key="maxlength">
      <el-input-number v-model="activeItemProvide.prop.maxlength" />
    </el-form-item>
    <el-form-item label="最小输入长度" key="minlength">
      <el-input-number v-model="activeItemProvide.prop.minlength" />
    </el-form-item>
    <el-form-item label="显示统计字数" key="showWordLimit">
      <el-switch v-model="activeItemProvide.prop.showWordLimit" />
    </el-form-item>
    <el-form-item label="占位文本" key="placeholder">
      <el-input v-model="activeItemProvide.prop.placeholder" />
    </el-form-item>
    <el-form-item
      key="clearable"
      v-if="activeItemProvide.prop.type === inputType.text"
      label="显示清除按钮"
    >
      <el-switch v-model="activeItemProvide.prop.clearable" />
    </el-form-item>
    <el-form-item
      key="showPassword"
      v-if="activeItemProvide.prop.type === inputType.text"
      label="显示密码图标"
    >
      <el-switch v-model="activeItemProvide.prop.showPassword" />
    </el-form-item>
    <el-form-item label="禁用" key="disabled">
      <el-switch v-model="activeItemProvide.prop.disabled" />
    </el-form-item>
    <el-form-item label="只读" key="readonly">
      <el-switch v-model="activeItemProvide.prop.readonly" />
    </el-form-item>
    <el-form-item
      key="prefixIcon"
      v-if="activeItemProvide.prop.type === inputType.text"
      label="前缀图标"
    >
      <el-input v-model="activeItemProvide.prop.prefixIcon">
        <template #prefix>
          <span :class="`iconfont ${activeItemProvide.prop.prefixIcon}`"></span>
        </template>
        <template #append>
          <el-button @click="dialogVisiblePrefix = true">选择</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item
      key="suffixIcon"
      v-if="activeItemProvide.prop.type === inputType.text"
      label="后缀图标"
    >
      <el-input v-model="activeItemProvide.prop.suffixIcon">
        <template #prefix>
          <span :class="`iconfont ${activeItemProvide.prop.suffixIcon}`"></span>
        </template>
        <template #append>
          <el-button @click="dialogVisibleSuffix = true">选择</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item key="prepend" v-if="activeItemProvide.prop.type === inputType.text" label="前缀">
      <el-input v-model="activeItemProvide.prop.prepend" />
    </el-form-item>
    <el-form-item key="append" v-if="activeItemProvide.prop.type === inputType.text" label="后缀">
      <el-input v-model="activeItemProvide.prop.append" />
    </el-form-item>
    <el-form-item
      key="rows"
      v-if="activeItemProvide.prop.type === inputType.textareas"
      label="行数"
    >
      <el-input-number v-model="activeItemProvide.prop.rows" />
    </el-form-item>
  </el-form>
  <IconsDialog
    v-model:visible="dialogVisiblePrefix"
    v-model:current="activeItemProvide.prop.prefixIcon"
  />
  <IconsDialog
    v-model:visible="dialogVisibleSuffix"
    v-model:current="activeItemProvide.prop.suffixIcon"
  />
</template>

<script setup lang="ts">
import { ref, reactive, inject, watch } from 'vue';
import { Search } from '@element-plus/icons-vue';
import type { ConfigInputProps, Components } from '@/views/construct/configType';
import { inputType } from '@/views/construct/configType';
import IconsDialog from '@/views/construct/components/iconsDialog.vue';

defineOptions({ name: 'InputPanel' });

const iconValue = ref<string>('');
const dialogVisiblePrefix = ref(false);
const dialogVisibleSuffix = ref(false);
const activeItemProvide = inject<Components>('activeItemProvide');
</script>
