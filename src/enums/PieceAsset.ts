import { Rank } from './Rank'
import { PieceType } from './PieceType'

interface IPieceAsset {
  type: { [key in PieceType]: string }
  rank: { [key in Rank]: string }
}

export const PieceAsset: IPieceAsset = {
  type: {
    [PieceType.Bomb]: 'bomb.png',
    [PieceType.Flag]: 'chevron-11.png',
    [PieceType.Unit]: 'chevron-7.png'
  },
  rank: {
    [Rank.Na]: '',
    [Rank.Spy]: 'chevron-12.png',
    [Rank.Scout]: 'chevron-20.png',
    [Rank.Miner]: 'chevron-10.png',
    [Rank.Sergeant]: 'chevron-8.png',
    [Rank.Lieutenant]: 'chevron-3.png',
    [Rank.Captain]: 'chevron-5.png',
    [Rank.Major]: 'chevron-6.png',
    [Rank.Colonel]: 'chevron-14.png',
    [Rank.General]: 'chevron-1.png',
    [Rank.Marshall]: 'chevron-18.png'
  }
}
