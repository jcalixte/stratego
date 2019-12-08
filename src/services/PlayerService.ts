import { PieceType } from '@/enums/PieceType'
import { Rank } from '@/enums/Rank'
import { IPiece } from '@/models/IPiece'
import { ColorPlayer } from '@/enums/ColorPlayer'

export const initPlayerPieces = (color: ColorPlayer): IPiece[] => {
  return [
    { color, type: PieceType.Flag },
    { color, type: PieceType.Bomb },
    { color, type: PieceType.Bomb },
    { color, type: PieceType.Bomb },
    { color, type: PieceType.Bomb },
    { color, type: PieceType.Bomb },
    { color, type: PieceType.Bomb },
    { color, type: PieceType.Unit, rank: Rank.Spy },
    { color, type: PieceType.Unit, rank: Rank.Scout },
    { color, type: PieceType.Unit, rank: Rank.Scout },
    { color, type: PieceType.Unit, rank: Rank.Scout },
    { color, type: PieceType.Unit, rank: Rank.Scout },
    { color, type: PieceType.Unit, rank: Rank.Scout },
    { color, type: PieceType.Unit, rank: Rank.Scout },
    { color, type: PieceType.Unit, rank: Rank.Scout },
    { color, type: PieceType.Unit, rank: Rank.Scout },
    { color, type: PieceType.Unit, rank: Rank.Miner },
    { color, type: PieceType.Unit, rank: Rank.Miner },
    { color, type: PieceType.Unit, rank: Rank.Miner },
    { color, type: PieceType.Unit, rank: Rank.Miner },
    { color, type: PieceType.Unit, rank: Rank.Miner },
    { color, type: PieceType.Unit, rank: Rank.Sergeant },
    { color, type: PieceType.Unit, rank: Rank.Sergeant },
    { color, type: PieceType.Unit, rank: Rank.Sergeant },
    { color, type: PieceType.Unit, rank: Rank.Sergeant },
    { color, type: PieceType.Unit, rank: Rank.Lieutenant },
    { color, type: PieceType.Unit, rank: Rank.Lieutenant },
    { color, type: PieceType.Unit, rank: Rank.Lieutenant },
    { color, type: PieceType.Unit, rank: Rank.Lieutenant },
    { color, type: PieceType.Unit, rank: Rank.Captain },
    { color, type: PieceType.Unit, rank: Rank.Captain },
    { color, type: PieceType.Unit, rank: Rank.Captain },
    { color, type: PieceType.Unit, rank: Rank.Captain },
    { color, type: PieceType.Unit, rank: Rank.Major },
    { color, type: PieceType.Unit, rank: Rank.Major },
    { color, type: PieceType.Unit, rank: Rank.Major },
    { color, type: PieceType.Unit, rank: Rank.Colonel },
    { color, type: PieceType.Unit, rank: Rank.Colonel },
    { color, type: PieceType.Unit, rank: Rank.General },
    { color, type: PieceType.Unit, rank: Rank.Marshall }
  ]
}