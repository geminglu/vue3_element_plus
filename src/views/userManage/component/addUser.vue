<template>
  <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="80">
    <el-form-item label="用户姓名" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model.trim="form.email" />
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="form.phone" :maxlength="11" />
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-radio-group v-model="form.gender">
        <el-radio-button label="1">男</el-radio-button>
        <el-radio-button label="0">女</el-radio-button>
        <el-radio-button label="">保密</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否启用" prop="isActive">
      <el-switch v-model="form.isActive" active-value="1" inactive-value="0" />
    </el-form-item>
    <el-form-item label="角色" prop="role">
      <el-select v-model="form.role">
        <el-option
          v-for="item in roles"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item v-if="!data" label="密码" prop="password">
      <el-input v-model.trim="form.password" show-password type="password" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="tsx">
import { ref, reactive, PropType } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { userInfoType } from '@/store/modules/user';

defineOptions({
  name: 'AddMenu',
});

const props = defineProps({
  data: {
    type: Object as PropType<userInfoType>,
  },
});

const ruleFormRef = ref<FormInstance>();
const form = reactive({
  avatars: props.data?.avatars || '',
  email: props.data?.email || '',
  gender: props.data?.gender || '',
  isActive: props.data?.isActive || '1',
  name: props.data?.name || '',
  phone: props.data?.phone || '',
  role: props.data?.role || '1',
  password: '',
});
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { max: 10, min: 2, message: '字符个数必须在2-10之间', trigger: 'blur' },
  ],
  phone: [{ pattern: /^1[1-9]{10}$/, message: '手机号格式错误', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入电子邮箱地址', trigger: 'blur' },
    { type: 'email', message: '邮箱地址格式错误', trigger: 'blur' },
  ],
  gender: [{ required: false, trigger: 'blur' }],
  isActive: [{ required: false, trigger: 'blur' }],
  role: [{ required: false, trigger: 'blur' }],
  password: [{ required: true, message: '请输入用户密码', trigger: 'blur' }],
});

const roles = [
  {
    value: '0',
    label: '管理员',
  },
  {
    value: '1',
    label: '用户',
  },
];

async function complete() {
  return (await ruleFormRef.value?.validate()) && form;
}

defineExpose({
  complete,
});
</script>

<style scoped lang="less"></style>
