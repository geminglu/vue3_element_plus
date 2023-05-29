import { request } from '@/utils/request';

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

/**
 * 获取系统菜单
 */
export function getMenu() {
  return request({
    url: '/v1/system/menu',
    method: 'get',
  });
}

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
 * 获取公钥
 */
export function getPublicKey() {
  return request<string>({
    url: '/v1/auth/getPublicKey',
  });
}
