import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    counter: 0,
    storeHomeData: ''
  },
  mutations: {
    increment (state) {
      state.counter++
    },
    setNum (state, data) {
      state.counter = data
    },
    homeData (state, data) {
      state.storeHomeData = data
    }
  },
  actions: {
    getHomeDataAndSet({commit}) {
      setTimeout(()=>{
        commit('homeData', 'tovinping')
      }, 1000)
    }
  }
})

export default store