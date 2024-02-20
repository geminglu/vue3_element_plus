<template>
  <div class="tabel">
    <el-form v-if="dateSet.queryform" :inline="true" v-model="form">
      <el-form-item v-for="item in dateSet.queryform" :key="item.name" :label="item.label">
        <el-input
          v-if="item.type === 'text'"
          v-model="form[item.name]"
          clearable
          :placeholder="`请输入${item.label}`"
        />
        <UpLook
          v-if="item.type === 'uplook'"
          v-model="form[item.name]"
          :url="item.url"
          :uplookList="item.uplookList"
          :fieldId="item.fieldId"
          :fielidText="item.fielidText"
          :placeholder="`请选择${item.label}`"
        />
        <el-date-picker
          v-if="item.type === 'date'"
          v-model="form[item.name]"
          type="date"
          :placeholder="`请选择${item.label}`"
          :format="item.format"
        />
        <el-date-picker
          v-if="item.type === 'datetime'"
          v-model="form[item.name]"
          type="datetime"
          :placeholder="`请选择${item.label}`"
          :format="item.format"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="dateSet.disabled.value"
          type="primary"
          @click="handelQuery"
          :loading="dateSet.butQuery.value"
        >
          查 询
        </el-button>
        <el-button :disabled="dateSet.disabled.value" @click="resetForm">重 置</el-button>
      </el-form-item>
    </el-form>
    <div class="headerButtons">
      <template v-for="item in headerButtons as headerButtonsObj[]">
        <el-button
          v-if="typeof item === 'string' && item === 'refresh'"
          :key="item"
          type="primary"
          text
          @click="query"
        >
          <span
            style="font-size: 12px; margin-right: 6px"
            class="iconfont"
            :class="`icon-shuaxin`"
          />
          刷新
        </el-button>
        <el-button
          type="primary"
          v-if="typeof item === 'object'"
          :key="item.name"
          text
          @click="item.click()"
        >
          <span
            v-if="item.icon"
            style="font-size: 12px; margin-right: 6px"
            class="iconfont"
            :class="`icon-${item.icon}`"
          />
          {{ item.name }}
        </el-button>
      </template>
    </div>
    <el-table
      :row-key="dateSet.primaryKey"
      :data="dateSet.tableData.value"
      v-loading="dateSet.disabled.value"
      border
      stripe
      @selection-change="handleSelectionChange"
      :size="size"
      ref="tableRef"
    >
      <el-table-column
        v-if="dateSet.multiple"
        type="selection"
        width="45"
        :reserve-selection="dateSet.reserveSelection"
      />
      <el-table-column
        v-for="item in dateSet.fields"
        :key="item.name"
        :label="item.label"
        show-overflow-tooltip
        :width="item.width"
        :prop="item.name"
        :min-width="item.minWidth"
        :fixed="item.fixed"
      >
        <template #default="scope">
          <expandDom v-if="item.render" :render="item.render" :params="scope.row" />
          <span v-else-if="item.type === 'text'">{{ scope.row[item.name] }}</span>
          <el-date-picker
            v-else-if="item.type === 'datetime'"
            readonly
            :prefix-icon="customPrefix('shijian')"
            v-model="scope.row[item.name]"
            type="datetime"
            placeholder="Select date and time"
          />
          <el-date-picker
            v-else-if="item.type === 'date'"
            v-model="scope.row[item.name]"
            type="date"
            :placeholder="`请选择${item.label}`"
            v-bind="$attrs"
          />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty />
      </template>
    </el-table>
    <el-pagination
      v-if="dateSet.paging"
      :current-page="dateSet.currentPage.value"
      :page-size="dateSet.pageSize?.value"
      :page-sizes="dateSet.pageSizes"
      :disabled="dateSet.disabled.value"
      :background="background"
      :layout="dateSet.pagingLayout"
      :total="dateSet.total.value"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="pagination"
      :class="!background && border && 'pag_border'"
      :small="size === 'small'"
    />
  </div>
</template>

<script setup lang="tsx">
import { ref, PropType, defineComponent } from 'vue';
import { DateSetType, headerButtonsType, headerButtonsObj } from './type';
import UpLook from '@/components/baseUi/uplook/index.vue';
import { ElTable } from 'element-plus';

defineOptions({
  name: 'BaseTable',
});

const props = defineProps({
  dateSet: {
    type: Object as PropType<DateSetType>,
    default: () => {},
  },
  headerButtons: {
    type: Array as PropType<headerButtonsType[]>,
    default: () => [],
  },
  border: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<'large' | 'default' | 'small'>,
    default: 'large',
  },
  background: {
    type: Boolean,
    default: false,
  },
});

const tableRef = ref<InstanceType<typeof ElTable>>();

const formQuery: { [index: string]: string } = {};
props.dateSet.queryform?.forEach((item) => {
  formQuery[item.name] = item.defaultValue || '';
});
const form = ref<any>({ ...formQuery });

async function query() {
  const beforeQuery =
    props.dateSet.events?.beforeQuery &&
    props.dateSet.events.beforeQuery({ dataSet: props.dateSet, params: form.value });
  if (typeof beforeQuery === 'boolean' && beforeQuery === false) {
    return;
  }
  let params = {};
  if (typeof beforeQuery === 'object') {
    params = beforeQuery;
  }
  props.dateSet.query(params);
}

const handleSelectionChange = (val: any) => {
  props.dateSet.setMultipleSelection(val);
};

/**
 * 查询按钮的处理事件
 */
async function handelQuery() {
  try {
    props.dateSet.setLoading(true);
    props.dateSet.setFormData(form.value);
    await query();
  } catch (error: any) {
    throw new Error(error);
  } finally {
    props.dateSet.setLoading(false);
  }
}

function handleSizeChange(val: number) {
  props.dateSet.handleSize(val);
  query();
}
function handleCurrentChange(val: number) {
  props.dateSet.handleCurrent(val);
  query();
}

function resetForm() {
  props.dateSet.events?.reset && props.dateSet.events.reset();
  form.value = { ...formQuery };
  query();
}

defineExpose({
  // multipleSelection,
});

const expandDom = defineComponent({
  name: 'expandDom',
  functional: true,
  props: ['render', 'params'],
  render() {
    return typeof this.render === 'function' ? this.render(this.params) : this.render;
  },
});

const customPrefix = (icon: string) => {
  return <span class={`iconfont icon-${icon}`}></span>;
};
</script>

<style scoped lang="less">
.tabel {
  overflow: hidden;
  .custom_border {
    :deep(.el-table__header) {
      thead {
        .el-table__cell {
          &::after {
            content: '';
            display: inline-block;
            width: 1px;
            height: 50%;
            background-color: #0000000f;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translate(-1px, -50%);
          }
        }
      }
    }
  }
  .pag_border {
    &:deep(.el-pager) {
      .number {
        border: 1px solid var(--el-border-color);
        margin: 0 4px;
      }
    }
    &:deep(.btn-prev) {
      border: 1px solid var(--el-border-color);
      margin: 0 4px;
      margin-left: var(--el-pagination-item-gap);
    }
    &:deep(.btn-next) {
      border: 1px solid var(--el-border-color);
      margin: 0 4px;
    }
  }
  :deep(.el-date-editor--datetime) {
    max-width: 100%;
  }
}
.pagination {
  margin-top: 12px;
  float: right;
}
.headerButtons {
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 6px;
  .el-button {
    padding: 6px;
  }
  .el-button + .el-button {
    margin-left: 6px;
  }
}
</style>
