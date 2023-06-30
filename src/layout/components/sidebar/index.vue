<template>
  <el-menu
    :default-active="activeMenu"
    mode="vertical"
    unique-opened
    router
    class="menu-vertical"
    :collapse="appStore.menuCollapse"
  >
    <SidebarItem
      v-for="router in systemMenu"
      :key="router.id"
      :item="router"
      :basePath="router.name"
    />
  </el-menu>
</template>

<script setup lang="ts">
import SidebarItem from './sidebarItem.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import usePermissioStore from '@/store/modules/permission';
import useAppStore from '@/store/modules/app';

defineOptions({
  name: 'Sidebar',
});

const appStore = useAppStore();
const route = useRoute();
const permissioStore = usePermissioStore();

/**
 * 当前激活的路由
 */
const activeMenu = computed<string>(() => (route.name as string) || '');

const systemMenu = computed(() => permissioStore.systemMenu);
</script>

<style lang="less" scoped>
.menu-vertical {
  // width: 200px;
}
</style>
