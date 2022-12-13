<script setup>
import Decimal from 'decimal.js';
</script>

<template>
  <page-header-wrapper back="首页" title="首页">
    <h3>加法</h3>
    0.1加上0.2 = {{ 0.1 + 0.2 }}
    <br />
    使用Decima l0.1 + 0.2 = {{ new Decimal(0.1).plus(0.2) }}
    <hr />
    <h3>减法</h3>
    1.7 - 1.3 = {{ 1.7 - 1.3 }}
    <br />
    使用Decima 1.7 - 1.3 = {{ new Decimal(1.7).sub(1.3) }} OR
    {{ Decimal.sub(1.7, 1.3) }}
    <hr />
    <h3>乘法</h3>
    1.3 * 0.02 = {{ 1.3 * 0.02 }}
    <br />
    使用Decima 1.3 * 0.02 = {{ Decimal.mul(1.3, 0.02) }} OR
    {{ new Decimal(1.3).mul(0.02) }}
    <hr />
    <h3>除法</h3>
    2.1 / 1.2 = {{ 2.1 / 1.2 }}
    <br />
    使用Decima 2.1 / 1.2 = {{ Decimal.div(2.1, 1.2) }} OR
    {{ new Decimal(2.1).div(1.2) }}
  </page-header-wrapper>
</template>
