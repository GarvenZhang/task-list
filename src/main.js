import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app'
import router from './routers'
import store from './store'

import './assets/css/reset'
import './assets/font/iconfont'

Vue.use(VueRouter)

new Vue({
  store,
  router,
  data () {
    return {
      Bus: new Vue()
    }
  },
  render: h => h(App)
}).$mount('#root')
