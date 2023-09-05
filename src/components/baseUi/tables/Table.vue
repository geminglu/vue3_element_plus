<template>
  <div class="tabel">
    <el-form v-if="dateSet.queryform" :inline="true" v-model="form">
      <el-form-item v-for="item in dateSet.queryform" :key="item.name" :label="item.label">
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
    >
      <el-table-column v-if="dateSet.multiple" type="selection" width="45" />
      <el-table-column
        v-for="item in dateSet.fields"
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
      v-if="dateSet.paging"
      :current-page="dateSet.currentPage.value"
      :page-size="dateSet.pageSize?.value"
      :page-sizes="dateSet.pageSizes"
      :disabled="dateSet.disabled.value"
      :background="dateSet.background.value"
      :layout="dateSet.pagingLayout"
      :total="dateSet.total.value"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="pagination"
    />
  </div>
</template>

<script setup lang="tsx">
import { ref, Ref, PropType, defineComponent } from 'vue';
import { DateSetType, headerButtonsType, headerButtonsObj, QueryType } from './type';

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
});

const formQuery: { [index: string]: string } = {};
props.dateSet.queryform?.forEach((item) => {
  formQuery[item.name] = item.defaultValue || '';
});
const form = ref<any>({ ...formQuery });

async function query() {
  props.dateSet.query();
}

const handleSelectionChange = (val: any) => {
  // multipleSelection.value = val;
};

function load(data: any) {
  // tableData.value = data;
}

/**
 * 查询按钮的处理事件
 */
async function handelQuery() {
  // try {
  //   butQuery.value = true;
  //   await query();
  // } catch (error) {
  //   // eslint-disable-next-line no-console
  //   console.log(error);
  // } finally {
  //   butQuery.value = false;
  // }
}

function handleSizeChange(val: number) {
  query();
}
function handleCurrentChange(val: number) {
  query();
}

function resetForm() {
  // form.value = { ...formQuery };
  // query();
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
