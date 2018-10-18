import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueParticles from 'vue-particles'
import ElementUI from 'element-ui'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

// axios 请求
Vue.prototype.$axios = axios
// 解决跨域
Vue.prototype.HOST = '/api'
// 粒子效果
Vue.use(VueParticles)
// 使用 ElementUI
Vue.use(ElementUI)
// 使用 Boostrap
require('bootstrap')

Vue.config.productionTip = false
// 挂载 #app 的 div
// ES6 中键和值相等，可以简写
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
