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
  getters: {
    board: ({ board }) => board,
    gamePhase: ({ gamePhase }) => gamePhase,
    player1: ({ player1 }) => player1,
    player2: ({ player2 }) => player2,
    cellSelected: ({ cellSelected }) => cellSelected,
    pieceSelected: ({ cellSelected }) => cellSelected?.piece ?? null
  },
  mutations,
  actions,
  plugins: [vuexLocal.plugin]
})
