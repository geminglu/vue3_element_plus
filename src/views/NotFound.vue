<template>
  <div class="NotFound">
    <button>返回上一页</button>
    <button>返回首页</button>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style>
.NotFound {
  width: 100%;
  height: 100%;
  background-image: url('@/assets/NotFound.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  text-align: center;
}
button {
}
</style>
