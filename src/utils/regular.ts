import type { FormRules } from 'element-plus';

/** 用户名 */
export const userNAmeReg = /^[0-9a-zA-Z|@|_|-|.]{3,30}$/;
/** 验证码 */
export const codeReg = /^[0-9a-zA-Z]{4}$/;
/** 邮箱 */
export const emailReg = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
/** 手机号 */
export const phoneReg = /^1[1-9]{10}$/;

/**
 * 密码必须包含字母、数字、特殊字符两种以上,且长度在8-16位
 */
export const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,16}$/;

export const formRules: FormRules<'email'> = {
  email: [
    { required: true, message: '请输入邮箱地址' },
    { pattern: emailReg, message: '邮箱地址格式不正确' },
  ],
};
