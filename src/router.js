import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Main,
      // 初始路径
      redirect: 'index',
      children: [
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
        }
      ]
    }
  ]
})
