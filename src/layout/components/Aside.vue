<template>
  <el-scrollbar height="calc(100vh - 60px)">
    <Sidebar />
  </el-scrollbar>
</template>

<script>
import Sidebar from '../components/sidebar/index.vue';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Aside',
  setup() {},
  components: {
    Sidebar,
  }
};
</script>
