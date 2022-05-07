<template>
  <div class="container">
    <div class="header">header</div>
    <div class="content">
      <div :class="{ asideActivation: !sidebar }" class="aside">
        <Aside />
      </div>
      <div class="container">
        <div class="main">
          <!-- <transition name="fade-transform" mode="out-in">
            <keep-alive :include="keepAliveIncludes">
              <router-view :key="key" />
            </keep-alive>
          </transition> -->
          <Main v-model:foo="foo" />
        </div>
        <!-- <div class="footer">footer</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { Aside, Main } from './components';
import { mapGetters, useStore } from 'vuex';
import { computed, ref } from 'vue';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Laout',
  setup() {
    const data = ref(0);
    const foo = ref(1);
    console.log(12312);

    return {
      data,
      foo,
    };
  },
  computed: {
    ...mapGetters(['sidebar', 'keepAliveIncludes']),
    key() {
      return this.$route.path;
    },
  },
  components: {
    Aside,
    Main,
  },
};
</script>

<style lang="less" scoped>
.header {
  height: 60px;
  background-color: aqua;
}
.content {
  display: flex;
  flex-direction: row;
}
.aside {
  border-right: 1px solid rgb(237, 237, 237);
}
.asideActivation {
  width: 210px;
  transition: 20s;
}
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
