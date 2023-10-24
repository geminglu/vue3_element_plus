<template>
  <div class="NotFound">
    <el-result title="404" sub-title="Sorry, request error">
      <template #icon>
        <el-image
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        />
      </template>
      <template #extra>
        <el-button type="primary" @click="router.go(-1)">Back</el-button>
        <el-button type="primary" @click="router.replace({ name: 'Home' })">首页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
