<template>
  <div class="container">
    <div class="header">header</div>
    <div class="content">
      <div class="aside">
          <Aside />
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

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Layout',
  setup() {
    return {};
  },
  components: {
    Aside,
    Main,
  },
};
</script>

<style lang="less" scoped>
.header {
  height: var(--headerHeight);
  background-color: aqua;
}
.content {
  display: flex;
  flex-direction: row;
}
.aside {
  border-right: 1px solid rgb(237, 237, 237);
}
</style>
