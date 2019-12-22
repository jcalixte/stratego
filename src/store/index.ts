import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import mutations from './mutations'
import actions from './actions'
import state, { IState } from './state'
import { IBoard } from '@/models/ICell'
import { IPiece } from '@/models/IPiece'
import { GameStatus } from '@/enums/GameStatus'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence<IState>({
  key: 'stratego',
  storage: window.localStorage
})

const boardPieces = (board: IBoard) =>
  board
    .flat()
    .filter((cell) => cell.piece)
    .map((cell) => cell.piece)

const boardPieceIds = (pieces: Array<IPiece | null>) =>
  pieces.map((piece) => piece?.id)

const unsetPieces = (board: IBoard, pieces: IPiece[]) => {
  const pieceIds = boardPieceIds(boardPieces(board))
  return pieces.filter((piece) => !pieceIds.includes(piece.id))
}

export default new Vuex.Store<IState>({
  state,
  getters: {
    game: ({ game }) => game,
    board: ({ board }) => board,
    boardPieces: ({ board }) => boardPieces(board),
    player1: ({ player1 }) => player1,
    player1UnsetPieces: ({ board, player1 }) =>
      unsetPieces(board, player1.pieces),
    isPlayer1Ready: ({ game, board, player1 }) =>
      game.status < GameStatus.Player1Ready &&
      unsetPieces(board, player1.pieces).length === 0,
    player2: ({ player2 }) => player2,
    player2UnsetPieces: ({ board, player2 }) =>
      unsetPieces(board, player2.pieces),
    isPlayer2Ready: ({ game, board, player2 }) =>
      game.status < GameStatus.Player2Ready &&
      unsetPieces(board, player2.pieces).length === 0,
    cellSelected: ({ cellSelected }) => cellSelected,
    pieceSelected: ({ cellSelected }) => cellSelected?.piece ?? null
  },
  mutations,
  actions,
  plugins: [vuexLocal.plugin]
})
