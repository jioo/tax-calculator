const state = {
  type: 'Private Employee',
  types: [
    'Private Employee',
    'Government Employee',
    'Self Employed',
  ],
  workingDaysPerWeek: 5,
  hasContribution: true,
  salary: {
    annual: 0,
    monthly: 0,
    semiMonthly: 0,
    weekly: 0,
    daily: 0,
  },
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
   * Employee Type: 'Private Employee', 'Government Employee', 'Self Employed'
   */
  type: state => state.type,

  /**
   * List of employee type
   */
  types: state => state.types,

  /**
   * List of salary period
   */
  salary: state => state.salary,

  /**
   * Number of Working Days per Week
   */
  workingDaysPerWeek: state => state.workingDaysPerWeek,

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
  UPDATE_TYPE (state, payload) {
    state.type = payload
  },

  UPDATE_WORKING_DAYS (state, payload) {
    state.workingDaysPerWeek = payload
  },

  UPDATE_HAS_CONTRIBUTION (state, payload) {
    state.hasContribution = payload
  },

  UPDATE_SALARY (state, payload) {
    state.salary = payload
  },

  UPDATE_CONTRIBUTIONS (state, payload) {
    state.contributions = payload
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

  RESET_STATE (state) {
    state.type = 'Private Employee'
    state.workingDaysPerWeek = 5
    state.salary = {
      annual: 0,
      monthly: 0,
      semiMonthly: 0,
      weekly: 0,
      daily: 0,
    }
    state.contributions = {
      sss: 0,
      gsis: 0,
      pagibig: 0,
      philhealth: 0,
    }
    state.totalContribution = 0
    state.withholdingTax = 0
  },
} 

const actions = {
  updateType ({ commit }, payload) {
    commit('UPDATE_TYPE', payload)
  },

  updateWorkingDays ({ commit }, payload) {
    commit('UPDATE_WORKING_DAYS', payload)
  },

  updateHasContribution ({ commit }, payload) {
    commit('UPDATE_HAS_CONTRIBUTION', payload)
  },

  updateSalary ({ commit }, payload) {
    commit('UPDATE_SALARY', payload)
  },

  updateContributions ({ commit }, payload) {
    commit('UPDATE_CONTRIBUTIONS', payload)
    commit('UPDATE_TOTAL_CONTRIBUTION', payload)
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

  resetState ({ commit }) {
    commit('RESET_STATE')
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}