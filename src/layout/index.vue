<template>
  <div class="container">
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

const appStore = useAppStore();

function showCollapse(value: boolean) {
  appStore.menuCollapse = value;
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.aside {
  border-right: 1px solid #eee;
  margin-right: 12px;
}
.content {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.main-container {
  flex: 1;
}
.aside_footer {
  height: 40px;
  border-top: 1px solid #eee;
}
.show_collapse {
  font-size: 22px;
  line-height: 40px;
  margin-left: 12px;
  cursor: pointer;
  color: #3b3b3b;
}
</style>
