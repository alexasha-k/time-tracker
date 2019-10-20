import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
  modules,
  plugins: [createPersistedState()],
  strict: process.env.NODE_ENV !== 'production'
})

export default store

store.subscribe((mutation, state) => {
  const { timer } = state
  localStorage.setItem('current-task', JSON.stringify(timer))
})
