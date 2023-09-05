import { ref } from 'vue';
import type { configType, DateSetType } from './type';
import { AxiosRequestConfig } from 'axios';
import { request } from '@/utils/request';

export class DataSet implements DateSetType {
  /** 开启自动查询 */
  autoQuery = false;
  /** transport 存在时queryUrl将无效 */
  queryUrl = '';
  queryParameter = {};
  /** transport 存在时queryUrl将无效 */
  transport;
  fields;
  queryform;
  /** 响应拦截器 */
  response;
  /** 主键如果有嵌套需要使用 */
  primaryKey;
  formQuery = {};
  tableData = ref([]);
  currentPage = ref(1);
  /** 分页大小 */
  pageSize = ref(100);
  pageSizes = [100, 200, 300, 400];
  background = ref(false);
  disabled = ref(false);
  butQuery = ref(false);
  total = ref(0);
  paging = true;
  multiple = false;
  /** 选中的行数据 */
  multipleSelection = ref([]);
  pagingLayout = 'total, sizes, prev, pager, next, jumper';

  constructor(dataSet: configType) {
    dataSet.autoQuery !== undefined && (this.autoQuery = dataSet.autoQuery);
    dataSet.queryUrl !== undefined && (this.queryUrl = dataSet.queryUrl);
    dataSet.transport !== undefined && (this.transport = dataSet.transport);
    this.fields = dataSet.fields;
    dataSet.response !== undefined && (this.response = dataSet.response);
    dataSet.primaryKey !== undefined && (this.primaryKey = dataSet.primaryKey);
    dataSet.paging !== undefined && (this.paging = dataSet.paging);
    dataSet.multiple !== undefined && (this.multiple = dataSet.multiple);
    dataSet.pagingLayout !== undefined && (this.pagingLayout = dataSet.pagingLayout);
    dataSet.queryform !== undefined && (this.queryform = dataSet.queryform);

    // 如果autoQuery为true调用query函数
    this.autoQuery && this.query();
  }

  async query() {
    try {
      this.disabled.value = true;
      let result;
      const param: {
        [x: string]: string | number;
      } = {
        ...this.formQuery,
      };
      if (this.paging) param.page = this.currentPage.value;
      if (this.paging) param.pageSize = this.pageSize.value;

      if (this.transport?.read) {
        let axiosRequestConfig: AxiosRequestConfig = {};
        if (typeof this.transport?.read === 'function') {
          axiosRequestConfig = this.transport?.read(param);
        } else {
          axiosRequestConfig = this.transport?.read;
        }
        result = await request(axiosRequestConfig);
      } else if (this.queryUrl) {
        result = await request({
          url: this.queryUrl,
          params: param,
        });
      } else {
        throw new Error('queryUrl和transport.read至少有一项');
      }
      let list = [];
      if (result.data?.list) {
        list = result.data.list;
        this.total.value = result.data.total;
      } else {
        list = result.data;
        this.total.value = result.data?.length || 0;
      }

      this.tableData.value = this.response ? this.response(list) : list;
    } catch (error: any) {
      throw new Error(error);
    } finally {
      this.disabled.value = false;
    }
  }

  load() {}
}
