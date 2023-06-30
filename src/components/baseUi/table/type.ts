import { AxiosRequestConfig } from 'axios';

export interface headerButtonsObj {
  name: string;
  icon: string;
  click: () => void;
}

export type headerButton = 'refresh' | 'dele';

export type headerButtonsType = headerButton | headerButtonsObj;
interface TransportType {
  read: AxiosRequestConfig | ((params: any) => AxiosRequestConfig);
}
interface FieldsType {
  name: string;
  type: 'text' | 'datetime' | 'time' | 'date';
  label: string /** 对应列的宽度 */;
  width?: string | number;
  /** 对应列的最小宽度， 对应列的最小宽度， 与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列 */
  minWidth?: string | number;
  /** 列是否固定在左侧或者右侧。 true 表示固定在左侧 */
  fixed?: string | boolean;
  render?: (param: any) => JSX.Element;
}
interface uplookType {
  field: string;
  value: any;
}
interface QueryType {
  name: string;
  type: string;
  label: string;
  /** 默认值 */
  defaultValue?: any;
  uplookList?: uplookType[];
}

export interface configType {
  query?: QueryType[];
  /** 开启自动查询 */
  autoQuery?: boolean;
  /** transport 存在时queryUrl将无效 */
  queryUrl?: string;
  queryParameter?: { [index: string]: string };
  /** transport 存在时queryUrl将无效 */
  transport?: TransportType;
  fields: FieldsType[];
  /** 响应拦截器 */
  response?: (res: any) => any[];
  /** 主键如果有嵌套需要使用 */
  primaryKey?: string;
}
export interface DateSetType {
  config: configType;
  query: () => any;
  /** 加载数据 */
  load: (data: any) => any;
}
