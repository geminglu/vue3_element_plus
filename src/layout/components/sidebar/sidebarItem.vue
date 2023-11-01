<template>
  <template v-if="!item?.hidden">
    <el-sub-menu v-if="item.type === 'directory'" :index="item.id">
      <template #title>
        <el-icon>
          <span class="iconfont" :class="`icon-${item.icon}`"></span>
        </el-icon>
        <span class="sub_menu_title">{{ item.title }}</span>
      </template>
      <SidebarItem v-for="router in item.children" :key="router.id" :item="router" />
    </el-sub-menu>
    <el-menu-item v-if="item.type === 'menu'" :index="item.name" :route="item" class="menu_item">
      <el-icon v-if="item.icon">
        <span class="iconfont" :class="`icon-${item.icon}`"></span>
      </el-icon>
      <template #title>
        <span class="menu_title">{{ item.title }}</span>
      </template>
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
}

defineProps<PropsType>();
</script>

<style scoped lang="less">
.sub_menu_title {
  width: 150px;
}
</style>
