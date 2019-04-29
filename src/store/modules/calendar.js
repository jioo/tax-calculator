import { holidaysIn2019 } from '@/utils/official-holidays'
import moment from 'moment-business-days'

const state = {
  calendarAttributes: [
    {
      highlight: {
        backgroundColor: '#ff8080', // red
      },
      dates: [
        ...holidaysIn2019.map(m => m.date)
      ],
    }
  ],
}

const getters = {
  calendarAttributes: state => state.calendarAttributes,

  holidays: state => state.calendarAttributes[0].dates.map(m => moment(m).format('YYYY-MM-DD')),
}

const mutations = {
  ADD_HOLIDAY (state, payload) {
    state.calendarAttributes[0].dates.push(payload)
  },

  REMOVE_HOLIDAY (state, payload) {
    state.calendarAttributes[0].dates.splice(payload, 1)
  },
}

const actions = {
  addHoliday ({ commit }, payload) {
    commit('ADD_HOLIDAY', payload)
  },

  removeHoliday ({ commit }, payload) {
    commit('REMOVE_HOLIDAY', payload)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}