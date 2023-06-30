<template>
  <PageHeaderWrapper title="菜单管理">
    <Table :date-set="dataSet" :paging="false" :header-buttons="buttons" />
  </PageHeaderWrapper>
</template>

<script setup lang="tsx">
import { onMounted } from 'vue';
import Table from '@/components/baseUi/table/Table.vue';
import { DataSet } from '@/components/baseUi/table/index';
import { ElMessage, ElMessageBox } from 'element-plus';
import Modal from '@/components/baseUi/modal';
import { ArrowDown, Plus } from '@element-plus/icons-vue';
import { systemMenuType } from '#/router';
import { createMenu, editSystemMenu, deleSystemMenu } from '@/serivce/system';
import { arrayToTree } from '@/utils';
import type { headerButtonsType, headerButton } from '@/components/baseUi/table/type';
import AddMenu from './components/addMenu.vue';
import type { ResSystemMenuDto } from '@/serivce/system';

defineOptions({
  name: 'SystemMenu',
});

type operateType = 'add' | 'editMenu' | 'delMenu' | 'delDir' | 'detailMenu' | 'detailDir';
type operate = {
  type: operateType;
  name: string;
};

const dataSet = DataSet({
  autoQuery: true,
  query: [],
  primaryKey: 'id',
  transport: {
    read: () => {
      return {
        url: '/v1/system/menu',
        method: 'get',
      };
    },
  },
  response: (param) => {
    return arrayToTree(param || []);
  },
  fields: [
    {
      name: 'title',
      label: '名称',
      type: 'text',
    },
    {
      name: 'type',
      label: '类型',
      type: 'text',
      render: (param) => (
        <>{param.type === 'menu' ? <el-tag>菜单</el-tag> : <el-tag type="success">目录</el-tag>}</>
      ),
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

const renderMenu = (param: any) => {
  const but: operate[] = [];

  if (param?.type === 'menu') {
    but.push({
      type: 'editMenu',
      name: '编辑',
    });
  }
  if (param?.type === 'directory') {
    but.push({
      type: 'add',
      name: '新增',
    });
  }
  but.push(
    {
      type: 'editMenu',
      name: '编辑',
    },
    {
      type: 'delMenu',
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
 * 新增
 */
function addMenu(pid?: string) {
  const modal = Modal.open({
    title: '新增',
    width: '500px',
    draggable: true,
    body: <AddMenu></AddMenu>,
    onConfirm: async () => {
      try {
        const vmBody = modal.vm.props.body!.component!;
        const result = await vmBody.exposed.complete();
        const param = { ...result, hidden: result.hidden ? '1' : '0' };
        if (pid) param.pid = pid;

        await createMenu(param);
        dataSet.query();
        ElMessage.success('创建成功');
      } catch (error: any) {
        return false;
      }
    },
  });
}

/**
 * 编辑菜单
 */
function editMenu(data: ResSystemMenuDto) {
  console.log(data);

  const modal = Modal.open({
    title: '新增',
    width: '500px',
    draggable: true,
    body: <AddMenu data={{ ...data, hidden: data.hidden === '0' ? false : true }}></AddMenu>,
    onConfirm: async () => {
      try {
        const vmBody = modal.vm.props.body!.component!;
        const result = await vmBody.exposed.complete();
        const param = { ...result, hidden: result.hidden ? '1' : '0', id: data.id };
        await editSystemMenu(param);
        dataSet.query();
        ElMessage.success('编辑成功');
      } catch (error: any) {
        return false;
      }
    },
  });
}

/**
 * 删除系统菜单
 */
async function deleMenu(id: string) {
  ElMessageBox.confirm('删除后无法恢复是否确认删除？', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
  }).then(async () => {
    await deleSystemMenu(id);
    dataSet.query();
    ElMessage({
      type: 'success',
      message: '删除成功',
    });
  });
}

const buttons: headerButtonsType[] = [
  {
    name: '新增',
    icon: 'add',
    click: addMenu,
  },
  'refresh',
];

function handelOperate(operate: operate, data: ResSystemMenuDto) {
  switch (operate.type) {
    case 'add':
      addMenu(data.id);
      break;
    case 'editMenu':
      editMenu(data);
      break;
    case 'delMenu':
      deleMenu(data.id);
      break;
    default:
      break;
  }
}
</script>

<style lang="less">
.dropdown_link {
  line-height: 23px;
}
</style>
