import { MutationTree } from 'vuex'
import { IState } from './state'
import { IPiece } from '@/models/IPiece'
import { ICell } from '@/models/ICell'

export const SET_GUID = 'SET_GUID'
export const SET_PIECE_TO_CELL = 'SET_PIECE_TO_CELL'

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
      cellBoard.piece = { ...piece }
    }
  }
} as MutationTree<IState>
