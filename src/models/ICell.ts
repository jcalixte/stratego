import { IPiece } from './IPiece'

export interface ICell {
  row: number
  col: number
  piece: IPiece | null
}

export type IBoard = ICell[][]
