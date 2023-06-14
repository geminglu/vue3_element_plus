import { AxiosRequestConfig } from 'axios';

export interface headerButtonsType {
  name: string;
  icon: string;
  click: () => void;
}

interface TransportType {
  read: AxiosRequestConfig | ((params: any) => AxiosRequestConfig);
}
interface FieldsType {
  name: string;
  type: string;
  label: string;
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
}
export interface DateSetType {
  config: configType;
  query: () => any;
}
