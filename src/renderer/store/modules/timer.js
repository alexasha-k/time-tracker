const state = {
  currentItem: null,
  currentItemTitle: '',
  currentTask: null,
  startTime: null
}

const actions = {
  SET_CURRENT_ITEM ({ commit }, item) {
    commit('SET_CURRENT_ITEM', item)
  }
}

const mutations = {
  SET_CURRENT_ITEM (state, item) {
    if (!item) {
      state.currentItem = null
      state.startTime = null
      state.currentTask = null
      state.currentItemTitle = ''
    } else {
      state.currentItem = item.currentItem
      state.currentTask = item.currentTask
      state.startTime = item.startTime
      state.currentItemTitle = item.currentItemTitle
    }
  },
  INITIALISE_STORE (state) {
    if (localStorage.getItem('current-task')) {
      const currentTask = JSON.parse(localStorage.getItem('current-task'))
      if (currentTask.currentItem) {
        state = currentTask
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
