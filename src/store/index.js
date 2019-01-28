import Vue from 'vue'
import Vuex from 'vuex'

import global from './global'

const {state, getters, mutations, actions} = global

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

registerModules(require.context('./modules', false, /\.js/))

// 自动注册模块
function registerModules (rFn) {
  rFn.keys().map((item) => {
    const moduleName = toCamel((item.replace('\.\/', '').replace('\.js', '')))

    store.registerModule(moduleName, rFn(item).default)
  })
}

/**
 * 转化为驼峰
 * @param {String} str
 * @example a.bb.cc ==> aBbCc
 */
function toCamel (str) {
  if (!str) {
    return
  }

  if (!str.includes('.')) {
    return str
  }

  str = str.split('.')

  str = str.map((item, index) => {
    if (index !== 0) {
      item = item.slice(0, 1).toUpperCase() + item.slice(1)
    }

    return item
  })

  return str.join('')
}

export default store
