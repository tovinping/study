<template>
  <div class="my-alert" ref="alert" :style="{display: visible?'block':'none'}">
    <div class="pannel">
      <div class="title">{{title}}</div>
      <div class="content">{{content}}</div>
      <div class="footer">
        <button class="cancel" @click="close">取消</button>
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
  methods: {
    close() {
      this.$emit('close')
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
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
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


