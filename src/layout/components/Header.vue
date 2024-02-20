<template>
  <div class="header">
    <div class="log">
      <img class="log_img" src="@/assets/img/favicon.png" />
      <span class="log_title" v-if="appStore.device === 'desktop'" @click="router.push('/')">
        GmlAdmin
      </span>
      <div class="aside_footer" v-else>
        <span
          v-if="appStore.mobileCollapse"
          class="iconfont icon-a-zuosuojin3x show_collapse"
          @click="showCollapse(false)"
        />
        <span
          v-else
          class="iconfont icon-a-yousuojin3x show_collapse"
          @click="showCollapse(true)"
        />
      </div>
    </div>
    <div
      v-if="
        appStore.device === 'desktop' &&
        (appStore.layoutTheme === 'horizontal' || appStore.layoutTheme === 'mix')
      "
      class="header_menu"
    >
      <Sidebar
        :menuCollapse="false"
        mode="horizontal"
        :level="appStore.layoutTheme === 'mix' ? 'mainMenu' : undefined"
      />
    </div>

    <ul class="operate">
      <li class="operate_item">
        <el-switch
          v-model="isDark"
          inline-prompt
          class="pure-datatheme"
          :active-action-icon="Moon"
          :inactive-action-icon="Sunny"
        />
      </li>
      <el-dropdown ref="dropdown" class="user_dropdown">
        <li class="operate_item">
          <el-image
            class="user_avatars"
            style="width: 35px; height: 35px"
            :src="`${axiosDefault.defaults.baseURL}${userStore.userInfo?.avatars}`"
            fit="cover"
          />
          <span>{{ userStore.userInfo?.name }}</span>
        </li>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="router.push('/userInfo')">用户详情</el-dropdown-item>
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
        <Setting />
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="tsx">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useUserStore from '@/store/modules/user';
import type { DropdownInstance } from 'element-plus';
import { Sunny, Moon } from '@element-plus/icons-vue';
import { useDark } from '@vueuse/core';
import Setting from '@/layout/components/setting/index.vue';
import axiosDefault from '@/utils/request';
import useAppStore from '@/store/modules/app';
import Sidebar from './sidebar/index.vue';

defineOptions({
  name: 'HeaderLayout',
});

const appStore = useAppStore();

const isDark = useDark();

const dropdown = ref<DropdownInstance>();
const userStore = useUserStore();
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

function showCollapse(value: boolean) {
  appStore.mobileCollapse = value;
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: var(--nav-header);
  border-bottom: 1px solid var(--el-border-color);
  user-select: none;
  justify-content: space-between;
  background-color: var(--menuBg);
  color: var(--menuText);
  .header_menu {
    margin-left: 12px;
    flex: 1 1 0%;
    min-width: 0;
    :deep(.el-menu) {
      height: 100%;
      border: none;
      .sub_menu_title {
        width: auto;
      }
      .sub_menu_title {
        line-height: 45px;
      }
    }
  }
  .log {
    display: flex;
    align-items: center;
    .log_img {
      padding: 12px;
      height: 100%;
    }
  }
  .aside_footer {
    height: 100%;
    border-top: 1px solid var(--el-border-color);
    display: flex;
    align-items: center;
    :hover {
      color: var(--el-color-primary);
    }
  }
  .show_collapse {
    font-size: 22px;
    line-height: 100%;
    cursor: pointer;
    // color: var(--el-text-color-primary);
  }
}
.operate {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin: 0 24px;
  .operate_item {
    display: flex;
    margin: 0;
    height: 100%;
    padding: 0 12px;
    list-style: none;
    align-items: center;
    // color: var(--el-text-color-primary);
    cursor: pointer;
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
