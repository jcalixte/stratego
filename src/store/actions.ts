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
  GAME_FINISHED,
  INIT_GAME
} from './mutations'
import uuid from 'uuid/v4'
import { fetchGame } from '@/services/GameService'
import { createGame, joinGame } from '@/services/DocumentService'
import database from '@/repository/database'
import { IGameDocument } from '@/models/IGameDocument'

export default {
  setGuid({ state, commit }) {
    if (!state.guid) {
      commit(SET_GUID, uuid())
    }
  },
  async retrieveGame({ state, commit, getters }, id?: string) {
    if (state.game?.id !== id) {
      commit(CLEAR_BOARD)
    }
    let game: IGameDocument | null = null

    if (!id) {
      const newId = uuid()
      game = createGame(newId, state.guid)
      if (!game) {
        return null
      }
      await database.save(game)
      commit(INIT_GAME, { document: game })
      return game
    }

    game = await fetchGame(id)
    if (!game) {
      return null
    }

    if (game.player1Uuid !== state.guid && !game.player2Uuid) {
      game = joinGame(game, state.guid)
      await database.saveRemote(game)
    }

    commit(INIT_GAME, {
      document: game,
      isPlayer1: getters.isPlayer1,
      isPlayer2: getters.isPlayer2
    })
    return game
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
