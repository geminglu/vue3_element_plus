import { request } from '@/utils/request';

/**
 * 是否隐藏菜单
 */
export enum Hidden {
  NO = '0',
  YES = '1',
}

/**
 * type
 */
export enum Type {
  Directory = 'directory',
  Menu = 'menu',
}

/**
 * ResSystemMenuDto
 */
export interface ResSystemMenuDto {
  /**
   * createAt
   */
  createAt?: string;
  /**
   * 是否隐藏菜单
   */
  hidden: Hidden;
  /**
   * icon
   */
  icon?: string;
  /**
   * id
   */
  id: string;
  /**
   * 路由名称，如果是是菜单路由名称就必须存在
   */
  name?: string;
  pid?: string;
  /**
   * title
   */
  title: string;
  /**
   * type
   */
  type: Type;
}

export type addSystemMenu = Omit<ResSystemMenuDto, 'createAt' | 'id'>;

export type exitSystemMenu = Omit<ResSystemMenuDto, 'createAt' | 'pid'>;

/**
 * 获取系统菜单
 */
export function getMenu() {
  return request<ResSystemMenuDto[]>({
    url: '/v1/system/menu',
    method: 'get',
  });
}

/**
 * 获取权限菜单
 */
export function getPermissionMenu() {
  return request<ResSystemMenuDto[]>({
    url: '/v1/system/permissionMenu',
    method: 'get',
  });
}

/**
 * 创建系统菜单
 */
export function createMenu(data: addSystemMenu) {
  return request<ResSystemMenuDto[]>({
    url: '/v1/system/menu',
    method: 'post',
    data,
  });
}

/**
 * 编辑系统菜单
 */
export function editSystemMenu(data: exitSystemMenu) {
  return request({
    url: `/v1/system/menu/${data.id}`,
    method: 'patch',
    data,
  });
}

/**
 * 删除系统菜单
 */
export function deleSystemMenu(id: string) {
  return request({
    url: `/v1/system/menu/${id}`,
    method: 'delete',
  });
}
