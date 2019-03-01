const state = {
  hasContribution: true,
  contributions: {
    sss: 0,
    gsis: 0,
    pagibig: 0,
    philhealth: 0,
  },
  totalContribution: 0,
}

const getters = {
  /**
   * Whether to include contributions in tax computation
   */
  hasContribution: state => state.hasContribution,

  /**
   * List of contributions: SSS, GSIS, PAGIBIG, Philhealth
   */
  contributions: state => state.contributions,

  /**
   * Total Contributions
   * 
   * For Private Employee and Self Employed: SSS + PAGIBIG + Philhealth
   * For Government Employee: GSIS + PAGIBIG + Philhealth
   * 
   */
  totalContribution: state => state.totalContribution,
}

const mutations = {
  UPDATE_HAS_CONTRIBUTION (state, payload) {
    state.hasContribution = payload
  },

  UPDATE_TOTAL_CONTRIBUTION (state, payload) {
    const contributions = payload,
          employeeType = state.type
    
    const result = Object.keys(contributions)
        .filter(key => (employeeType === 'Government Employee') ? key !== 'sss' : key !== 'gsis')
        .reduce((previous, key) => {
          return previous + contributions[key];
        }, 0);

    state.totalContribution = result
  },

  UPDATE_CONTRIBUTIONS (state, payload) {
    state.contributions = payload
  },

  UPDATE_TOTAL_CONTRIBUTION (state, payload) {
    const { contributions, type } = payload
    
    const result = Object.keys(contributions)
        .filter(key => (type === 'Government Employee') ? key !== 'sss' : key !== 'gsis')
        .reduce((previous, key) => {
          return previous + contributions[key];
        }, 0);
    state.totalContribution = result
  },

  UPDATE_SSS (state, payload) {
    state.contributions.sss = payload
  },

  UPDATE_GSIS (state, payload) {
    state.contributions.gsis = payload
  },

  UPDATE_PAGIBIG (state, payload) {
    state.contributions.pagibig = payload
  },

  UPDATE_PHILHEALTH (state, payload) {
    state.contributions.philhealth = payload
  },
}

const actions = {
  updateHasContribution ({ commit }, payload) {
    commit('UPDATE_HAS_CONTRIBUTION', payload)
  },

  updateContributions ({ commit }, payload) {
    commit('UPDATE_CONTRIBUTIONS', payload)
  },

  updateTotalContribution ({ commit, rootGetters }, payload) {
    const type = rootGetters.type
    commit('UPDATE_TOTAL_CONTRIBUTION', { contributions: payload, type})
  },

  updateSss ({ commit }, payload) {
    commit('UPDATE_SSS', payload)
  },

  updateGsis ({ commit }, payload) {
    commit('UPDATE_GSIS', payload)
  },

  updatePagibig ({ commit }, payload) {
    commit('UPDATE_PAGIBIG', payload)
  },

  updatePhilhealth ({ commit }, payload) {
    commit('UPDATE_PHILHEALTH', payload)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}