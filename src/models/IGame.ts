import { GameStatus } from '@/enums/GameStatus'
import { Phase } from '@/enums/Phase'

export interface IGame {
  id: string
  player1Uuid: string
  player2Uuid: string
  status: GameStatus
  phase: Phase
}
