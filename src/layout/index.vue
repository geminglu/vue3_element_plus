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
      <div class="container">
        <div class="main">
          <Main />
        </div>
        <!-- <div class="footer">footer</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { Aside, Main } from './components';
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
  background-color: #fff;
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
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
