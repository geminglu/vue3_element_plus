import { v4 as uuidv4 } from 'uuid';
import {
  ComponentsType,
  TagType,
  Components,
  ConfigInputProps,
  ConfigInputNumberProps,
  ConfigFormProps,
} from './configType';

const configInputProps: Partial<ConfigInputProps> = { title: '单行文本' };
const configInputNumberProps: Partial<ConfigInputNumberProps> = {
  title: '计数器',
};
const configFormProps: Partial<ConfigFormProps> = {
  labelWidth: 100,
};

/** 表单控件 */
export const controlComponents: Array<ComponentsType> = [
  {
    /** 控件类型 */
    type: 'form',
    label: 'Form控件',
    group: 'formGroup',
    components: [
      {
        typeName: '单行文本',
        tag: TagType.input,
        tagIcon: 'icon-danhangshuru',
        prop: configInputProps,
      },
      {
        typeName: '计数器',
        tag: TagType.inputNumber,
        tagIcon: 'icon-number',
        prop: configInputNumberProps,
      },
    ],
  },
  {
    type: 'container',
    label: '容器组件',
    group: 'componentsGroup',
    components: [
      {
        typeName: 'form表单',
        tag: TagType.form,
        tagIcon: 'icon-form',
        prop: configFormProps,
        components: [
          {
            id: uuidv4(),
            typeName: '计数器',
            tag: TagType.inputNumber,
            tagIcon: 'icon-number',
            prop: configInputNumberProps,
          },
        ],
      },
    ],
  },
];
