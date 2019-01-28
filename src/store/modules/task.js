export const mutationTypes = {}
export const actionTypes = {}

const initialState = {
  taskList: [],
  task: {
    id: -1,
    name: '',
    priority: -1,
    startTime: +Date.now(),
    endTime: +Date.now(),
    status: -1,
    tag: -1,
    progress: 0
  }
}

const getters = {

}

const mutations = {

}

const actions = {

}

export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions
}
