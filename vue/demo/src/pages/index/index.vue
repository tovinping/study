<template>
  <div>
    <h1>{{initText}}</h1>
    <input type="text" v-model="text">
    <div>你好吗？</div>
    <hr>
    <list></list>
  </div>
</template>
<script>
import List from '@/components/list.vue'
export default {
  name: 'home',
  data(){
    return {
      text: ''
    }
  },
  components:{
    List
  },
  computed:{
    initText(){
      return this.text || '这是首页'
    }
  },
  mounted(){
    console.log(this)
  }
}
</script>

