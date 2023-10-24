<script setup lang="ts">
import { computed } from 'vue';
import Button from './Button.vue';
import { Placement } from 'element-plus';

defineOptions({
  name: 'HoverButton',
});

interface Props {
  tooltip?: string;
  placement?: Placement;
}

interface Emit {
  (e: 'click'): void;
}

const props = withDefaults(defineProps<Props>(), {
  tooltip: '',
  placement: 'auto',
});

const emit = defineEmits<Emit>();

const showTooltip = computed(() => Boolean(props.tooltip));

function handleClick() {
  emit('click');
}
</script>

<template>
  <el-tooltip v-if="showTooltip" :content="tooltip" :placement="placement">
    <Button @click="handleClick">
      <slot />
    </Button>
  </el-tooltip>
  <Button v-else @click="handleClick">
    <slot />
  </Button>
</template>
