import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app'
import router from './routers'

import './assets/css/reset'

Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App)
}).$mount('#root')
