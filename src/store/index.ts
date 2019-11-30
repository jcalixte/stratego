import Vue from 'vue'
import Vuex from 'vuex'
import { ICell } from '@/models/ICell'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

interface IState {
  cellSelected: ICell | null
}

export default new Vuex.Store<IState>({
  state: {
    cellSelected: null
  },
  mutations,
  actions
})
