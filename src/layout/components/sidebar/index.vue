<template>
  <el-menu
    :default-active="activeMenu"
    mode="vertical"
    unique-opened
    router
    class="menu"
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
.menu {
  border-right: none;
  background-color: var(--menuBg);
  :deep(.el-menu) {
    background-color: var(--subMenuBg);
  }
  :deep(.menu_title) {
    display: inline-block;
    padding: 0 var(--el-menu-base-level-padding);
    padding-left: calc(
      var(--el-menu-base-level-padding) + var(--el-menu-level) * var(--el-menu-level-padding)
    );
    width: 100%;
    margin: 0 8px;
    border-radius: 5px;
  }
  :deep(.is-active > .el-sub-menu__title) {
    color: var(--subMenuActiveText);
    // .directory_title {
    // }
  }
  .is-active > .el-sub-menu__title {
    color: var(--subMenuActiveText);
  }

  :deep(.el-menu-item.is-active) {
    color: var(--subMenuActiveText);
    .menu_title {
      background-color: var(--subMenuActiveBg);
    }
  }
  :deep(.el-menu-item) {
    color: var(--menuText);
    padding: 0 !important;
  }
  :deep(.el-menu-item):hover {
    background-color: transparent;
  }
  :deep(.el-sub-menu__title) {
    color: var(--menuText);
  }
  :deep(.el-sub-menu__title):hover {
    background-color: transparent;
  }
}
</style>
