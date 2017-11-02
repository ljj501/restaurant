import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import $ from 'jquery'
import VueSocketio from "vue-socket.io"

Vue.use(VueSocketio, 'http://localhost:5566');  

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
