<template>
  <page-header-wrapper back="首页" title="首页">
    <!-- <el-upload
      ref="upload"
      list-type="picture"
      v-model:file-list="fileList"
      :action="request.defaults.baseURL + '/v1/upload/file'"
      multiple
      :auto-upload="false"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :headers="{ a: 11 }"
      :data="{ v: 1, c: 3 }"
    >
      <template #trigger>
        <el-icon><Plus /></el-icon>
      </template>
      <el-button class="ml-3" type="success" @click="submitUpload">
        upload to server
      </el-button>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
    </el-upload> -->

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.userName" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-input v-model="formInline.age" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-input v-model="formInline.email" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-input v-model="formInline.name" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </page-header-wrapper>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { UploadInstance, UploadProps, UploadRawFile, UploadUserFile } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import request from '@/utils/request';

// const fileList = ref<UploadUserFile[]>([]);

// const upload = ref<UploadInstance>();

// const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
//   console.log(file, uploadFiles);
// };

// const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
//   console.log(uploadFile);
// };

// const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
//   ElMessage.warning(
//     `The limit is 3, you selected ${files.length} files this time, add up to ${
//       files.length + uploadFiles.length
//     } totally`
//   );
// };

// const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
//   console.log(uploadFile, uploadFiles);

//   return ElMessageBox.confirm(
//     `Cancel the transfer of ${uploadFile.name} ?`
//   ).then(
//     () => true,
//     () => false
//   );
// };
// const submitUpload = () => {
//   upload.value!.submit();
// };

const formInline = reactive({
  userName: '',
  age: '',
  email: '',
  name: '',
});
const tableData = [
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄',
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄',
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄',
  },
];
function onSubmit() {
  console.log(formInline);
  request({
    url: '/v1/user',
    params: {
      userName: '',
      age: formInline.age,
      email: formInline.email,
      name: formInline.name,
    },
  });
}
</script>

<style></style>
