import { GameStatus } from '@/enums/GameStatus'
import { Phase } from '@/enums/Phase'

export interface IGame {
  status: GameStatus
  phase: Phase
}
