import { PieceType } from '@/enums/PieceType'
import { Rank } from '@/enums/Rank'
import { IPiece } from '@/models/IPiece'
import { ColorPlayer } from '@/enums/ColorPlayer'

export const initPlayerPieces = (color: ColorPlayer): IPiece[] => {
  let i = 0
  return [
    { color, type: PieceType.Flag, id: `${color}-${i++}-${PieceType.Flag}` },
    { color, type: PieceType.Bomb, id: `${color}-${i++}-${PieceType.Bomb}` },
    { color, type: PieceType.Bomb, id: `${color}-${i++}-${PieceType.Bomb}` },
    { color, type: PieceType.Bomb, id: `${color}-${i++}-${PieceType.Bomb}` },
    { color, type: PieceType.Bomb, id: `${color}-${i++}-${PieceType.Bomb}` },
    { color, type: PieceType.Bomb, id: `${color}-${i++}-${PieceType.Bomb}` },
    { color, type: PieceType.Bomb, id: `${color}-${i++}-${PieceType.Bomb}` },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Spy
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Scout
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Scout
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Scout
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Scout
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Scout
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Scout
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Scout
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Scout
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Miner
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Miner
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Miner
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Miner
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Miner
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Sergeant
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Sergeant
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Sergeant
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Sergeant
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Lieutenant
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Lieutenant
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Lieutenant
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Lieutenant
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Captain
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Captain
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Captain
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Captain
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Major
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Major
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Major
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Colonel
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Colonel
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.General
    },
    {
      color,
      type: PieceType.Unit,
      id: `${color}-${i++}-${PieceType.Unit}`,
      rank: Rank.Marshall
    }
  ]
}

export const getPlayerAndPieceId = (playerAndPieceId: string) => {
  const [player, pieceId] = playerAndPieceId.split('_')

  return {
    player: parseInt(player, 10) as ColorPlayer,
    pieceId
  }
}
