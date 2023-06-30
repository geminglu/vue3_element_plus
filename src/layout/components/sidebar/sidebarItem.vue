<template>
  <template v-if="!item?.hidden">
    <el-sub-menu v-if="item.type === 'directory'" :index="item.id">
      <template #title>
        <el-icon>
          <span class="iconfont" :class="`icon-${item.icon}`"></span>
        </el-icon>
        <span>{{ item.title }}</span>
      </template>
      <SidebarItem
        v-for="router in item.children"
        :key="router.id"
        :item="router"
        :basePath="router.name"
      />
    </el-sub-menu>
    <el-menu-item v-if="item.type === 'menu'" :index="item.name" :route="item">
      <template #title>{{ item.title }}</template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import type { systemMenuType } from '#/router';
import SidebarItem from './sidebarItem.vue';

defineOptions({
  name: 'SidebarItem',
});

interface PropsType {
  item: systemMenuType;
  basePath: string;
}

defineProps<PropsType>();
</script>
