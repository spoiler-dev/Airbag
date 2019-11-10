import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
// import Cookies from 'js-cookie'
import VueParticles from 'vue-particles'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import '../public/font/iconfont.css'

// jquery
Vue.prototype.$ = $
// cookies
// Vue.prototype.Cookies = Cookies
// axios 请求
Vue.prototype.$axios = axios
// 解决 axios post请求
Vue.prototype.$qs = qs
// 解决跨域
// console.log(process.env.NODE_ENV)
Vue.prototype.HOST = process.env.NODE_ENV === 'development' ? '/api' : ''
// 粒子效果
Vue.use(VueParticles)
// 使用 ElementUI
Vue.use(ElementUI)
// 使用 Boostrap
require('bootstrap')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // 判断该路由是否需要登录权限
    // console.log(store)
    // 通过vuex state获取当前的token是否存在
    if (store.state.access) {
      next()
    } else {
      next({
        // 登录路由
        path: '/app/login'
      })
    }
  } else {
    next()
  }
})

Vue.config.productionTip = false
// 挂载 #app 的 div
// ES6 中键和值相等，可以简写
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
