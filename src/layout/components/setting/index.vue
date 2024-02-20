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
    <el-divider>导航布局</el-divider>
    <ul class="layout_theme">
      <el-tooltip class="item" content="左侧模式" placement="bottom" popper-class="layout_theme">
        <li
          :class="appStore.layoutTheme === 'vertical' ? 'is-select' : ''"
          ref="verticalRef"
          @click="appStore.layoutTheme = 'vertical'"
        >
          <div />
          <div />
        </li>
      </el-tooltip>

      <el-tooltip class="item" content="顶部模式" placement="bottom" popper-class="layout_theme">
        <li
          :class="appStore.layoutTheme === 'horizontal' ? 'is-select' : ''"
          ref="horizontalRef"
          @click="appStore.layoutTheme = 'horizontal'"
        >
          <div />
          <div />
        </li>
      </el-tooltip>

      <el-tooltip class="item" content="混合模式" placement="bottom" popper-class="layout_theme">
        <li
          :class="appStore.layoutTheme === 'mix' ? 'is-select' : ''"
          ref="mixRef"
          @click="appStore.layoutTheme = 'mix'"
        >
          <div />
          <div />
        </li>
      </el-tooltip>
    </ul>
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

.layout_theme {
  margin-top: 25px;
  width: 100%;
  height: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  li {
    width: 18%;
    height: 45px;
    background: #f0f2f5;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border-radius: 4px;
    box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);

    &:nth-child(1) {
      div {
        &:nth-child(1) {
          width: 30%;
          height: 100%;
          background: #1b2a47;
        }

        &:nth-child(2) {
          width: 70%;
          height: 30%;
          top: 0;
          right: 0;
          background: #fff;
          box-shadow: 0 0 1px #888;
          position: absolute;
        }
      }
    }

    &:nth-child(2) {
      div {
        &:nth-child(1) {
          width: 100%;
          height: 30%;
          background: #1b2a47;
          box-shadow: 0 0 1px #888;
        }
      }
    }

    &:nth-child(3) {
      div {
        &:nth-child(1) {
          width: 100%;
          height: 30%;
          background: #1b2a47;
          box-shadow: 0 0 1px #888;
        }

        &:nth-child(2) {
          width: 30%;
          height: 70%;
          bottom: 0;
          left: 0;
          background: #fff;
          box-shadow: 0 0 1px #888;
          position: absolute;
        }
      }
    }
  }
  .is-select {
    border: 2px solid var(--el-color-primary);
  }
}
</style>
