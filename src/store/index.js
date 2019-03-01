import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import contributions from './modules/contributions'
import settings from './modules/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  // plugins: [
  //   createPersistedState()
  // ],

  modules: {
    contributions,
    settings,
  }
})