<template>
  <page-header-wrapper back="首页" backUrl="123" title="首页">
    <div class="slider-demo-block">
    <span class="demonstration">Default value</span>
    <el-slider />
  </div>
  </page-header-wrapper>
</template>

<script>
import { test } from '@/serivce/table';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Index',
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    test({}).then((res) => {
    });
  },
};
</script>

<style></style>
