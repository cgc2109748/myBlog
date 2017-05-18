// require('babel-polyfill');
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import _ from 'lodash'
window._ = _

import 'font-awesome/scss/font-awesome.scss'
import 'src/assets/styles/index.scss'

import {auth, interceptor} from './api'

Vue.use(VueRouter)
import routes from './router'
const router = new VueRouter({
  // mode: 'hash',
  mode: 'history',
  base: __dirname,
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

auth.refreshAuth()
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => !record.meta.noCheckSession)) {
    let isLogin = auth.checkAuth()
    if (!isLogin) {
      console.error('Please login!')
      next({
        path: '/Login',
        // query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
Vue.use(VueResource)
interceptor(Vue)



Vue.config.productionTip = false

/* eslint-disable no-new */
// const app = new Vue({
//   router
// }).$mount('#app')
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
})

window.router = router

import Message from 'components/message'
window.Message = Message
import Notice from 'components/notice'
Vue.prototype.$Notice = Notice
window.Notice = Notice
