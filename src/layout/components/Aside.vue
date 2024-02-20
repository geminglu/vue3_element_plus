<template>
  <div
    v-if="
      appStore.device === 'desktop' &&
      (appStore.layoutTheme === 'vertical' ||
        (appStore.layoutTheme === 'mix' && !appStore.secondaryMenuCollapse))
    "
    class="aside"
    :class="appStore.menuCollapse ? 'w' : 's'"
  >
    <el-scrollbar style="height: calc(100% - 41px)">
      <Sidebar :level="appStore.layoutTheme === 'mix' ? 'submenu' : undefined" />
    </el-scrollbar>

    <div class="aside_footer">
      <span
        v-if="appStore.menuCollapse"
        class="iconfont icon-a-yousuojin3x show_collapse"
        @click="showCollapse(false)"
      />
      <span v-else class="iconfont icon-a-zuosuojin3x show_collapse" @click="showCollapse(true)" />
    </div>
  </div>

  <div v-else-if="appStore.device === 'mobile'">
    <el-drawer
      class="menu_drewer"
      v-model="appStore.mobileCollapse"
      append-to-body
      :with-header="false"
      direction="ltr"
    >
      <Sidebar :menuCollapse="false" />
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Sidebar from './sidebar/index.vue';
import type { SidebarType } from './sidebar/index.vue';
import useAppStore from '@/store/modules/app';
import { useRoute } from 'vue-router';
import usePermissioStore from '@/store/modules/permission';
import path from 'path-browserify';

defineOptions({
  name: 'AsideNav',
});

const appStore = useAppStore();
const route = useRoute();
const permissioStore = usePermissioStore();

function showCollapse(value: boolean) {
  appStore.menuCollapse = value;
}

/**
 * 计算是否需要隐藏二级菜单
 */
watch(
  () => route.path,
  () => {
    if (appStore.layoutTheme === 'mix') {
      const menuChildren =
        permissioStore.systemMenu?.find((item) => path.join('/', item.path || '') === route.path)
          ?.children || [];
      if (menuChildren.length) {
        appStore.setSecondaryMenuCollapse(false);
      } else {
        appStore.setSecondaryMenuCollapse(true);
      }
    }
  }
);
</script>

<style lang="less" scoped>
.w {
  width: 65px;
}
.s {
  width: 250px;
}
.aside {
  border-right: 1px solid var(--el-border-color);
  background-color: var(--menuBg);
  position: relative;
  overflow: hidden;
  transition: 0.3s;

  .aside_footer {
    height: 40px;
    border-top: 1px solid var(--el-border-color);
    :hover {
      color: var(--el-color-primary);
    }
  }
  .show_collapse {
    font-size: 22px;
    line-height: 40px;
    margin-left: 20px;
    cursor: pointer;
    color: var(--el-text-color-primary);
  }
}
</style>

<style lang="less">
.menu_drewer {
  width: 250px !important;
  --el-drawer-padding-primary: 0px;
  background-color: var(--menuBg);
}
</style>
