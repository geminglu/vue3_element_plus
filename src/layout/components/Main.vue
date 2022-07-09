<template>
  <keep-alive :include="keepAliveIncludes">
    <router-view :key="key" />
  </keep-alive>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Main',
  computed: {
    ...mapGetters(['keepAliveIncludes']),
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="less" scoped>
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
