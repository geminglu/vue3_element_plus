<template>
  <div class="user_info">
    <ul class="info_list">
      <li
        class="info_list_item"
        v-for="item in infoList"
        :key="item.name"
        @click="currentItem = item.name"
        :class="currentItem === item.name ? 'info_list_act' : ''"
      >
        {{ item.label }}
      </li>
    </ul>
    <div class="center">
      <MyInfo v-if="currentItem === 'userInfo'" />
    </div>
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue';
import MyInfo from './myInfo.vue';

defineOptions({
  name: 'UserInfo',
});
const infoList = ref([
  {
    name: 'home',
    label: '首页',
  },
  {
    name: 'userInfo',
    label: '我的信息',
  },
]);

const currentItem = ref(infoList.value[0].name);
</script>

<style scoped lang="less">
.user_info {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  min-width: 100%;
  border: 1px solid var(--el-border-color);
  .info_list {
    width: 200px;
    border-right: 1px solid var(--el-border-color);
    .info_list_item {
      line-height: 48px;
      position: relative;
      padding-left: 12px;
    }
  }
  .info_list_act {
    color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-9);
    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 4px;
      height: 100%;
      top: 0;
      bottom: 0;
      right: 0;
      background-color: var(--el-color-primary);
    }
  }
}
</style>
