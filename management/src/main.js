import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'

Vue.use(ElementUI)
Vue.use(Vuex)

var store = new Vuex.Store({
 state: {
    show:true
 }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
