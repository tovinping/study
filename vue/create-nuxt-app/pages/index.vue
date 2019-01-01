<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        create-nuxt-app
      </h1>
      <h2 class="subtitle">
        This a test project
      </h2>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss" scoped>

.container {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    display: block;
    color: #35495e;
    letter-spacing: 1px;
    margin: 0;
  }
  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    margin: 0;
    padding-bottom: 15px;
  }
}
</style>
