<template>
  <div class="tabel">
    <el-form
      v-if="dateSet.config.query && dateSet.config.query.length"
      :inline="true"
      v-model="form"
    >
      <el-form-item v-for="item in dateSet.config.query" :key="item.name" :label="item.label">
        <el-input v-if="item.type === 'text'" v-model="form[item.name]" clearable />
        <el-select v-if="item.type === 'uplook'" v-model="form[item.name]" clearable>
          <el-option
            v-for="l in item.uplookList"
            :key="l.field"
            :label="l.field"
            :value="l.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="disabled" type="primary" @click="handelQuery" :loading="butQuery">
          查 询
        </el-button>
        <el-button :disabled="disabled" @click="resetForm">重 置</el-button>
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
      :row-key="dateSet.config.primaryKey"
      :data="tableData"
      v-loading="disabled"
      border
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="isSelection" type="selection" width="45" />
      <el-table-column
        v-for="item in dateSet.config.fields"
        :key="item.name"
        :label="item.label"
        show-overflow-tooltip
        :width="item.width"
        :prop="item.name"
        :min-width="item.minWidth"
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
        </template>
      </el-table-column>
      <template #empty>
        <el-empty />
      </template>
    </el-table>
    <el-pagination
      v-if="paging"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      :disabled="disabled"
      :background="background"
      :layout="pagingLayout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="pagination"
    />
  </div>
</template>

<script setup lang="tsx">
import { ref, PropType, defineComponent } from 'vue';
import { DateSetType, headerButtonsType, headerButtonsObj } from './type';
import { request } from '@/utils/request';
import { AxiosRequestConfig } from 'axios';

defineOptions({
  name: 'BaseTable',
});

const props = defineProps({
  dateSet: {
    type: Object as PropType<DateSetType>,
    default: () => {},
  },
  pageSize: {
    type: Number,
    default: 100,
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => [100, 200, 300, 400],
  },
  /** 是否有分页 */
  paging: {
    type: Boolean,
    default: true,
  },
  pagingLayout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper',
  },
  headerButtons: {
    type: Array as PropType<headerButtonsType[]>,
    default: () => [],
  },
  /** 多选 */
  isSelection: {
    type: Boolean,
    default: false,
  },
});
const formQuery: { [index: string]: string } = {};
props.dateSet.config.query?.forEach((item) => {
  formQuery[item.name] = item.defaultValue || '';
});
const form = ref({ ...formQuery });
const tableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(props.pageSize);
const background = ref(false);
const disabled = ref(false);
const butQuery = ref(false);
const total = ref(0);
/** 选中的行数据 */
const multipleSelection = ref([]);

// eslint-disable-next-line vue/no-mutating-props
props.dateSet.query = () => {
  query();
};
props.dateSet.load = load;

async function query() {
  try {
    disabled.value = true;
    let result;
    const param: {
      [x: string]: string | number;
    } = {
      ...form.value,
    };
    if (props.paging) param.page = currentPage.value;
    if (props.paging) param.pageSize = pageSize.value;

    if (props.dateSet.config.transport?.read) {
      let axiosRequestConfig: AxiosRequestConfig = {};
      if (typeof props.dateSet.config.transport?.read === 'function') {
        axiosRequestConfig = props.dateSet.config.transport?.read(param);
      } else {
        // eslint-disable-next-line vue/no-setup-props-destructure
        axiosRequestConfig = props.dateSet.config.transport?.read;
      }
      result = await request(axiosRequestConfig);
    } else if (props.dateSet.config.queryUrl) {
      result = await request({
        url: props.dateSet.config.queryUrl,
        params: param,
      });
    } else {
      throw new Error('queryUrl和transport.read至少有一项');
    }
    let list = [];
    if (result.data?.list) {
      list = result.data.list;
      total.value = result.data.total;
    } else {
      list = result.data;
      total.value = result.data?.length || 0;
    }

    tableData.value = props.dateSet.config.response ? props.dateSet.config.response(list) : list;
  } catch (error: any) {
    throw new Error(error);
  } finally {
    disabled.value = false;
  }
}

const handleSelectionChange = (val: any) => {
  multipleSelection.value = val;
};

function load(data: any) {
  tableData.value = data;
}

/**
 * 查询按钮的处理事件
 */
async function handelQuery() {
  try {
    butQuery.value = true;
    await query();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  } finally {
    butQuery.value = false;
  }
}

function handleSizeChange(val: number) {
  query();
}
function handleCurrentChange(val: number) {
  query();
}

function resetForm() {
  form.value = { ...formQuery };
  query();
}

props.dateSet.config.autoQuery && query();

defineExpose({
  multipleSelection,
});

const expandDom = defineComponent({
  name: 'expandDom',
  functional: true,
  props: ['render', 'params'],
  render() {
    return typeof this.render === 'function' ? this.render(this.params) : this.render;
  },
});

// const customPrefix = shallowRef({
// name: 'expandDom',
// functional: true,
// props: ['render', 'params'],
// render() {
//   return typeof this.render === 'function' ? this.render(this.params) : this.render;
// },
// });
const customPrefix = (icon: string) => {
  return <span class={`iconfont icon-${icon}`}></span>;
};
</script>

<style scoped lang="less">
.tabel {
  overflow: hidden;
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
