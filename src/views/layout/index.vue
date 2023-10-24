<template>
  <PageHeaderWrapper title="系统布局">
    <!-- <Table :date-set="dataSet" :header-buttons="buttons" /> -->
    <el-upload
      class="upload-demo"
      action="http://localhost:8081/api/v1/upload/file"
      multiple
      :on-progress="handelProgress"
      :headers="headers"
    >
      <el-button type="primary">Click to upload</el-button>
      <template #tip>
        <div class="el-upload__tip">jpg/png files with a size less than 500KB.</div>
      </template>
    </el-upload>
    <img src="http://localhost:3000/v1/upload/file/2605651c-3daf-4a2c-a3ff-1e98d60e5ad3" />
  </PageHeaderWrapper>
</template>

<script setup lang="tsx">
import Table from '@/components/baseUi/tables/Table.vue';
import { DataSet } from '@/components/baseUi/tables/index';
import { ArrowDown } from '@element-plus/icons-vue';
import type { headerButtonsType } from '@/components/baseUi/tables/type';
import RenderDisabled from '@/components/render/RenderDisabled/index';
import RenderGender from '@/components/render/RenderGender/index';
import { updateUser } from '@/serivce/user';
import useUserStore, { userInfoType } from '@/store/modules/user';
import moment from 'moment';
import { UploadProgressEvent, UploadFile, UploadFiles } from 'element-plus';

defineOptions({
  name: 'UserManage',
});

type operateType = 'edit' | 'delete' | 'repass' | 'enable' | 'disable';
type operate = {
  type: operateType;
  name: string;
};
const dataSet = new DataSet({
  autoQuery: true,
  queryform: [
    {
      name: 'name',
      label: '姓名',
      type: 'text',
    },
  ],
  transport: {
    read: (param) => {
      return {
        url: '/v1/user',
        method: 'get',
        params: param,
      };
    },
  },
  fields: [
    {
      name: 'name',
      label: '姓名',
      type: 'text',
      minWidth: '100px',
    },
    {
      name: 'email',
      label: '邮箱',
      type: 'text',
      minWidth: '100px',
    },
    {
      name: 'gender',
      label: '性别',
      type: 'text',
      minWidth: '35px',
      render: (param) => <RenderGender status={param.gender} />,
    },
    {
      name: 'phone',
      label: '手机号',
      type: 'text',
      minWidth: '45px',
    },
    {
      name: 'isActive',
      label: '状态',
      type: 'text',
      minWidth: '35px',
      render: (param) => <RenderDisabled status={param.isActive} />,
    },
    {
      name: 'createAt',
      label: '创建时间',
      type: 'text',
      minWidth: '85px',
      render: (param) => <span>{moment(param.createAt).format('YYYY/MM/DD HH:mm:ss')}</span>,
    },
    {
      name: 'operate',
      type: 'text',
      label: '操作',
      render: (param) => {
        return renderMenu(param);
      },
    },
  ],
});

const userStore = useUserStore();

const headers = {
  Authorization: 'Bearer ' + userStore.access_token,
};
function handelProgress(
  evt: UploadProgressEvent,
  uploadFile: UploadFile,
  uploadFiles: UploadFiles
) {
  console.log(evt, uploadFile, uploadFiles);
}

const renderMenu = (param: userInfoType) => {
  const but: operate[] = [];
  but.push(
    {
      type: 'edit',
      name: '编辑',
    },
    {
      type: param.isActive === '0' ? 'enable' : 'disable',
      name: param.isActive === '0' ? '启用' : '禁用',
    },
    {
      type: 'repass',
      name: '重置密码',
    },
    {
      type: 'delete',
      name: '删除',
    }
  );
  const dropdown = {
    dropdown: () => (
      <el-dropdown-menu>
        {but.map((item, index) => {
          return index >= 2 ? <el-dropdown-item>{item.name}</el-dropdown-item> : null;
        })}
      </el-dropdown-menu>
    ),
  };

  return (
    <>
      {...but.map((item, index) => {
        return index <= 1 ? (
          <>
            <el-link underline={false} type="primary">
              {item.name}
            </el-link>
            <el-divider direction="vertical" />
          </>
        ) : but.length === 3 && index === 2 ? (
          <>
            <el-link underline={false} type="primary">
              {item.name}
            </el-link>
          </>
        ) : null;
      })}
      {but.length > 3 ? (
        <>
          <el-dropdown v-slots={dropdown} trigger="click">
            <el-link underline={false} type="primary" class="dropdown_link">
              更多
              <el-icon class="el-icon--right">
                <ArrowDown />
              </el-icon>
            </el-link>
          </el-dropdown>
        </>
      ) : null}
    </>
  );
};

/**
 * 禁用和启用账号
 */
async function hendelendis(id: string, status: string) {
  await updateUser(id, {
    isActive: Number(status) === 1 ? '0' : '1',
  });
}

/**
 * 重置密码
 */
async function rePassword() {}

const buttons: headerButtonsType[] = [
  {
    name: '新增',
    icon: 'add',
    click: () => {},
  },
  'refresh',
];
</script>

<style lang="less">
.dropdown_link {
  line-height: 23px;
}
</style>
