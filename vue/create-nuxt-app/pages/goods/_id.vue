<template>
  <div>
    <p>商品ID:{{$route.params.id}}</p>
    <img src="~/assets/images/vue.jpg" />
  </div>
</template>
<script>
export default {
  asyncData(context){
    return new Promise((resolve, reject)=>{
      console.log('getData')
      setTimeout(() => {
        resolve({list: [{id: '001', name: 'BBG'}]})
      }, 500);
    })
  },
}
</script>

