<template>
  <PageHeaderWrapper title="菜单管理">
    <!-- <Table :date-set="dataSet" :header-buttons="buttons" /> -->
  </PageHeaderWrapper>
</template>

<script setup lang="tsx">
import { onMounted } from 'vue';
import Table from '@/components/baseUi/table/Table.vue';
import { DataSet } from '@/components/baseUi/table/index';
import { ElMessage, ElMessageBox } from 'element-plus';
import Modal from '@/components/baseUi/modal';
import { ArrowDown } from '@element-plus/icons-vue';
import type { headerButtonsType, headerButton } from '@/components/baseUi/table/type';
import RenderDisabled from '@/components/render/RenderDisabled/index';
import RenderGender from '@/components/render/RenderGender/index';
import AddUser from './component/addUser.vue';
import { createdUser, updateUser, deleteUser } from '@/serivce/user';
import { userInfoType } from '@/store/modules/user';
import moment from 'moment';

defineOptions({
  name: 'UserManage',
});

type operateType = 'edit' | 'delete' | 'repass' | 'enable' | 'disable';
type operate = {
  type: operateType;
  name: string;
};

const dataSet = DataSet({
  autoQuery: true,
  query: [],
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

/**
 * 新增用户
 */
function addUser(data?: userInfoType) {
  const modal = Modal.open({
    title: data ? '编辑用户' : '新增用户',
    width: '500px',
    draggable: true,
    body: <AddUser data={data}></AddUser>,
    onConfirm: async () => {
      try {
        const vmBody = modal.vm.props.body!.component!;
        const result = await vmBody.exposed.complete();
        const param = {
          ...result,
          phone: result.phone || undefined,
        };
        if (data) {
          await updateUser(data.id, param);
        } else {
          await createdUser(param);
        }
        dataSet.query();
        ElMessage.success('创建成功');
      } catch (error: any) {
        return false;
      }
    },
  });
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
          return index >= 2 ? (
            <el-dropdown-item onClick={() => handelOperate(item, param)}>
              {item.name}
            </el-dropdown-item>
          ) : null;
        })}
      </el-dropdown-menu>
    ),
  };

  return (
    <>
      {...but.map((item, index) => {
        return index <= 1 ? (
          <>
            <el-link onClick={() => handelOperate(item, param)} underline={false} type="primary">
              {item.name}
            </el-link>
            <el-divider direction="vertical" />
          </>
        ) : but.length === 3 && index === 2 ? (
          <>
            <el-link onClick={() => handelOperate(item, param)} underline={false} type="primary">
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

function handelOperate(operate: operate, data: userInfoType) {
  switch (operate.type) {
    case 'edit':
      addUser(data);
      break;
    case 'delete':
      ElMessageBox.confirm('删除后无法恢复是否确认删除？', 'Warning', {
        type: 'warning',
      }).then(async () => {
        await deleteUser(data.id);
        dataSet.query();
        ElMessage({
          type: 'success',
          message: '删除成功',
        });
      });
      break;
    case 'disable':
    case 'enable':
      hendelendis(data.id, data.isActive).then(() => dataSet.query());
      break;
    case 'repass':
      rePassword();
      break;
    default:
      break;
  }
}

const buttons: headerButtonsType[] = [
  {
    name: '新增',
    icon: 'add',
    click: addUser,
  },
  'refresh',
];
</script>

<style lang="less">
.dropdown_link {
  line-height: 23px;
}
</style>
