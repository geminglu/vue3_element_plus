<template>
  <div class="my_info">
    <el-form ref="ruleFormRef" class="form" :model="form" label-width="120px" :rules="formRules">
      <el-form-item label="头像" prop="avatars">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          drag
          list-type="picture-card"
          :action="`${axiosDefault.defaults.baseURL}/v1/upload/staticFile`"
          :on-success="handleAvatarSuccess"
          accept=".png,.jpg,.webp,.jpeg"
        >
          <el-image
            class="avatar"
            v-if="form.avatars"
            :src="`${axiosDefault.defaults.baseURL}${form.avatars}`"
            fit="cover"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户姓名" prop="name">
        <el-input v-model.trim="form.name" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <span style="margin-right: 12px">{{ form.email }}</span>
        <el-link type="primary" :underline="false" @click="upEmail">修改</el-link>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio-button label="1">男</el-radio-button>
          <el-radio-button label="0">女</el-radio-button>
          <el-radio-button label="">保密</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" :loading="submitLoading" type="primary" @click="onSubmit">
          保 存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="tsx">
import { ref, reactive } from 'vue';
import useUserStore from '@/store/modules/user';
import { emailReg, phoneReg } from '@/utils/regular';
import axiosDefault from '@/utils/request';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { ResultType } from '#/request';
import { updateMyUser, verifyType } from '@/serivce/user';
import { emailVerify, modificEmail } from '@/components/Verify/hook';
import type { FormRules, FormInstance } from 'element-plus';

defineOptions({
  name: 'MyInfo',
});

const ruleFormRef = ref<FormInstance>();
const useStore = useUserStore();
const submitLoading = ref<boolean>(false);

const form = reactive<{ [index: string]: any; gender: '0' | '1' | '' }>({
  avatars: useStore.userInfo?.avatars || '',
  name: useStore.userInfo?.name || '',
  email: useStore.userInfo?.email || '',
  gender: useStore.userInfo?.gender || '',
});

const formRules: FormRules = {
  email: [
    { required: true, message: '请输入邮箱地址' },
    { pattern: emailReg, message: '邮箱地址格式不正确' },
  ],
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { max: 10, min: 2, message: '字符个数必须在2-10之间', trigger: 'blur' },
  ],
  phone: [{ pattern: phoneReg, message: '手机号格式错误', trigger: 'blur' }],
  gender: [{ required: false, trigger: 'blur' }],
};

function handleAvatarSuccess(response: ResultType<string>) {
  if (response.success) {
    form.avatars = response.data || '';
  } else {
    ElMessage.error('上传失败');
  }
}

const onSubmit = async () => {
  ruleFormRef.value?.validate(async (valid: any) => {
    if (valid) {
      try {
        submitLoading.value = true;
        const parma = {
          avatars: form?.avatars,
          name: form?.name,
          gender: form?.gender,
        };
        const res = await updateMyUser(parma);
        useStore.userInfo = res.data || null;
        ElMessage.success('保存成功');
      } catch (error) {
        //
      } finally {
        submitLoading.value = false;
      }
    }
  });
};

/**
 * 修改邮箱
 */
async function upEmail() {
  const token = await emailVerify(verifyType.UPEMAIL);
  await modificEmail(token);
  ElMessage.success('邮箱修改成功');
}
</script>

<style scoped lang="less">
.my_info {
  margin: 24px 0;
}
.form {
  width: 400px;
  .avatar-uploader {
    .avatar {
      width: 100%;
      height: 100%;
      border-radius: var(--el-border-radius-base);
    }
    :deep(.el-upload) {
      border: none;
      width: 130px;
      height: 130px;
    }
    :deep(.el-upload-dragger) {
      height: 100%;
      padding: 0;
    }
    :deep(.avatar-uploader-icon) {
      font-size: 28px;
      height: 100%;
      width: 100%;
      font-size: 38px;
    }
  }
}
</style>
