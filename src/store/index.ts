import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import mutations from './mutations'
import actions from './actions'
import state, { IState } from './state'
import { IBoard } from '@/models/ICell'
import { IPiece } from '@/models/IPiece'

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

export default new Vuex.Store<IState>({
  state,
  getters: {
    board: ({ board }) => board,
    boardPieces: ({ board }) => boardPieces(board),
    gamePhase: ({ gamePhase }) => gamePhase,
    player1: ({ player1 }) => player1,
    player1UnsetPieces: ({ player1, board }) => {
      const pieceIds = boardPieceIds(boardPieces(board))
      return player1.pieces.filter((piece) => !pieceIds.includes(piece.id))
    },
    player2: ({ player2 }) => player2,
    player2UnsetPieces: ({ player2, board }) => {
      const pieceIds = boardPieceIds(boardPieces(board))
      return player2.pieces.filter((piece) => !pieceIds.includes(piece.id))
    },
    cellSelected: ({ cellSelected }) => cellSelected,
    pieceSelected: ({ cellSelected }) => cellSelected?.piece ?? null
  },
  mutations,
  actions,
  plugins: [vuexLocal.plugin]
})
