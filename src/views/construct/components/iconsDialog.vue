<template>
  <el-dialog v-model="$props.visible" title="选择图标" width="70%" center>
    <ul class="icon-ul">
      <li
        v-for="icon in iconfont"
        :key="icon"
        class="icon-li"
        :class="$props.current === icon ? 'active-item' : ''"
        @click="onSelect(icon)"
      >
        <span :class="`iconfont ${icon}`"></span>
        <span>{{ icon }}</span>
      </li>
    </ul>
    <template #footer>
      <span class="dialog-footer">
        <el-button>Cancel</el-button>
        <el-button type="primary"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { iconfont } from '@/views/construct/icon';

defineOptions({ name: 'IconsDialog' });
const emit = defineEmits(['update:visible', 'update:current']);

defineProps({
  current: {
    type: String,
  },
  visible: {
    require: true,
    type: Boolean,
    default: false,
  },
});

function onSelect(icon: string) {
  emit('update:current', icon);
  emit('update:visible', false);
}
</script>

<stype scoped lang="less">
.icon-ul {
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  .icon-li {
    width: 120px;
    height: 80px;
    display: inline-block;
    list-style: none;
    margin: 6px;
    padding: 12px;
    cursor: pointer;
    &:hover {
      background: #f1f1f1;
      border-radius: 4px;
    }
    .iconfont {
      font-size: 48px;
      color: #5f5f5f;
    }
    span {
      display: block;
      text-align: center;
    }
  }
  .active-item {
    background-color: #e5f4ff !important;
    border-radius: 4px !important;
    span {
      color: #7d88ff !important;
    }
  }
}
</stype>
