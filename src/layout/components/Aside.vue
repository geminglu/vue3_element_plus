<template>
  <el-scrollbar height="calc(100vh - 60px)">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="store.state.app.sidebar.opened"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>item four</span></template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { mapGetters, useStore } from 'vuex';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue';

const store = useStore();
function setSidebar() {
  store.commit('app/TOGGLE_SIDEBAR');
}

</script>

<style lang="less" scoped>
.el-menu-vertical-demo {
  // min-width: 400px;
  // width: 250px;
  border: none;
  // .el-sub-menu__title {
  //   padding: 0 60px !important;
  // }
}
.el-sub-menu__title {
  padding: 0 60px;
}
</style>
