<template>
  <el-menu
    :default-active="activeMenu"
    :mode="mode"
    unique-opened
    router
    class="menu"
    :collapse="menuCollapse ?? appStore.menuCollapse"
  >
    <SidebarItem v-for="router in systemMenu" :key="router.id" :item="router" />
  </el-menu>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import SidebarItem from './sidebarItem.vue';
import { useRoute } from 'vue-router';
import usePermissioStore from '@/store/modules/permission';
import useAppStore from '@/store/modules/app';
import { systemMenuType } from '#/router';
import path from 'path-browserify';

defineOptions({
  name: 'Sidebar',
});

const props = defineProps({
  menuCollapse: Object as PropType<boolean | null>,
  mode: { type: String as PropType<'vertical' | 'horizontal'>, default: 'vertical' },
  level: { type: String as PropType<'submenu' | 'mainMenu' | undefined> },
});

const appStore = useAppStore();
const route = useRoute();
const permissioStore = usePermissioStore();

/**
 * 当前激活的路由
 */
const activeMenu = computed<string>(() => (route.path as string) || '');

const systemMenu = computed(() => {
  let menu: systemMenuType[] = [];
  if (props.level === 'mainMenu') {
    menu =
      (permissioStore.systemMenu &&
        permissioStore.systemMenu.map((item) => ({ ...item, children: undefined }))) ||
      [];
  } else if (props.level === 'submenu') {
    menu =
      permissioStore.systemMenu?.find(
        (item) => path.join('/', item.path || '') === activeMenu.value
      )?.children || [];
  } else {
    menu = permissioStore.systemMenu || [];
  }

  return menu;
});
</script>

<style lang="less" scoped></style>
