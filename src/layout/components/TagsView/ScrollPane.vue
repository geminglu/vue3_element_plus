<template>
  <el-scrollbar>
    <slot />
  </el-scrollbar>
</template>

<script>
export default {
  name: 'ScrollPane',
  data() {
    return {};
  },
};
</script>

<style scoped lang="less">
.scroll_pane {
}
</style>
