import taxCalculator from '@/utils/2018-to-2022-tax-calculator'
import '@/prototypes'

const state = {
  type: 'Private Employee',
  salary: '',
  workingDaysPerWeek: 5,
  contributions: {
    sss: '',
    gsis: '',
    pagibig: '',
    philhealth: '',
  },
  totalContribution: 0,
  withholdingTax: 0,
}

const getters = {
  /**
   * Employee Type: 'Private Employee', 'Government Employee', 'Self Employed'
   */
  type: state => state.type,

  /**
   * Number of Working Days per Week
   */
  workingDaysPerWeek: state => state.workingDaysPerWeek,

  /**
   * List of contributions: SSS, GSIS, PAGIBIG, Philhealth
   */
  contributions: state => state.contributions,

  /**
   * Calculation of contributions
   * 
   * For Private Employee and Self Employed: SSS + PAGIBIG + Philhealth
   * For Government Employee: GSIS + PAGIBIG + Philhealth
   * 
   */
  totalContribution: state => state.totalContribution,

  /**
   * 
   */
  withholdingTax: (state, getters) => taxCalculator(getters)
}

const mutations = {
  UPDATE_STATE (state, payload) {
    const { type, salary, contributions } = payload

    state.type = type
    state.salary = salary
    state.contributions = contributions
  },

  RESET_STATE (state) {
    state = {
      type: 'Private Employee',
      salary: '',
      workingDaysPerWeek: 5,
      contributions: {
        sss: '',
        gsis: '',
        pagibig: '',
        philhealth: '',
      },
      totalContribution: 0,
      withholdingTax: 0,
    }
  },
} 

const actions = {
  updateState ({ commit }, payload) {
    commit('UPDATE_STATE', payload)
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