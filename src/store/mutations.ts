import { MutationTree } from 'vuex'
import { IState } from './state'
import { IPiece } from '@/models/IPiece'
import { ICell } from '@/models/ICell'
import { GameStatus } from '@/enums/GameStatus'
import { getWinnerPiece } from '@/services/BoardService'

export const SET_GUID = 'SET_GUID'
export const CLEAR_BOARD = 'CLEAR_BOARD'
export const SELECT_PIECE = 'SELECT_PIECE'
export const SET_PIECE_TO_CELL = 'SET_PIECE_TO_CELL'
export const PLAYER_1_READY = 'PLAYER_1_READY'
export const PLAYER_2_READY = 'PLAYER_2_READY'
export const PLAY_PLAYER_ONE = 'TIME_TO_PLAY'
export const PLAY_FINISHED = 'PLAY_FINISHED'

export interface IPieceToCell {
  piece: IPiece
  cell: ICell
}

export default {
  [SET_GUID](state, guid) {
    state.guid = guid
  },
  [SET_PIECE_TO_CELL](state, { piece, cell }: IPieceToCell) {
    const fromCell = state.board.flat().find((c) => c.piece?.id === piece.id)
    if (fromCell) {
      fromCell.piece = null
    }

    const cellBoard = state.board[cell.row][cell.col]
    if (cellBoard) {
      const setPiece = (newPiece: IPiece | null, isWinner = false) => {
        if (newPiece) {
          cellBoard.piece = { ...newPiece }
        } else {
          cellBoard.piece = null
        }
        if (fromCell) {
          state.turns = state.turns || []
          state.turns.push({
            colorPlayer: piece.color,
            from: fromCell,
            to: cellBoard,
            winner: isWinner && newPiece ? newPiece : undefined
          })
        }
      }
      if (cellBoard.piece) {
        const winnerPiece = getWinnerPiece(piece, cellBoard.piece)
        setPiece(winnerPiece, true)
      } else {
        setPiece(piece)
      }
    }
  },
  [SELECT_PIECE](state, { cell }) {
    if (cell) {
      state.cellSelected = { ...cell }
    } else {
      state.cellSelected = null
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
  },
  [PLAY_FINISHED]({ game }) {
    switch (game.status) {
      case GameStatus.Player1Playing:
        game.status = GameStatus.Player2Playing
        break
      case GameStatus.Player2Playing:
        game.status = GameStatus.Player1Playing
        break
    }
  }
} as MutationTree<IState>
