import { IGame } from '@/models/IGame'
import { GameStatus } from '@/enums/GameStatus'
import { Phase } from '@/enums/Phase'

export const initGame = (): IGame => {
  return {
    status: GameStatus.Pending,
    phase: Phase.Setup
  }
}
