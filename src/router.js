import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main'
import Spoiler from '@/views/Spoiler'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'spoiler',
    component: Spoiler,
    // 初始路径
    redirect: 'app/index',
    children: [{
      path: 'app',
      name: 'app',
      component: Main,
      children: [
        // 登录
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/login/Login')
        },
        // 主页
        {
          path: 'index',
          name: 'home',
          component: () => import('@/views/home/Home')
        },
        // 文章
        {
          path: 'article',
          name: 'article',
          component: () => import('@/views/article/Article')
        },
        // 个人作品
        {
          path: 'works',
          name: 'works',
          component: () => import('@/views/works/Works')
        },
        // 个人简历
        {
          path: 'resume',
          name: 'resume',
          component: () => import('@/views/resume/Resume')
        },
        // 致谢
        {
          path: 'thanks',
          name: 'thanks',
          component: () => import('@/views/Thanks')
        },
        // 工作台
        {
          path: 'martix',
          name: 'martix',
          meta: {
            requiresAuth: true
          },
          component: () => import('@/views/martix/Martix')
        }
      ]
    },
    // 个人项目
    {
      path: 'Self-Service-Equipment',
      name: 'Self-Service-Equipment',
      component: () => import('@/views/project/Self-Service-Equipment/Self-Service-Equipment')
    },
    {
      path: '3DElectricalRoom',
      name: '3DElectricalRoom',
      component: () => import('@/views/project/3DElectricalRoom/3DElectricalRoom')
    },
    {
      path: '3DElectricalRoomLayout',
      name: '3DElectricalRoomLayout',
      component: () => import('@/views/project/3DElectricalRoomLayout/3DElectricalRoomLayout')
    },
    {
      path: 'AnswersBook',
      name: 'AnswersBook',
      component: () => import('@/views/project/AnswersBook/AnswersBook')
    }]
  }]
})
