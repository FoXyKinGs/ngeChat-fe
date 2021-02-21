import Vue from 'vue'
import Vuex from 'vuex'
import moduleAuth from './modules/auth'
import moduleRegister from './modules/register'
import moduleUsers from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {
  },
  modules: {
    auth: moduleAuth,
    register: moduleRegister,
    user: moduleUsers
  }
})
