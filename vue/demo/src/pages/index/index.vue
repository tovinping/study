<template>
  <div>
    <h1>{{initText}}</h1>
    <input type="text" v-model="text">
    <button @click="showAlert">显示自定义弹窗</button>
    <MyAlert :visible="visible" @close="close" @confirm="confirm"/>
  </div>
</template>
<script>
import MyAlert from '@/components/myAlert/alert'
export default {
  name: 'home',
  data(){
    return {
      text: '',
      visible: false
    }
  },
  components: {
    MyAlert
  },
  computed:{
    initText(){
      return this.text || '这是首页'
    }
  },
  methods: {
    showAlert() {
      this.visible = !this.visible
    },
    close() {
      this.visible = false
    },
    confirm() {
      this.visible = false
    }
  }
}
</script>

