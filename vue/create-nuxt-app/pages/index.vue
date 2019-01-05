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
      <button @click="goDetail">点击调至详情页面</button>
      <nuxt-link to="/goods/aaa">AAAA</nuxt-link>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  asyncData(context) {
    console.log(context)
    return context.$axios.get('https://m.douban.com/rexxar/api/v2/muzzy/columns/10008/items?start=0&count=3').then(res=>{
      return {list: [{id: '001', name: 'BBG'}]}
    }).catch(err=>{
      return {list: [{id: '001', name: 'ERROR'}]}        
    })
  },
  components: {
    Logo
  },
  computed: {
    data(){
      console.log(this.list)
      return {}
    }
  },
  methods: {
    goDetail() {
      this.$router.push({path: '/goods/testId'})
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  min-height: 80vh;
  display: flex;
  color: red;
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
  a{
    color: red;
  }
}
</style>
