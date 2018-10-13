import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// axios 请求
Vue.prototype.$axios = axios
// 解决跨域
Vue.prototype.HOST = '/api'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
