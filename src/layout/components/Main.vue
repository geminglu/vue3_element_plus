<template>
  <main class="main">
    <router-view v-slot="{ Component }">
      <keep-alive :include="[]">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const key = computed<string>(() => {
  return route.path;
});
</script>

<style lang="less" scoped></style>
