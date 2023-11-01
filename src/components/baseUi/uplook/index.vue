<template>
  <div class="up_look">
    <el-select
      :model-value="modelValue"
      :placeholder="placeholder"
      :loading="loading"
      clearable
      :size="size"
      v-bind="$attrs"
      @change="
        (v) => {
          emit('update:modelValue', v);
        }
      "
    >
      <el-option
        v-for="item in data"
        :key="item[fieldId]"
        :label="item[fielidText]"
        :value="item[fieldId]"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { PropType, reactive, ref } from 'vue';
import { request } from '@/utils/request';

defineOptions({
  name: 'UpLook',
});

interface Emit {
  (e: 'update:modelValue', v: any): void;
}

const props = defineProps({
  modelValue: {
    type: String,
  },
  /**
   * URL
   */
  url: {
    type: String,
  },
  /**
   * 查询参数
   */
  parma: {
    type: Object as PropType<{ [index: string]: any }>,
  },
  /**
   * 字段 id，默认为‘id’
   */
  fieldId: {
    type: String,
    default: 'id',
  },
  /**
   * 显示的名称，默认是‘label’
   */
  fielidText: {
    type: String,
    default: 'label',
  },
  placeholder: String,
  uplookList: Array,
  size: {
    type: String as PropType<'large' | 'default' | 'small'>,
    default: 'default',
  },
});

const emit = defineEmits<Emit>();

const loading = ref(false);
const data = reactive<any[]>([]);

if (props.url) {
  getDate();
} else {
  data.push(...(props.uplookList || []));
}

/**
 * 请求数据
 */
async function getDate() {
  try {
    loading.value = true;
    const results = await request({
      url: props.url,
      data: props.parma,
    });
    const d = results.rows || results.data || [];
    data.length = 0;
    data.push(...d);
  } catch (error) {
    //
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped lang="less">
.up_look {
}
</style>
