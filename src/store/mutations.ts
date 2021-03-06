import { MutationTree } from 'vuex'
import { IState } from './state'
import { IPiece } from '@/models/IPiece'
import { ICell } from '@/models/ICell'
import { GameStatus } from '@/enums/GameStatus'
import { getFightResultPiece } from '@/services/BoardService'
import { IGameDocument } from '@/models/IGameDocument'
import { initGame } from '@/services/GameService'

export const SET_GUID = 'SET_GUID'
export const INIT_GAME = 'INIT_GAME'
export const CLEAR_BOARD = 'CLEAR_BOARD'
export const SELECT_PIECE = 'SELECT_PIECE'
export const SET_PIECE_TO_CELL = 'SET_PIECE_TO_CELL'
export const PLAYER_1_READY = 'PLAYER_1_READY'
export const PLAYER_2_READY = 'PLAYER_2_READY'
export const PLAY_PLAYER_ONE = 'TIME_TO_PLAY'
export const PLAY_FINISHED = 'PLAY_FINISHED'
export const GAME_FINISHED = 'GAME_FINISHED'

export interface IPieceToCell {
  piece: IPiece
  cell: ICell
}

type InitGameProp = {
  document: IGameDocument
  isPlayer1: boolean
  isPlayer2: boolean
}

export default {
  [SET_GUID](state, guid) {
    state.guid = guid
  },
  [INIT_GAME](state, prop: InitGameProp) {
    if (!prop || !prop.document) {
      return
    }
    state.board = prop.document.board
    state.game = initGame(prop.document)
    state.player1 = prop.document.player1
    state.player2 = prop.document.player2
  },
  [SET_PIECE_TO_CELL](state, { piece, cell }: IPieceToCell) {
    if (!state.board) {
      return
    }
    const fromCell = state.board.flat().find((c) => c.piece?.id === piece.id)
    if (fromCell) {
      fromCell.piece = null
    }

    const cellBoard = state.board[cell.row][cell.col]
    if (cellBoard) {
      const setPiece = (winner: IPiece | null, loser: IPiece | null = null) => {
        if (winner) {
          cellBoard.piece = { ...winner }
        } else {
          cellBoard.piece = null
        }
        if (fromCell) {
          state.turns = state.turns || []
          state.turns.push({
            colorPlayer: piece.color,
            from: fromCell,
            to: cellBoard,
            winner: winner && loser ? winner : undefined,
            loser: winner && loser ? loser : undefined
          })
        }
      }
      if (cellBoard.piece) {
        const [winnerPiece, loserPiece] = getFightResultPiece(
          piece,
          cellBoard.piece
        )
        setPiece(winnerPiece, loserPiece)
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
  [CLEAR_BOARD](state) {
    if (!state.board || !state.game) {
      return
    }
    state.board.flat().forEach((cell) => (cell.piece = null))
    state.game.status = GameStatus.Pending
    state.turns = []
  },
  [PLAYER_1_READY]({ game }) {
    if (!game) {
      return
    }
    game.status = GameStatus.Player1Ready
  },
  [PLAYER_2_READY]({ game }) {
    if (!game) {
      return
    }
    game.status = GameStatus.Player2Ready
  },
  [PLAY_PLAYER_ONE]({ game }) {
    if (!game) {
      return
    }
    game.status = GameStatus.Player1Playing
  },
  [PLAY_FINISHED]({ game }) {
    if (!game) {
      return
    }
    switch (game.status) {
      case GameStatus.Player1Playing:
        game.status = GameStatus.Player2Playing
        break
      case GameStatus.Player2Playing:
        game.status = GameStatus.Player1Playing
        break
    }
  },
  [GAME_FINISHED]({ game }) {
    if (!game) {
      return
    }
    game.status = GameStatus.Ended
  }
} as MutationTree<IState>
