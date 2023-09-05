<template>
  <div class="cont">
    <Header />
    <div class="content">
      <div class="aside">
        <Aside />
        <div class="aside_footer">
          <span
            v-if="appStore.menuCollapse"
            class="iconfont icon-a-yousuojin3x show_collapse"
            @click="showCollapse(false)"
          />
          <span
            v-else
            class="iconfont icon-a-zuosuojin3x show_collapse"
            @click="showCollapse(true)"
          />
        </div>
      </div>
      <div class="main-container">
        <TagsView />
        <el-scrollbar class="page_scrollbar">
          <Main class="main" />
          <Footer />
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Main from './components/Main.vue';
import Aside from './components/Aside.vue';
import Header from './components/Header.vue';
import useAppStore from '@/store/modules/app';
import TagsView from './components/TagsView/index.vue';
import Footer from './components/Footer.vue';

const appStore = useAppStore();

function showCollapse(value: boolean) {
  appStore.menuCollapse = value;
}
</script>

<style lang="less" scoped>
.cont {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.aside {
  border-right: 1px solid var(--el-border-color);
  margin-right: 12px;
  background-color: var(--menuBg);
}
.content {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.main-container {
  flex: 1;
  overflow: hidden;
}
.aside_footer {
  height: 40px;
  border-top: 1px solid var(--el-border-color);
}
.show_collapse {
  font-size: 22px;
  line-height: 40px;
  margin-left: 12px;
  cursor: pointer;
  color: var(--el-text-color-primary);
}
</style>
