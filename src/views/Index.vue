<template>
  <div>index</div>
  <el-button type="danger">危险按钮</el-button>
</template>

<script>
import { test } from '@/serivce/table';
import { ElButton } from 'element-plus';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Index',
  components: {
    ElButton,
  },
  setup() {
    test({}).then((res) => {
      console.log(res);
    });
  },
};
</script>

<style></style>
