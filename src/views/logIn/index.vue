<template>
  <div class="log_in">
    <canvas id="egg"></canvas>
    <div class="center">
      <div class="cg">
        <canvas id="simulant"></canvas>
      </div>
      <el-form
        size="large"
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        class="logInForm"
      >
        <el-form-item prop="userName">
          <el-input
            v-model.trim="loginForm.userName"
            maxlength="30"
            placeholder="用户名/手机号/邮箱"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model.trim="loginForm.password" maxlength="30" placeholder="密码" />
        </el-form-item>
        <el-form-item prop="code">
          <div class="vif">
            <el-input
              v-model.trim="loginForm.code"
              maxlength="4"
              placeholder="验证码"
              @keydown="submitForm(loginFormRef)"
            />
            <img :src="verifiCodeSvg.code" @click="genCaptcha" style="margin-left: 12px" />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            auto-insert-space
            type="primary"
            class="login_button"
            :loading="loading"
            @click="submitForm(loginFormRef)"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onBeforeMount } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { codeReg } from '@/utils/regular';
import { useRouter } from 'vue-router';
import { Application } from '../../../public/spline/runtime';
import { getCaptcha, captchaType } from '@/serivce/user';
import useUserStore from '@/store/modules/user';

const router = useRouter();
const userStore = useUserStore();

/** 登录表单元素 */
const loginFormRef = ref<FormInstance>();

/** 登录表单数据 */
const loginForm = reactive({
  /** 用户名 */
  userName: '',
  /** 密码 */
  password: '',
  /** 验证码 */
  code: '',
});

const loginFormRules = reactive<FormRules>({
  userName: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { max: 30, min: 3, message: '用户名长度为3-30位字符' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { max: 30, min: 3, message: '用户名长度为3-30位字符' },
  ],
  code: [
    { required: true, message: '验证码不能为空', trigger: 'blur' },
    {
      pattern: codeReg,
      message: '请输入4位验证码',
      trigger: 'blur',
    },
  ],
});

const loading = ref<boolean>(false);

/**
 * 验证码
 */
const verifiCodeSvg = reactive<captchaType>({
  id: '',
  code: '',
});

/**
 * 登陆
 */
async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return;

  if (await formEl.validate()) {
    try {
      loading.value = true;
      const param = {
        account: loginForm.userName,
        password: loginForm.password,
        captchaCode: loginForm.code,
        captchaId: verifiCodeSvg.id,
      };
      const result = await userStore.longIn(param);
      if (result.success) {
        if (router.currentRoute.value.query?.to) {
          router.replace(router.currentRoute.value.query?.to as string);
        } else {
          router.replace('/home');
        }
      } else {
        genCaptcha();
      }
    } catch (error) {
      genCaptcha();
      throw error;
    } finally {
      loading.value = false;
    }
  }
}

onBeforeMount(() => {
  genCaptcha();
});

onMounted(() => {
  const eggCanvas = document.getElementById('egg') as HTMLCanvasElement;
  const simulant = document.getElementById('simulant') as HTMLCanvasElement;
  const eggSpline = new Application(eggCanvas, {
    renderOnDemand: true,
  });
  const simulantSpline = new Application(simulant, {
    renderOnDemand: true,
  });
  fetch(location.origin + '/spline/egg.splinecode').then(async (o) =>
    eggSpline.start(await o.arrayBuffer())
  );
  fetch(location.origin + '/spline/hands.splinecode').then(async (o) =>
    simulantSpline.start(await o.arrayBuffer())
  );
});

/**
 * 生成图像验证码
 */
async function genCaptcha() {
  const res = await getCaptcha({ width: 100, height: 40 });
  const blobSvg = new Blob([res.data?.code || ''], { type: 'image/svg+xml' });
  verifiCodeSvg.code = URL.createObjectURL(blobSvg);
  verifiCodeSvg.id = res.data?.id || '';
}
</script>

<style scoped lang="less">
#egg {
  position: fixed;
}
.log_in {
  height: 100%;
  width: 100%;
  position: relative;
  background-image: linear-gradient(45deg, #24bf61, #a9e9dd);
}
.center {
  display: flex;
  overflow: hidden;
  width: 800px;
  height: 500px;
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  right: 50%;
  -webkit-backdrop-filter: saturate(50%) blur(12px);
  backdrop-filter: saturate(50%) blur(12px);
  background: #b7d3e14a;
  border-radius: 22px;
  box-shadow: #00000021 -20px 20px 20px 0px;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.5);
  .cg {
    width: 100%;
    height: 100%;
    position: relative;
    left: -100px;
  }
  .logInForm {
    width: 300px;
    margin-top: 130px;
    margin-right: 30px;
    float: right;
    position: absolute;
    right: 0;
    pointer-events: none;
    .el-form-item {
      pointer-events: all;
    }
    .login_button {
      width: 100%;
    }
    .vif {
      display: flex;
    }
    ::v-deep .el-input__wrapper {
      background-color: #ffffff6e;
    }
  }
}
</style>
