<template>
  <div class="my-alert">
    <div class="pannel">
      <div class="title">{{title}}</div>
      <div class="content">{{body}}</div>
      <div class="footer">
        <button class="cancel" @click="close">取消</button>
        <button v-if="confirm" class="confirm" @click="ok">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    close() {
      document.body.removeChild(this.$el)
    },
    ok() {
      document.body.removeChild(this.$el)
      this.confirm()
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
