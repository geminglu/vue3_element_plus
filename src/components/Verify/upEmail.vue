<template>
  <div class="UpPass">
    <el-form ref="ruleFormRef" :model="form" :rules="formRules">
      <el-form-item prop="code">
        <el-input
          style="margin-bottom: 12px"
          v-model.trim="form.email"
          placeholder="请输入新的邮箱地址"
        />
      </el-form-item>
      <el-form-item>
        <el-button :loading="load" style="width: 100%" type="primary" @click="confirm">
          确 认
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { updateEmail } from '@/serivce/user';
import type { FormRules, FormInstance } from 'element-plus';

defineOptions({
  name: 'UpEmail',
});

interface PropsType {
  token: string;
  onSuccess: (data: string) => void;
  onFail: (message: string) => void;
}
const props = defineProps<PropsType>();
const ruleFormRef = ref<FormInstance>();
const form = reactive({
  email: '',
});
const formRules: FormRules = {
  email: [
    { required: true, message: '请输入邮箱地址' },
    { type: 'email', message: '邮箱地址格式不正确' },
  ],
};

const load = ref(false);

async function confirm() {
  if (!ruleFormRef.value) return;
  await ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        load.value = true;
        const parma = {
          token: props.token,
          email: form.email,
        };
        await updateEmail(parma);
        props.onSuccess(form.email);
      } catch (error: any) {
        props.onFail(error.message);
      } finally {
        load.value = false;
      }
    }
  });
}
</script>

<style scoped lang="less">
.UpPass {
}
</style>
