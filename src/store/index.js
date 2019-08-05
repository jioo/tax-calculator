import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import contributions from './modules/contributions'
import results from './modules/results'
import settings from './modules/settings'
import calendar from './modules/calendar'

Vue.use(Vuex)

export default new Vuex.Store({
  // plugins: [
  //   createPersistedState()
  // ],

  modules: {
    contributions,
    results,
    settings,
    calendar,
  }
})