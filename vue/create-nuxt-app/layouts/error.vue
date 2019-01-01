<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">卧槽，页面不见了...</h1>
    <h1 v-else>应用发生错误异常</h1>
    <nuxt-link to="/">点我返回首 页</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'other' // 你可以为错误页面指定自定义的布局
}
</script>