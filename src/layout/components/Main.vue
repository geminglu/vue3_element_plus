<template>
  <main class="main">
    <router-view v-slot="{ Component }">
      <Transition name="fade-transform" mode="out-in">
        <keep-alive :include="[]">
          <component :is="Component" />
        </keep-alive>
      </Transition>
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

<style lang="less" scoped>
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
