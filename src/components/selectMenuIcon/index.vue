<template>
  <ul class="icons">
    <li
      v-for="item in icons"
      :key="item"
      class="icons_item"
      :class="currentSelect === item ? 'icon_activate' : ''"
      @click="handelSelect(item)"
    >
      <span class="iconfont" :class="`icon-${item}`"></span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'SelectMenuIcon',
});

const props = defineProps({
  select: {
    type: String,
    default: '',
  },
});

const currentSelect = ref<string>(props.select);

const icons = [
  'jiaoseguanli',
  'caidanguanli',
  'shoufeiguanli',
  'jiankongbaojing',
  'yonghuliebiao',
  'xitongzonglan',
  'xitongshezhi',
  'zhanghaoguanli',
  'slider',
];

function handelSelect(value: string) {
  currentSelect.value = value;
}

defineExpose({
  currentSelect,
});
</script>

<style scoped lang="less">
.icons {
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .icons_item {
    list-style: none;
    padding: 6px;
    margin: 6px;
    // background: antiquewhite;
    width: 50px;
    height: 50px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      background-color: rgb(201, 243, 255);
    }

    .iconfont {
      font-size: 40px;
    }
  }
}
.icon_activate {
  background-color: rgb(201, 243, 255);
}
</style>
