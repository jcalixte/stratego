import { IGame } from '@/models/IGame'
import { GameStatus } from '@/enums/GameStatus'
import { Phase } from '@/enums/Phase'
import { IGameDocument } from '@/models/IGameDocument'

export const initGame = (document: IGameDocument): IGame => {
  return {
    id: document._id,
    player1Uuid: document.player1Uuid,
    player2Uuid: document.player2Uuid,
    status: GameStatus.Pending,
    phase: Phase.Setup
  }
}
