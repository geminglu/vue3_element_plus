<template>
  <div
    v-if="!item.meta?.hidden && !item.children?.every((e) => e.meta?.hidden)"
    class="sidebar_item"
  >
    <el-sub-menu
      v-if="item.children && item.children.length > 0"
      :index="resolvePath(basePath)"
    >
      <template #title>{{ item.meta?.title }}</template>
      <SidebarItem
        v-for="router in item.children"
        :key="router.path"
        :item="router"
        :basePath="resolvePath(router.path)"
      />
    </el-sub-menu>
    <el-menu-item v-else :index="resolvePath(basePath)">{{
      item.name
    }}</el-menu-item>
  </div>
</template>

<script>
import path from 'path';

export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
    /** path */
    basePath: {
      type: String,
      required: true,
    },
  },

  created() {},
  methods: {
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath);
    },
  },
};
</script>

<style scoped lang="less">
.sidebar_item {
}
</style>
