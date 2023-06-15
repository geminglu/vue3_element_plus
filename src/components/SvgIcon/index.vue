<template>
  <svg class="svg-icon">
    <use :xlink:href="`#icon-${props.name}`" />
  </svg>
</template>

<script setup lang="ts">
// defineOptions({
//   name: 'Main',
// });

type Props = {
  name: string;
};
const props = withDefaults(defineProps<Props>(), {
  name: '',
});
</script>

<style lang="less" scoped>
.svg-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}
</style>
