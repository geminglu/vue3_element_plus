import type { Component } from 'vue';

export type componentId = string;

/** label-position */
export enum Positio {
  left = 'left',
  right = 'right',
  top = 'top',
}

export enum AsteriskPosition {
  left = 'left',
  right = 'right',
}

export enum Size {
  large = 'large',
  default = 'default',
  small = 'small',
}

export enum Resize {
  none = 'none',
  both = 'both',
  horizontal = 'horizontal',
  vertical = 'vertical',
}

export type Autosize = {
  minRows: number;
  maxRows: number;
};

export enum TagType {
  form = 'form',
  input = 'input',
  inputNumber = 'inputNumber',
}

export enum inputType {
  text = 'text',
  textareas = 'textarea',
}

export interface ConfigFormProps {
  /** 行内表单模式 */
  inline: boolean;
  /** 标题长度 */
  labelWidth: number;
  /** 标题后缀 */
  labelSuffix: number;
  /** 是否隐藏必填字段标签旁边的红色星号 */
  hideRequiredAsterisk: boolean;
  /** 星号的位置 */
  requireAsteriskPosition: AsteriskPosition;
  /** 是否显示校验错误信息 */
  showMessage: boolean;
  /** 是否以行内形式展示校验信息 */
  inlineMessage: boolean;
  /** 是否在输入框中显示校验结果反馈图标 */
  statusIcon: boolean;
  /** 是否在 rules 属性改变后立即触发一次验证 */
  validateOnRuleChange: boolean;
  /** 用于控制该表单内组件的尺寸 */
  size: Size;
  /** 是否禁用该表单内的所有组件。 如果设置为 true, 它将覆盖内部组件的 disabled 属性 */
  disabled: boolean;
  /** 当校验失败时，滚动到第一个错误表单项 */
  scrollToError: boolean;
}

/**
 * input Number输入框属性
 */
export interface ConfigInputNumberProps {
  /** 字段名 */
  field: string;
  /** 字段值 */
  value: number;
  /** 标题 */
  title: string;
  /** 最小值 */
  min: number;
  /** 步长 */
  step: number;
  /** 步长的倍数 */
  stepStrictly: boolean;
  /** 数值精度 */
  precision: number;
  /** 只读 */
  readonly: boolean;
  /** 禁用 */
  disabled: boolean;
  /** 使用控制按钮 */
  controls: boolean;
  /** 占位文本 */
  placeholder: string;
}
/**
 * input输入框属性
 */
export interface ConfigInputProps {
  /** 字段名 */
  field: string;
  /** 字段值 */
  value: string;
  /** 标题 */
  title: string;
  /** 类型 */
  type: inputType;
  /** 最大输入长度 */
  maxlength: string | number;
  /** 原生属性，最小输入长度 */
  minlength: number;
  /** 是否显示统计字数, 只在 type 为 'text' 或 'textarea' 的时候生效 */
  showWordLimit: boolean;
  /** 输入框占位文本 */
  placeholder: string;
  /** 是否显示清除按钮，只有当 type 不是 textarea时生效 */
  clearable: boolean;
  /** 指定输入值的格式。(只有当 type 是"text"时才能工作) */
  formatter: string | number;
  /** 指定从格式化器输入中提取的值。(仅当 type 是"text"时才起作用) */
  parser: string;
  /** 是否显示切换密码图标 */
  showPassword: boolean;
  /** 是否禁用 */
  disabled: boolean;
  /** 自定义前缀图标 */
  prefixIcon: string;
  /** 前缀 */
  prepend: string | number;
  /** 后缀 */
  append: string | number;
  /** 自定义后缀图标 */
  suffixIcon: string;
  /** 输入框行数，仅 type 为 'textarea' 时有效 */
  rows: number;
  /** 原生 autocomplete 属性 */
  autocomplete: string;
  /** 等价于原生 input name 属性 */
  name: string;
  /** 原生  readonly 属性，是否只读 */
  readonly: boolean;
  /** 原生 max 属性，设置最大值 */
  max: number;
  /** 原生属性，设置最小值 */
  min: number;
  /** 原生属性，设置输入字段的合法数字间隔 */
  step: number;
  /** 控制是否能被用户缩放 */
  resize: string;
  /** 原生属性 */
  form: string;
  /** 等价于原生 input aria-label 属性 */
  label: string;
  /** 输入框的 tabindex */
  tabindex: string | number;
  /** 输入时是否触发表单的校验 */
  validateEvent: boolean;
  /** input 元素或 textarea 元素的 style */
  inputStyle: string;
}

export enum FieldType {
  auto = 'auto',
  boolean = 'boolean',
  number = 'number',
  currency = 'currency',
  string = 'string',
  date = 'date',
  dateTime = 'dateTime',
  week = 'week',
  month = 'month',
  year = 'year',
  time = 'time',
  object = 'object',
  intl = 'intl',
  email = 'email',
  url = 'url',
  color = 'color',
  reactNode = 'reactNode',
}

/** 控件 */
export interface Components {
  /** 类型名称 */
  readonly typeName: string;
  /** 标签 */
  tag: TagType;
  /** 控件icon */
  tagIcon: string;
  /** 控件id在运行时由代码自动生成 */
  id?: componentId;
  /** 控件属性 */
  prop: any;
  components?: any;
}

export interface ComponentsType {
  /** 组件类型 */
  type: string;
  /** lable */
  label: string;
  /** 组 */
  group: string;
  components: Array<Components>;
}
