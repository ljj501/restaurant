import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import VueSocketio from "vue-socket.io"
import $ from 'jquery'

Vue.use(VueSocketio, 'http://localhost:5566');  
Vue.use(ElementUI)
Vue.use(Vuex)

var store = new Vuex.Store({
 state: {
    show:true,
    orderNo:'',
    newOrder:'',
    backBtn:false,
    addBtn:true
 }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})