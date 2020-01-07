import { ActionTree } from 'vuex'
import { IState } from './state'
import {
  IPieceToCell,
  SET_GUID,
  SET_PIECE_TO_CELL,
  CLEAR_BOARD,
  PLAYER_1_READY,
  PLAYER_2_READY,
  PLAY_PLAYER_ONE,
  SELECT_PIECE,
  PLAY_FINISHED,
  GAME_FINISHED
} from './mutations'
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
  },
  selectPiece({ commit }, { cell }) {
    commit(SELECT_PIECE, { cell })
  },
  clearBoard({ commit }) {
    commit(CLEAR_BOARD)
  },
  player1Ready({ commit }) {
    commit(PLAYER_1_READY)
  },
  player2Ready({ commit }) {
    commit(PLAYER_2_READY)
  },
  timeToPlay({ commit }) {
    commit(PLAY_PLAYER_ONE)
  },
  playFinished({ commit }) {
    commit(PLAY_FINISHED)
  },
  gameFinished({ commit }) {
    commit(GAME_FINISHED)
  }
} as ActionTree<IState, IState>
