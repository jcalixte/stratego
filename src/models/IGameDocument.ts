import { GameStatus } from '@/enums/GameStatus'
import { IPlayer } from './IPlayer'
import { ITurn } from './ITurn'
import { IBoard } from './ICell'

export interface IGameDocument {
  _id: string
  _rev?: string
  gameStatus: GameStatus
  player1Uuid: string
  player2Uuid: string
  player1: IPlayer
  player2: IPlayer
  turns: ITurn[]
  board: IBoard
}
