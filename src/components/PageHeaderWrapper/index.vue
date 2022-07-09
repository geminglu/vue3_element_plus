<template>
  <div class="page_header_wrapper">
    <div class="page-header">
      <div v-if="isShowBack" class="back" @click="navigation(backUrl)">
        <span class="iconfont icon-fanhui_icon icon" />
        Back
      </div>
      <el-divider v-if="isShowBack" direction="vertical" />
      <h2 class="title" v-if="title">{{ title }}</h2>
    </div>
    <div class="con">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

type Props = {
  title?: string;
  isShowBack?: boolean;
  backUrl?: string;
};
withDefaults(defineProps<Props>(), {
  isShowBack: false,
});

const router = useRouter();

function navigation(path?: string) {
  path ? router.push(path) : router.back();
}
</script>

<style scoped lang="less">
.page_header_wrapper {
  .page-header {
    padding: 0 12px;
    height: 45px;
    background-color: white;
    .back {
      display: inline-block;
      line-height: 45px;
      cursor: pointer;
      vertical-align: middle;
      .icon {
        vertical-align: middle;
      }
      span {
        color: rgba(21, 21, 21, 0.85);
      }
    }
    .title {
      display: inline-block;
      line-height: 45px;
      margin: 0;
      color: rgba(21, 21, 21, 0.85);
      font-size: 20px;
      vertical-align: middle;
    }
  }
  .con {
    // height: calc(100vh - 180px);
    padding: 12px;
    background-color: white;
  }
}
</style>
