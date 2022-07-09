<template>
  <div class="page_header_wrapper">
    <div class="page-header">
      <div v-if="backUrl" class="back" @click="navigation(backUrl)">
        <span class="iconfont icon-fanhui_icon" />
        {{ back }}
      </div>
      <el-divider v-if="backUrl" direction="vertical" />
      <h2 class="title">{{ title }}</h2>
    </div>
    <div class="con">
      <slot />
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue';

export default {
  name: 'PageHeaderWrapper',
  props: {
    /** 页面title */
    title: String,
    /** 返回按钮 */
    back: {
      type: String,
      default: '返回',
    },
    /** 需要跳转的路径 */
    backUrl: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { ctx } = getCurrentInstance();
    /**
     * 点击返回按钮需要跳转
     * @param {string} path 需要跳转的路径
     */
    function navigation(path) {
      if (path) ctx.$root.$router.push(path);
    }
    return { navigation };
  },
};
</script>

<style scoped lang="less">
.page_header_wrapper {
  .page-header {
    padding: 0 20px;
    height: 45px;
    background-color: white;
    .back {
      display: inline-block;
      line-height: 45px;
      cursor: pointer;
      span {
        color: rgba(21, 21, 21, 0.85);
      }
    }
    .title {
      display: inline-block;
      line-height: 45px;
      margin: 0;
      margin-right: 10px;
      color: rgba(21, 21, 21, 0.85);
      font-size: 20px;
    }
  }
  .con {
    min-height: calc(100vh - 315px);
    margin: 20px;
    padding: 20px;
    background-color: white;
  }
}
</style>
