<template>
  <el-form :model="activeItemProvide.prop" label-width="100px" label-position="left">
    <el-form-item label="URL">
      <el-input v-model="activeItemProvide.prop.field" />
    </el-form-item>
    <el-form-item label="标题">
      <el-input v-model="activeItemProvide.prop.title" />
    </el-form-item>
    <el-form-item label="标签长度">
      <el-slider
        v-model="activeItemProvide.prop.labelWidth"
        :min="0"
        :max="200"
        show-input
        :show-input-controls="false"
      />
    </el-form-item>
    <el-form-item label="标签位置">
      <el-radio-group v-model="activeItemProvide.prop.labelPosition">
        <el-radio-button v-for="(value, key) in Positio" :key="key" :label="value" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="标题后缀">
      <el-input v-model="activeItemProvide.prop.labelSuffix" />
    </el-form-item>
    <el-form-item label="隐藏红星">
      <el-switch v-model="activeItemProvide.prop.hideRequiredAsterisk" />
    </el-form-item>
    <el-form-item label="星号位置">
      <el-radio-group v-model="activeItemProvide.prop.requireAsteriskPosition">
        <el-radio-button v-for="(value, key) in AsteriskPosition" :key="key" :label="value" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="显示校验信息">
      <el-switch v-model="activeItemProvide.prop.showMessage" />
    </el-form-item>
    <el-form-item label="以行内形式展示校验信息">
      <el-switch v-model="activeItemProvide.prop.inlineMessage" />
    </el-form-item>
    <el-form-item label="校验结果图标">
      <el-switch v-model="activeItemProvide.prop.statusIcon" />
    </el-form-item>
    <el-form-item label="rules改变后触发验证">
      <el-switch v-model="activeItemProvide.prop.validateOnRuleChange" />
    </el-form-item>
    <el-form-item label="表单大小">
      <el-select v-model="activeItemProvide.prop.size" placeholder="请选择文本框类型">
        <el-option v-for="(value, key) in Size" :key="key" :label="key" :value="value" />
      </el-select>
    </el-form-item>
    <el-form-item label="禁用">
      <el-switch v-model="activeItemProvide.prop.disabled" />
    </el-form-item>
    <el-form-item label="当校验失败时，滚动到第一个错误表单项">
      <el-switch v-model="activeItemProvide.prop.scrollToError" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, inject, watch } from 'vue';
import { Search } from '@element-plus/icons-vue';
import type { ConfigInputProps, Components } from '@/views/construct/configType';
import { inputType, Positio, AsteriskPosition, Size } from '@/views/construct/configType';
import IconsDialog from '@/views/construct/components/iconsDialog.vue';

defineOptions({ name: 'FormPanel' });

const activeItemProvide = inject<Components>('activeItemProvide');
</script>
