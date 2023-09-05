<template>
  <div>
    <div class="back" @click="router.back()">
      <span class="iconfont icon-fanhui_icon"></span>
      返回
    </div>
    <div class="userInfo">
      <UserInfo />
    </div>
  </div>
</template>

<script setup lang="tsx">
import UserInfo from './component/userInfo.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped lang="less">
.userInfo {
  width: 800px;
  margin: 0 auto;
  margin-top: 100px;
}
.back {
  cursor: pointer;
}
</style>
