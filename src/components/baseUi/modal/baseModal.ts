import { ComponentInternalInstance } from 'vue';

export interface BaseModalProps {
  /** 宽度 */
  width?: string | number;
  /** 是否全屏 */
  fullscreen?: boolean;
  /** 是否显示关闭按钮 */
  showClose?: boolean;
  /** 是否显示切换全屏按钮，默认显示 */
  showFullscreen: boolean;
  /** title */
  title?: string;
  /** 是否允许拖拽 */
  draggable?: boolean;
  /** 是否水平垂直对齐对话框 */
  alignCenter: boolean;
  /** modal CSS 中的 margin-top 值 为空时对话框水平垂直居中 */
  top?: string;
  /** modal 按钮操作区的内容 */
  footer?: (() => JSX.Element) | JSX.Element;
  /** body */
  body?: (() => JSX.Element) | JSX.Element;
  /** 对话框标题的内容；会替换标题部分，但不会移除关闭按钮 */
  header?:
    | ((params: { close: () => void; titleId: string; titleClass: string }) => JSX.Element)
    | JSX.Element;
  /** 确认按钮的回调 返回false | Promise.resolve(false)或Promise.reject()不会关闭， 其他自动关闭 */
  onConfirm?: () => boolean | string | undefined | Promise<boolean | string | void> | void;
  /**
   * 关闭前的回调，会暂停 Dialog 的关闭. 回调函数内执行 done 参数方法的时候才是真正关闭对话框的时候.
   * @param done
   * @returns
   */
  beforeClose?: (done: () => void) => void;
  /** modal 打开的回调 */
  open: () => void;
  /** 打开动画结束时的回调 */
  opened: () => void;
  /** 关闭的回调 */
  close: () => void;
  /** 关闭动画结束时的回调 */
  closed: () => void;
  /** 输入焦点聚焦在 modal 内容时的回调 */
  openAutoFocus: () => void;
  /** 输入焦点从 modal 内容失焦时的回调 */
  closeAutoFocus: () => void;
}

export interface instanceType {
  /** modal id */
  id: string;
  vm: ComponentInternalInstance;
  /** 关闭当前modal */
  close: () => void;
  /** 关闭全部modal */
  closeAll: () => void;
}
