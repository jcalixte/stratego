import { MutationTree } from 'vuex'
import { IState } from './state'
import { IPiece } from '@/models/IPiece'
import { ICell } from '@/models/ICell'
import { GameStatus } from '@/enums/GameStatus'

export const SET_GUID = 'SET_GUID'
export const CLEAR_BOARD = 'CLEAR_BOARD'
export const SET_PIECE_TO_CELL = 'SET_PIECE_TO_CELL'
export const PLAYER_1_READY = 'PLAYER_1_READY'
export const PLAYER_2_READY = 'PLAYER_2_READY'
export const PLAY_PLAYER_ONE = 'TIME_TO_PLAY'

export interface IPieceToCell {
  piece: IPiece
  cell: ICell
}

export default {
  [SET_GUID](state, guid) {
    state.guid = guid
  },
  [SET_PIECE_TO_CELL](state, { piece, cell }: IPieceToCell) {
    const cellBoard = state.board[cell.row][cell.col]
    if (cellBoard) {
      if (piece) {
        cellBoard.piece = { ...piece }
      } else {
        cellBoard.piece = null
      }
    }
  },
  [CLEAR_BOARD]({ board }) {
    board.flat().forEach((cell) => (cell.piece = null))
  },
  [PLAYER_1_READY]({ game }) {
    game.status = GameStatus.Player1Ready
  },
  [PLAYER_2_READY]({ game }) {
    game.status = GameStatus.Player2Ready
  },
  [PLAY_PLAYER_ONE]({ game }) {
    game.status = GameStatus.Player1Playing
  }
} as MutationTree<IState>
