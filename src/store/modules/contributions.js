const state = {
  hasContribution: true,
  contributions: {
    sss: { value: 0, percent: 50 },
    gsis: { value: 0, percent: 50 },
    pagibig: { value: 0, percent: 50 },
    philhealth: { value: 0, percent: 50 },
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

  UPDATE_CONTRIBUTIONS (state, payload) {
    state.contributions.sss.value = payload.sss
    state.contributions.gsis.value = payload.gsis
    state.contributions.pagibig.value = payload.pagibig
    state.contributions.philhealth.value = payload.philhealth
  },

  UPDATE_TOTAL_CONTRIBUTION (state, payload) {
    const { contributions, type } = payload
    
    const result = Object.keys(contributions)
        .filter(key => (type === 'Government Employee') ? key !== 'sss' : key !== 'gsis')
        .reduce((previous, key) => {
          return previous + contributions[key]
        }, 0)
    state.totalContribution = result
  },

  UPDATE_SSS (state, payload) {
    state.contributions.sss.value = payload
  },

  UPDATE_SSS_PERCENT (state, payload) {
    state.contributions.sss.percent = payload
  },

  UPDATE_GSIS (state, payload) {
    state.contributions.gsis.value = payload
  },

  UPDATE_GSIS_PERCENT (state, payload) {
    state.contributions.gsis.percent = payload
  },

  UPDATE_PAGIBIG (state, payload) {
    state.contributions.pagibig.value = payload
  },

  UPDATE_PAGIBIG_PERCENT (state, payload) {
    state.contributions.pagibig.percent = payload
  },

  UPDATE_PHILHEALTH (state, payload) {
    state.contributions.philhealth.value = payload
  },

  UPDATE_PHILHEALTH_PERCENT (state, payload) {
    state.contributions.philhealth.percent = payload
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

  updateSssPercent ({ commit }, payload) {
    console.log(payload)
    commit('UPDATE_SSS_PERCENT', payload)
  },

  updateGsis ({ commit }, payload) {
    commit('UPDATE_GSIS', payload)
  },

  updateGsisPercent ({ commit }, payload) {
    commit('UPDATE_GSIS_PERCENT', payload)
  },

  updatePagibig ({ commit }, payload) {
    commit('UPDATE_PAGIBIG', payload)
  },

  updatePagibigPercent ({ commit }, payload) {
    commit('UPDATE_PAGIBIG_PERCENT', payload)
  },

  updatePhilhealth ({ commit }, payload) {
    commit('UPDATE_PHILHEALTH', payload)
  },

  updatePhilhealthPercent ({ commit }, payload) {
    commit('UPDATE_PHILHEALTH_PERCENT', payload)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}