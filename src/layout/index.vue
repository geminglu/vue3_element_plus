<template>
  <div class="cont">
    <Header />
    <div class="content">
      <Transition name="fade">
        <Aside />
      </Transition>
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
import TagsView from './components/TagsView/index.vue';
import Footer from './components/Footer.vue';
import useAppStore from '@/store/modules/app';
import { ref } from 'vue';

const appStore = useAppStore();

const menuWidth = ref(appStore.menuCollapse ? '65px' : '250px');
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s;
  // width: 450px;
  // left: 0px;
}

.fade-enter-from,
.fade-leave-to {
  width: 0px;
  // left: -65px;
}

.cont {
  height: 100%;
  display: flex;
  flex-direction: column;
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
</style>
