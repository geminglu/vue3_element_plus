<template>
  <template
    v-if="!item.meta?.hidden && !item.children?.every((e) => e.meta?.hidden)"
  >
    <el-sub-menu v-if="isDirectory(item)" :index="resolvePath(basePath)">
      <template #title>
        <el-icon v-if="item.meta.icon">
          <span class="iconfont" :class="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <SidebarItem
        v-for="router in item.children"
        :key="router.path"
        :item="router"
        :basePath="resolvePath(router.path)"
      />
    </el-sub-menu>
    <el-menu-item v-else :index="resolvePath(basePath)" :route="item">
      <el-icon v-if="item.meta.icon">
        <span class="iconfont" :class="item.meta.icon" />
      </el-icon>
      <template #title>{{ item.name }}</template>
    </el-menu-item>
  </template>
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

    /**
     * 判断是否是目录
     * @param {*} router 当前路由对象
     */
    isDirectory(router) {
      const current = router.children;
      const i =
        (current && current.length > 1) ||
        (current && current.length === 1 && current[0].children);

      return !!i;
    },
  },
};
</script>
