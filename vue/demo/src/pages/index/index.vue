<template>
  <div>
    <h1>{{initText}}</h1>
    <input type="text" v-model="text">
    <button @click="showAlert">显示自定义弹窗</button>
    <!-- <MyAlert :visible="visible" @confirm="confirm" @close="close" title="自定义标题" content="自定义内容" /> -->
  </div>
</template>
<script>
import CustomAlert from '@/components/myAlert/index.js'
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
      // this.visible = !this.visible
      CustomAlert({
        title: 'JS标题',
        body: 'JS内容',
        confirm: () => {
          console.log('haha')
        }
      })
    },
    close() {
      this.visible = false
    },
    confirm() {
      console.log('点击了确定')
      this.visible = false
    }
  }
}
</script>

