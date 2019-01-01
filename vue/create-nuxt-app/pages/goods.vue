<template>
  <div class="goods-list">
    <h1>商品列表</h1>
    <ul>
      <!-- <li v-for="item in list" :key="item.id">{{item.name}}</li> -->
      <nuxt-link v-for="item in list" :to="'/goods/'+item.id" :key="item.id">{{item.name}}</nuxt-link>
    </ul>
    <p>当前页：{{pages}}</p>
    <button @click="nextPage">下一页</button>
    <nuxt/>
  </div>
</template>
<script>
export default {
  data(){
    return {
      pages: 1,
      list: []
    }
  },
  methods: {
    getData() {
      setTimeout(() => {
        this.list = [{id: '001', name: 'BBG'},{id: '002', name: 'notBB'}]
      }, 1000);
    },
    nextPage() {
      this.pages++
    }
  },
  mounted(){
    this.getData()
  }
}
</script>
<style lang="scss" scoped>
.goods-list{
  a{
    display: block;
    color: black;
    line-height: 36px;
  }
}
</style>


