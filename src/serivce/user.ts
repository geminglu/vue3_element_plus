import { request } from '@/utils/request';
import { userInfoType } from '@/store/modules/user';

/**
 * 验证码接口数据
 */
export type captchaType = {
  id: string;
  code: string;
};

/**
 * CaptchaDto
 */
export interface CaptchaDto {
  /**
   * 高度(px)
   */
  height?: number;
  /**
   * 宽度(px)
   */
  width?: number;
}

/**
 * LoginDto
 */
export interface loginDto {
  /**
   * 邮箱/用户名/手机号
   */
  account: string;
  /**
   * 验证码
   */
  captchaCode: string;
  /**
   * 验证码id
   */
  captchaId: string;
  /**
   * 密码
   */
  password: string;
}

export interface loginDtoRequest {
  access_token: string;
  refresh_token: string;
}

export interface ceratedUser {
  /**
   * 头像
   */
  avatars?: string;
  /**
   * 邮箱
   */
  email: string;
  /**
   * 性别，1：男；0：女
   */
  gender?: '0' | '1';
  /**
   * 1：启用；0：禁用
   */
  isActive?: '0' | '1';
  /**
   * 用户名，用户姓名在2-10之间
   */
  name: string;
  /**
   * 手机号
   */
  phone?: string;
  /**
   * 角色，0：管理员：1：普通用户
   */
  role?: '0' | '1';
  /**
   * 密码
   */
  password: string;
}

export type updateUserType = Partial<Omit<ceratedUser, 'password'>>;

/**
 * 获取图形验证吗
 */
export function getCaptcha(captchaCf?: CaptchaDto) {
  return request<captchaType>({
    url: '/v1/auth/getCaptcha',
    method: 'post',
    data: captchaCf,
  });
}

/**
 * 用户登陆
 */
export function login(data: loginDto) {
  return request<loginDtoRequest>({
    url: '/v1/auth/login',
    method: 'post',
    data,
  });
}

/**
 * 获取用户信息
 */
export function queryUserInfo() {
  return request<userInfoType>({
    url: '/v1/user/userInfo',
    method: 'get',
  });
}

/**
 * 获取公钥
 */
export function getPublicKey() {
  return request<string>({
    url: '/v1/auth/getPublicKey',
  });
}

/**
 * 添加用户
 */
export function createdUser(data: ceratedUser) {
  return request<userInfoType>({
    url: '/v1/user',
    method: 'post',
    data,
  });
}

/**
 * 更新用户信息
 */
export function updateUser(id: string, data: updateUserType) {
  return request<userInfoType>({
    url: `/v1/user/${id}`,
    method: 'patch',
    data,
  });
}

/**
 * 删除用户
 * @param id 需要删除的用户id
 */
export function deleteUser(id: string) {
  return request<userInfoType>({
    url: `/v1/user/${id}`,
    method: 'delete',
  });
}
