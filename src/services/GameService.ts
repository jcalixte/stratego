import { IGame } from '@/models/IGame'
import { GameStatus } from '@/enums/GameStatus'
import { Phase } from '@/enums/Phase'
import { IGameDocument } from '@/models/IGameDocument'
import database from '@/repository/database'

export const initGame = (document: IGameDocument): IGame => {
  return {
    id: document._id,
    player1Uuid: document.player1Uuid,
    player2Uuid: document.player2Uuid,
    status: GameStatus.Pending,
    phase: Phase.Setup
  }
}

export const fetchGame = async (id: string) => {
  const game = await database.get(id)

  if (!game) {
    return null
  }

  return game
}
