<template>
  <el-menu
    :default-active="activeMenu()"
    mode="vertical"
    unique-opened
    router
    :collapse="sidebar.opened"
    class="el-menu-vertical-demo"
    text-color="#303133e8"
  >
    <SidebarItem
      v-for="router in routers"
      :key="router.path"
      :item="router"
      :basePath="router.path"
    />
  </el-menu>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';
import { mapGetters } from 'vuex';
import SidebarItem from './sidebarItem.vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Sidebar',
  setup() {
    const state = reactive({});

    /**
     * 当前激活的路由
     */
    function activeMenu() {
      const { meta, path } = this.$route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    }

    return {
      ...toRefs(state),
      activeMenu,
    };
  },
  components: {
    SidebarItem,
  },
  computed: {
    ...mapGetters(['routers', 'sidebar']),
  },
  methods: {},
});
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: var(--aside_width);
  border-right: none;
}
</style>
