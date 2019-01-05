import Vue from 'vue'
import Com from './com'
var testAAA = function(opts) {
  let defaults = {
    title: '默认标题',
    body: '默认内容',
    confirm: null
  }
  let MyCom = Vue.extend(Com)

  return function() {
    for (let attr in opts) {
      defaults[attr] = opts[attr]
    }
    const vm = new MyCom({
      el: document.createElement('div'),
      data() {
        return defaults
      }
    })
    document.body.appendChild(vm.$el)
  }()
}
export default testAAA
