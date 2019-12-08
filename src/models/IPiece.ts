import { PieceType } from '@/enums/PieceType'
import { Rank } from '@/enums/Rank'
import { ColorPlayer } from '@/enums/ColorPlayer'

export interface IPiece {
  color: ColorPlayer
  type: PieceType
  rank?: Rank
}
