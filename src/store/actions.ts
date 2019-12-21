import { ActionTree } from 'vuex'
import { IState } from './state'
import { SET_GUID, SET_PIECE_TO_CELL, IPieceToCell } from './mutations'
import uuid from 'uuid/v4'

export default {
  setGuid({ state, commit }) {
    if (!state.guid) {
      commit(SET_GUID, uuid())
    }
  },
  setPieceToCell({ commit }, { piece, cell }: IPieceToCell) {
    if (cell) {
      commit(SET_PIECE_TO_CELL, { piece, cell })
    }
  }
} as ActionTree<IState, IState>
