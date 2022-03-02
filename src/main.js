import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


import {request, baseURL} from './request/request'

import fun from './util/function.js'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
Object.keys(fun).forEach((ele)=>{
  Vue.prototype[ele] = fun[ele]
})
Vue.prototype.$baseUrl = baseURL;
let $mobile = false;
function _isMobile() {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  return flag;
} 
if(_isMobile()){
  $mobile = true
  
}
Vue.prototype.$mobile = $mobile; 
Vue.prototype.request = request;
// 本地存储
if(localStorage.getItem('user')){
  store.commit('updateUserInfo',JSON.parse(localStorage.user))
}
Vue.use(ElementUI)
Vue.config.productionTip = false
router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title = to.meta.title;
  }
  next()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
