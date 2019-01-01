<template>
  <div class="goods-list">
    <h1>商品列表</h1>
    <ul>
      <!-- <li v-for="item in list" :key="item.id">{{item.name}}</li> -->
      <nuxt-link v-for="item in list" :to="'/goods/'+item.id" :key="item.id">{{item.name}}</nuxt-link>
    </ul>
    <nuxt/>
  </div>
</template>
<script>
export default {
  asyncData(context){
    return context.$axios.get('https://m.douban.com/rexxar/api/v2/muzzy/columns/10008/items?start=0&count=3').then(res=>{
      return {list: [{id: '001', name: 'BBG'}]}
    }).catch(err=>{
      return {list: [{id: '001', name: 'ERROR'}]}        
    })
    // return new Promise((resolve, reject)=>{
    //   setTimeout(() => {
    //     resolve({list: [{id: '001', name: 'BBG'}]})
    //   }, 3000);
    // })
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


