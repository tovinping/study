<template>
  <div class="my-alert" :style="{display: 'block'}">
    <div class="pannel">
      <p>{{style.display}}</p>
      <div class="title">{{title}}</div>
      <div class="content">{{content}}</div>
      <div class="footer">
        <button class="cancel" @click="cancel">取消</button>
        <button class="confirm" @click="confirm">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      default: '默认标题'
    },
    content: {
      default: '默认内容'
    },
    visible: {
      default: false
    }
  },
  name: 'myAlert',
  data () {
    return {
      show: false,
      isCancel: false,
      aaa: false
    }
  },
  computed: {
    style(){
      console.log('aaa')
      if (this.isCancel) {
        setTimeout(() => {
          this.isCancel = false  
          this.aaa = true                  
        }, 0);
        return {display: 'none'}
      }
      if ((!this.visible && !this.show) || this.aaa) {
        return {display: 'none'}
      } else {
        return {display: 'block'}
      }
    }
  },
  methods: {
    cancel() {
      this.show = true
      this.isCancel = true
    },
    confirm() {
      this.$emit('confirm')
    }
  }
}
</script>
<style>
.my-alert{
  position: fixed;
  top: 130px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.5)
}
.pannel{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background: #fff;
  width: 300px;
  height: 150px;
}
.pannel .title{
  padding-left: 10px;
  line-height: 50px;
  border-bottom: 1px solid #ddd;
}
.pannel .content{
  padding-left: 10px;
}
.pannel .footer{
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>


