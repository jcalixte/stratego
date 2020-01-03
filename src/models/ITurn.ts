import { ColorPlayer } from '@/enums/ColorPlayer'
import { ICell } from './ICell'
import { IPiece } from './IPiece'

export interface ITurn {
  colorPlayer: ColorPlayer
  from: ICell
  to: ICell
  winner?: IPiece
}
