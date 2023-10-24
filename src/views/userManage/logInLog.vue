<template>
  <PageHeaderWrapper title="登陆日志">
    <Table :date-set="dataSet" :headerButtons="headerButtons" />
  </PageHeaderWrapper>
</template>

<script setup lang="tsx">
import Table from '@/components/baseUi/tables/Table.vue';
import { DataSet } from '@/components/baseUi/tables';
import { headerButtonsType } from '@/components/baseUi/tables/type';

defineOptions({
  name: 'LoginLog',
});

const dataSet = new DataSet({
  autoQuery: true,
  queryUrl: '/v1/user/getLoginLogs',
  fields: [
    {
      name: 'userName',
      label: '用户名',
      type: 'text',
    },
    {
      name: 'location',
      label: '地区',
      type: 'text',
    },
    {
      name: 'loginTime',
      label: '登陆时间',
      type: 'datetime',
    },
  ],
});

const headerButtons: headerButtonsType[] = ['refresh'];
</script>
