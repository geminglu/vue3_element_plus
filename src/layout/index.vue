<template>
  <div class="container">
    <div class="header">header</div>
    <div class="content">
      <div class="aside">
        <Aside />
        <div class="collapsed">
          <span
            v-if="sidebar.opened"
            class="iconfont icon-a-yousuojin3x collapsed-button"
            @click="setSidebarOPen(false)"
          />
          <span
            v-if="!sidebar.opened"
            class="iconfont icon-a-zuosuojin3x collapsed-button"
            @click="setSidebarOPen(true)"
          />
        </div>
      </div>
      <div class="main-container">
        <TagsView />
        <el-scrollbar class="page_scrollbar">
          <div class="page">
            <Main class="main" />
            <Footer />
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import { Aside, Main, Footer, TagsView } from './components';
import { mapGetters, useStore } from 'vuex';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Layout',
  setup() {
    const store = useStore();

    function setSidebarOPen(val) {
      store.commit('app/TOGGLE_SIDEBAR', val);
    }
    return {
      setSidebarOPen,
    };
  },
  components: {
    Aside,
    Main,
    Footer,
    TagsView,
  },
  computed: {
    ...mapGetters(['sidebar']),
  },
};
</script>

<style lang="less" scoped>
.header {
  height: var(--header_height);
  background-color: aqua;
}
.content {
  display: flex;
  flex-direction: row;
}
.aside {
  height: 100%;
  position: relative;
  z-index: 10;
  background-color: #fff;
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}
.page_scrollbar {
  width: 100%;
  height: calc(100vh - var(--header_height));
}
.main-container {
  width: 100%;
}
.page {
  width: 100%;
  min-height: calc(100vh - var(--header_height));
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.main {
  flex: auto;
}
.collapsed {
  height: 50px;
  border-top: 1px solid #eee;
  .collapsed-button {
    font-size: 28px;
    line-height: 50px;
    color: rgb(58, 58, 58);
    margin-left: 18px;
    cursor: pointer;

    &:hover {
      color: var(--el-menu-active-color);
    }
  }
}
</style>
