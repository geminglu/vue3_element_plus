<template>
  <div class="header">
    <ul class="operate">
      <el-switch
        v-model="appStore.layout.darkTheme"
        inline-prompt
        class="pure-datatheme"
        :active-icon="Sunny"
        :inactive-icon="Moon"
      />
      <el-dropdown ref="dropdown" class="user_dropdown">
        <li class="operate_item">
          <el-image
            class="user_avatars"
            style="width: 35px; height: 35px"
            :src="userStore.userInfo?.avatars"
            fit="fill"
          />
          <span>{{ userStore.userInfo?.name }}</span>
        </li>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>用户详情</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item divided @click="exitlogin">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <li class="operate_item" @click="drawer = true">
        <span class="iconfont icon-setting" />
      </li>
    </ul>

    <el-drawer v-model="drawer" direction="rtl">
      <template #header>
        <h4>布局编辑</h4>
      </template>
      <template #default>
        <div></div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user';
import type { DropdownInstance } from 'element-plus';
import SvgIcon from '@/components/SvgIcon/index.vue';
import { Sunny, Moon } from '@element-plus/icons-vue';
import useAppStore from '@/store/modules/app';

defineOptions({
  name: 'Header',
});

const a = ref(false);

const dropdown = ref<DropdownInstance>();
const userStore = useUserStore();
const appStore = useAppStore();
const route = useRoute();
const router = useRouter();
const drawer = ref(false);

!userStore.userInfo && userStore.getUserInfo();

/**
 * 退出登陆
 */
function exitlogin() {
  userStore.logout();
  router.push('/signIn');
}
</script>

<style scoped lang="less">
.header {
  height: 48px;
  border-bottom: 1px solid #eee;
}
.operate {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0 24px;
  .operate_item {
    display: flex;
    padding: 0;
    margin: 0;
    height: 100%;
    padding: 0 12px;
    list-style: none;
    align-items: center;
    cursor: pointer;
    color: #151515;
    &:hover {
      background-color: #eee;
    }
  }
}
.user_dropdown {
  height: 100%;
}
.user_avatars {
  border-radius: 50%;
  margin-right: 12px;
}
</style>
