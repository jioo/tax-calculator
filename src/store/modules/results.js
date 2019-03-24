const state = {
  resultIn2018: {
    monthly: {
      totalContribution: 0,
      taxableIncome: 0,
      withholdingTax: 0,
      netIncome: 0,
    },

    semiMonthly: [
      {
        totalContribution: 0,
        taxableIncome: 0,
        withholdingTax: 0,
        netIncome: 0,
      },
      {
        totalContribution: 0,
        taxableIncome: 0,
        withholdingTax: 0,
        netIncome: 0,
      },
    ]
  },

  resultIn2023 : {
    monthly: {
      totalContribution: 0,
      taxableIncome: 0,
      withholdingTax: 0,
      netIncome: 0,
    },

    semiMonthly: [
      {
        totalContribution: 0,
        taxableIncome: 0,
        withholdingTax: 0,
        netIncome: 0,
      },
      {
        totalContribution: 0,
        taxableIncome: 0,
        withholdingTax: 0,
        netIncome: 0,
      },
    ]
  },
}

const getters = {
  /**
   * Result from 2018 Tax Table
   */
  resultIn2018: state => state.resultIn2018,

  /**
   * Result from 2023 Tax Table
   */
  resultIn2023: state => state.resultIn2023,
}

const mutations = {
  UPDATE_2018_RESULT (state, payload) {
    const { periodType } = payload
    delete payload[periodType]

    state.resultIn2018[periodType] = payload
  },

  UPDATE_2023_RESULT (state, payload) {
    const { periodType } = payload
    delete payload[periodType]

    state.resultIn2023[periodType] = payload
  },
}

const actions = {
  update2018Result ({ commit }, payload) {
    commit('UPDATE_2018_RESULT', payload)
  },

  update2023Result ({ commit }, payload) {
    commit('UPDATE_2023_RESULT', payload)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}