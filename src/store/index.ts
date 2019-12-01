import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import mutations from './mutations'
import actions from './actions'
import state, { IState } from './state'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence<IState>({
  key: 'stratego',
  storage: window.localStorage
})

export default new Vuex.Store<IState>({
  state,
  mutations,
  actions,
  plugins: [vuexLocal.plugin]
})
