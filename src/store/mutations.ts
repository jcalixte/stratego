import { MutationTree } from 'vuex'
import { IState } from './state'

export const SET_GUID = 'SET_GUID'

export default {
  [SET_GUID](state, guid) {
    state.guid = guid
  }
} as MutationTree<IState>
