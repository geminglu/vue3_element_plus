<template>
  <div class="footer">
    <div>
      <span>Pro Layout</span>
      <span>Github</span>
      <span>@Sendya</span>
    </div>
    <div>vueComponent</div>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Footer',
  setup() {},
};
</script>

<style lang="less" scoped>
.footer {
  padding: 30px 0;
  height: 70px;
  background-color: #f1f1f1;
  div {
    text-align: center;
    span {
      margin: 0 30px;
      display: inline-block;
      margin-bottom: 10px;
    }
  }
}
</style>
