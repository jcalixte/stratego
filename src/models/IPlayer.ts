import { IPiece } from './IPiece'
import { ColorPlayer } from '@/enums/ColorPlayer'

export interface IPlayer {
  color: ColorPlayer
  pieces: IPiece[]
}
