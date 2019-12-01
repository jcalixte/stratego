import { ActionTree } from 'vuex'
import { IState } from './state'
import { SET_GUID } from './mutations'
import uuid from 'uuid/v4'

export default {
  setGuid({ state, commit }) {
    if (!state.guid) {
      commit(SET_GUID, uuid())
    }
  }
} as ActionTree<IState, IState>
