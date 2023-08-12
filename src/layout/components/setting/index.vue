<template>
  <div class="set">
    <el-divider>主题色</el-divider>
    <ul class="s_cneter_colors">
      <li
        class="s_cneter_color"
        v-for="color in themeColorsfilter"
        :key="color.color"
        :style="{
          backgroundColor: color.color,
          border: color.themeColor === 'light' ? '1px solid #aeaeae' : 'none',
        }"
        :title="color.lable"
        @click="themeColorChange(color.color, color.themeColor)"
      >
        <span v-if="appStore.themeColorName === color.themeColor" class="iconfont icon-check" />
      </li>
      <li class="s_cneter_color" title="自定义">
        <el-color-picker
          popper-class="custom_color"
          v-model="customColor"
          @change="themeColorChange(customColor)"
        />
      </li>
    </ul>
    <!-- <div class="s_l">
      <span class="s_lable">主题色</span>
      <span class="s_cneter">

      </span>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDark } from '@vueuse/core';
import useAppStore from '@/store/modules/app';
import { themeColors, themeColorChange } from '@/layout/hooks/useThemeChange';

defineOptions({
  name: 'Setting',
});

const customColor = ref('#009688');

const appStore = useAppStore();

const themeColorsfilter = computed(() => {
  if (useDark().value) {
    return themeColors.value.filter((item) => item.themeColor !== 'light');
  }
  return themeColors.value;
});
</script>

<style scoped lang="less">
.set {
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .s_lable {
    width: 120px;
  }
  .s_cneter {
    flex: 1;
  }
  .s_l {
    display: flex;
    flex-direction: row;
  }

  .s_cneter_colors {
    text-align: center;
    .s_cneter_color {
      display: inline-block;
      width: 22px;
      height: 22px;
      margin-right: 8px;
      cursor: pointer;
      border-radius: var(--el-border-radius-base);
      overflow: hidden;
      vertical-align: middle;
      // border: 1px solid var(--el-text-color-secondary);
      ::v-deep .el-color-picker__trigger {
        width: 22px;
        height: 22px;
        border: none;
        padding: 0 !important;
        border-radius: 0;
        .el-color-picker__color {
          border: none;
        }
      }
    }
  }
}
</style>
