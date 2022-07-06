<template>
  <div>index</div>
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
