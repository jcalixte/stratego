import { ColorPlayer } from '@/enums/ColorPlayer'
import { ICell } from './ICell'

export interface ITurn {
  colorPlayer: ColorPlayer
  from: ICell
  to: ICell
}
