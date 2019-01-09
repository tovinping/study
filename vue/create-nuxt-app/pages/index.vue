<template>
  <section class="container">
    <div>
      <logo/>
      <div>{{storeHomeData}}</div>
      <h1 class="title">{{msg.title}}{{counter}}</h1>
      <h2 class="subtitle">{{msg.title2}}</h2>
      <div class="store">
        <button @click="setStore">STORE操作++</button>
        <button @click="setStoreNum">清空STORE值</button>
      </div>
      <div class="router">
        <button @click="goDetail">点击调至详情页面</button>
        <nuxt-link to="/goods/aaa">nuxtLINK跳转</nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import {mapActions,mapMutations} from 'vuex'
export default {
  asyncData(context) {
    // return context.$axios.get('https://m.douban.com/rexxar/api/v2/muzzy/columns/10008/items?start=0&count=3').then(res=>{
    //   return {list: [{id: '001', name: 'BBG'}]}
    // }).catch(err=>{
    //   return {list: [{id: '001', name: 'ERROR'}]}        
    // })
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        // context.store.dispatch('getHomeDataAndSet')
        resolve({msg: {title: 'create-nuxt-app', title2: 'This a test project'}})
      }, 300)
    })
  },
  fetch ({ store, params }) {
    return store.dispatch('getHomeDataAndSet')
  },
  components: {
    Logo
  },
  computed: {
    counter(){
      return this.$store.state.counter
    },
    storeHomeData() {
      return this.$store.state.storeHomeData || '先显示一个初始化的值吧'
    }
  },
  methods: {
    ...mapActions(['getHomeDataAndSet']),
    ...mapMutations(['increment', 'setNum']),
    goDetail() {
      this.$router.push({path: '/goods/testId'})
    },
    setStore() {
      this.$store.commit('increment')
    },
    setStoreNum() {
      this.setNum(0)
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
  .store{
    margin-bottom: 10px;
  }
}
</style>
