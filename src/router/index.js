import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/main/main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    meta: {
      title:'博客'
    }
  },
  {
    path: '/login',
    name: 'login',
    component:()=> import('../login/login.vue'),
    meta: {
      title:'登录'
    }
  },
  {
    path: '/register',
    name: 'register',
    component:()=> import('../login/register.vue'),
    meta: {
      title:'注册'
    }
  },
  {
    path: '/userConf',
    name: 'userConf',
    component:()=> import('@/views/users/userConf.vue'),
    meta: {
      title:'个人中心'
    }
  },
  {
    path: '/production',
    name: 'Production',
    component:()=> import('@/views/production/production.vue'),
    meta: {
      title:'作品展示'
    }
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
  
  next()
})
export default router
