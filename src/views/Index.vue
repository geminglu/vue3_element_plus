<template>
  <div>index</div>
</template>

<script>
import { test } from '@/serivce/table';
import { ElButton } from 'element-plus';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Index',
  setup() {
    test({}).then((res) => {
      console.log(res);
    });
  },
};
</script>

<style></style>
