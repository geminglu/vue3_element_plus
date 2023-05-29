import { defineStore } from 'pinia';
import { getPublicKey, login, loginDto } from '@/serivce/user';
import { encrypt } from '@/utils/encrypt';

export interface userType {
  /** access_token */
  access_token: string;
  /** refresh_token */
  refresh_token: string;
  /** 公钥 */
  publicKey?: string;
}

const useUserStore = defineStore('userStore', {
  state: (): userType => ({
    access_token: '',
    refresh_token: '',
    publicKey: '',
  }),

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
     * 获取公钥
     */
    async genPublicKey() {
      // 获取公钥
      const publicKey = await getPublicKey();
      this.publicKey = publicKey.data;
      return publicKey.data;
    },

    /**
     * 登陆
     */
    async longIn(data: loginDto) {
      // 加密
      const pasEncrypted = await encrypt(data.password);
      const accountEncrypted = await encrypt(data.account);

      const param = {
        account: accountEncrypted || '',
        password: pasEncrypted || '',
        captchaCode: data.captchaCode,
        captchaId: data.captchaId,
      };
      const result = await login(param);
      this.setToken(result.data?.access_token, result.data?.refresh_token);
      return result;
    },

    /**
     *  退出登陆
     */
    logout() {
      this.setToken();
    },
  },
});

export default useUserStore;
