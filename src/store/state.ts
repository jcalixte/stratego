import { Phase } from '@/enums/Phase'
import { ColorPlayer } from '@/enums/ColorPlayer'
import { ICell, IBoard } from '@/models/ICell'
import { IPlayer } from '@/models/IPlayer'
import { IGame } from '@/models/IGame'
import { initPlayer, initBoard } from '@/services/BoardService'
import { initGame } from '@/services/GameService'
import { ITurn } from '@/models/ITurn'

export interface IState {
  board: IBoard
  game: IGame
  guid: string
  cellSelected: ICell | null
  player1: IPlayer
  player2: IPlayer
  turns: ITurn[]
}

const state: IState = {
  board: initBoard(),
  game: initGame(),
  cellSelected: null,
  player1: initPlayer(ColorPlayer.Blue),
  player2: initPlayer(ColorPlayer.Red),
  guid: '',
  turns: []
}

export default state
