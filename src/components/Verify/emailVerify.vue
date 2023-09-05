<template>
  <div class="email_verify">
    <div class="verify_text">
      验证码将发送到您的<b class="user_email">{{ useStore.userInfo?.email }}</b
      >邮箱
    </div>
    <el-form ref="ruleFormRef" :model="form" :rules="formRules">
      <el-form-item prop="code">
        <div class="input_verify">
          <el-input :disabled="!verifyCodeId" v-model.trim="form.code" placeholder="请输入验证码" />
          <el-button class="but" :loading="sendLoad" :disabled="time !== null" @click="sendVerify">
            {{ time !== null ? `${time}秒后重试` : '发 送' }}
          </el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="!(verifyCodeId && form.code)"
          :loading="verifyLoad"
          style="width: 100%"
          type="primary"
          @click="verifyCode"
          >验 证</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import useUserStore from '@/store/modules/user';
import { generateEmailCode, verifyEmailCode, verifyType } from '@/serivce/user';
import type { FormInstance, FormRules } from 'element-plus';

defineOptions({
  name: 'EmailVerify',
});

interface PropsType {
  type: verifyType;
  onSuccess: (data: string) => void;
  onFail: (message: string) => void;
}
const props = defineProps<PropsType>();

let t: number | undefined;
const verifyEmail = localStorage.getItem('verifyEmail');
const verifyEmailTime = verifyEmail
  ? 60 - Math.floor((new Date().getTime() - Number(verifyEmail)) / 1000)
  : 0;

/** 发送按钮 CD */
const time = ref(verifyEmailTime && verifyEmailTime > 0 ? verifyEmailTime : null);

if (time.value && time.value > 0) {
  t = setInterval(() => {
    if (time.value === 0) {
      clearInterval(t);
      time.value = null;
    } else {
      time.value && time.value--;
    }
  }, 1000);
}

const form = reactive({
  code: '',
});
const ruleFormRef = ref<FormInstance>();
const verifyCodeId = ref(localStorage.getItem('verifyEmailId') || '');
const sendLoad = ref(false);
const verifyLoad = ref(false);

const useStore = useUserStore();

const formRules: FormRules = {
  code: [{ required: true, message: '请输入验证码' }],
};

/**
 * 发送验证码
 */
async function sendVerify() {
  try {
    sendLoad.value = true;
    const res = await generateEmailCode(useStore.userInfo?.email || '');
    verifyCodeId.value = res.data || '';

    time.value = 59;
    localStorage.setItem('verifyEmail', `${new Date().getTime()}`);
    localStorage.setItem('verifyEmailId', verifyCodeId.value);
    clearInterval(t);
    t = setInterval(() => {
      if (time.value === 0) {
        clearInterval(t);
        time.value = null;
      } else {
        time.value && time.value--;
      }
    }, 1000);
  } catch (error: any) {
    props.onFail(error.message);
  } finally {
    sendLoad.value = false;
  }
}

async function verifyCode() {
  if (!ruleFormRef.value) return;
  await ruleFormRef.value.validate(async (valid) => {
    try {
      verifyLoad.value = true;
      if (valid) {
        const parma = {
          codeId: verifyCodeId.value,
          type: props.type,
          verifyCode: form.code,
        };
        const res = await verifyEmailCode(parma);
        props.onSuccess(res.data || '');
        localStorage.removeItem('verifyEmailId');
      }
    } catch (error: any) {
      props.onFail(error.message);
    } finally {
      verifyLoad.value = false;
    }
  });
}
</script>

<style scoped lang="less">
.email_verify {
  .verify_text {
    margin-bottom: 12px;
  }
  .user_email {
    color: var(--el-color-primary);
  }
  .input_verify {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  .but {
    width: 150px;
    margin-left: 12px;
  }
}
</style>
