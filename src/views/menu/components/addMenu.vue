<template>
  <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="80">
    <el-form-item label="类型" prop="type">
      <el-radio-group v-model="form.type" :disabled="Boolean(data?.type)">
        <el-radio-button label="directory">目录</el-radio-button>
        <el-radio-button label="menu">菜单</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="菜单名称" prop="title">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item v-if="form.type === 'menu'" label="路由名称" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item v-if="form.type === 'directory'" label="icon" prop="icon">
      <el-input readonly v-model="form.icon" placeholder="选择icon">
        <template #prepend>
          <span class="iconfont" :class="`icon-${form.icon}`"></span>
        </template>
        <template #append>
          <el-button @click="openSelectIcon(form.icon)"
            ><span class="iconfont icon-select"
          /></el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="隐藏显示" prop="hidden">
      <el-switch v-model="form.hidden" />
    </el-form-item>
    <el-form-item label="启用" prop="status">
      <el-switch v-model="form.status" active-value="1" inactive-value="0" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="tsx">
import { ref, reactive, PropType } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import Modal from '@/components/baseUi/modal';
import SelectMenuIcon from '@/components/selectMenuIcon/index.vue';

defineOptions({
  name: 'AddMenu',
});

interface MenuType {
  name?: string;
  title?: string;
  icon?: string;
  type?: string;
  hidden?: boolean;
  status?: '0' | '1';
}
const props = defineProps({
  data: {
    type: Object as PropType<MenuType>,
  },
});

const ruleFormRef = ref<FormInstance>();
const form = reactive({
  name: props.data?.name || '',
  title: props.data?.title || '',
  icon: props.data?.icon || '',
  type: props.data?.type || 'directory',
  hidden: props.data?.hidden || false,
  status: props.data?.status || '1',
});
const rules = reactive<FormRules>({
  name: [{ required: true, message: '这个必填项', trigger: 'blur' }],
  title: [{ required: true, message: '这个必填项', trigger: 'blur' }],
  icon: [{ required: true, message: '请选择icon', trigger: 'blur' }],
  type: [{ required: false, message: '请选择类型', trigger: 'blur' }],
  status: [{ required: false }],
});

function openSelectIcon(value = '') {
  const modal = Modal.open({
    title: 'icon',
    width: '500px',
    draggable: true,
    body: <SelectMenuIcon select={value} />,
    onConfirm: () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      const vmBody = modal.vm.props?.body!.component!;
      form.icon = vmBody.exposed.currentSelect.value;
    },
  });
}

async function complete() {
  return !(await ruleFormRef.value?.validate()) || form;
}

defineExpose({
  complete,
});
</script>

<style scoped lang="less"></style>
