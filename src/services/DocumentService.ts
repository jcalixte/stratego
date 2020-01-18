import { IGameDocument } from '@/models/IGameDocument'
import { initBoard, initPlayer } from './BoardService'
import { GameStatus } from '@/enums/GameStatus'
import { ColorPlayer } from '@/enums/ColorPlayer'

export const createGame = (_id: string, player1Uuid: string): IGameDocument => {
  return {
    _id,
    player1Uuid,
    player2Uuid: '',
    board: initBoard(),
    gameStatus: GameStatus.Pending,
    player1: initPlayer(ColorPlayer.Blue),
    player2: initPlayer(ColorPlayer.Red),
    turns: []
  }
}

export const joinGame = (
  game: IGameDocument,
  player2Uuid: string
): IGameDocument => {
  return {
    ...game,
    player2Uuid
  }
}
