import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import $ from 'jquery'
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
