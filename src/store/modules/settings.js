const state = {
  isSimpleCalculator: false,
  type: 'Private Employee',
  types: [
    'Private Employee',
    'Government Employee',
    'Self Employed',
  ],
  workingDaysPerWeek: 5,
}

const getters = {
  /**
   * Employee Type: 'Private Employee', 'Government Employee', 'Self Employed'
   */
  type: state => state.type,

  /**
   * List of employee type
   */
  types: state => state.types,

  /**
   * Number of Working Days per Week
   */
  workingDaysPerWeek: state => state.workingDaysPerWeek,
}

const mutations = {
  UPDATE_TYPE (state, payload) {
    state.type = payload
  },

  UPDATE_WORKING_DAYS (state, payload) {
    state.workingDaysPerWeek = payload
  },
} 

const actions = {
  updateType ({ commit }, payload) {
    commit('UPDATE_TYPE', payload)
  },

  updateWorkingDays ({ commit }, payload) {
    commit('UPDATE_WORKING_DAYS', payload)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}