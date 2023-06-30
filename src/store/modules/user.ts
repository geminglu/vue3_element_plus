import { defineStore } from 'pinia';
export interface userInfoType {
  /**
   * 头像
   */
  avatars?: string;
  /**
   * 创建时间
   */
  createAt?: Date;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 性别，1：男；0：女
   */
  gender?: '1' | '0';
  /**
   * 1：启用；0：禁用
   */
  isActive: '1' | '0';
  /**
   * 用户名，用户姓名在2-10之间
   */
  name?: string;
  /**
   * 手机号
   */
  phone?: string;
  /**
   * 角色，0：管理员：1：普通用户
   */
  role?: '1' | '0';
  id: string
}

export interface userType {
  /** access_token */
  access_token: string;
  /** refresh_token */
  refresh_token: string;
  /** 公钥 */
  publicKey?: string;
  userInfo: userInfoType | null;
}

const useUserStore = defineStore('userStore', {
  state: (): userType => ({
    access_token: '',
    refresh_token: '',
    publicKey: '',
    userInfo: null,
  }),
  persist: true,
  actions: {
    /**
     * 设置token
     * @param value
     */
    async setToken(accessToken = '', refreshToken = '') {
      this.access_token = accessToken;
      this.refresh_token = refreshToken;
    },


    /**
     *  退出登陆
     */
    logout() {
      this.setToken();
      this.userInfo = null;
    },
  },
});

export default useUserStore;
