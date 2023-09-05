import Modal from '@/components/baseUi/modal';
import EmailVerifyVue from './emailVerify.vue';
import UpEmail from '@/components/Verify/upEmail.vue';
import { verifyType } from '@/serivce/user';

/**
 * 邮箱验证
 * @param type 验证类型
 */
export function emailVerify(type: verifyType): Promise<string> {
  return new Promise((resolve, reject) => {
    const modal = Modal.open({
      title: '邮箱验证',
      width: '408px',
      showFullscreen: false,
      fullscreen: false,
      draggable: true,
      body: <EmailVerifyVue onSuccess={success} onFail={fail} type={type} />,
      isShowFooter: false,
    });
    function success(data: string) {
      resolve(data);
      modal.close();
    }
    function fail(message: string) {
      // reject(message);
    }
  });
}

/**
 * 修改邮箱
 */
export function modificEmail(token: string) {
  return new Promise((resolve, reject) => {
    const modal = Modal.open({
      title: '修改邮箱',
      width: '408px',
      showFullscreen: false,
      fullscreen: false,
      draggable: true,
      body: <UpEmail token={token} onSuccess={success} onFail={fail} />,
      isShowFooter: false,
    });
    function success(data: string) {
      resolve(data);
      modal.close();
    }
    function fail(message: string) {
      reject(message);
    }
  });
}
