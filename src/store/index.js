import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import main from './modules/main'
import settings from './modules/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  // plugins: [
  //   createPersistedState()
  // ],

  modules: {
    main,
    settings,
  }
})