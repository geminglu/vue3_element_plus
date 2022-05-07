<template>
  {{ foo }}
  <button @click="onClick">123</button>
</template>

<script lang="ts" setup>
import { defineProps, defineExpose } from 'vue';
const props = defineProps({
  foo: String,
});
const onClick = () => {
  const num = 1; // 定义num数值
  defineExpose('update:foo', 12312); // 传递更新数值
};

</script>

<style lang="less" scoped></style>
