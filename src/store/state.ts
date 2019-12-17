import { ICell, IBoard } from '@/models/ICell'
import { Phase } from '@/enums/Phase'
import { IPlayer } from '@/models/IPlayer'
import { initPlayer, initBoard } from '@/services/BoardService'
import { ColorPlayer } from '@/enums/ColorPlayer'

export interface IState {
  board: IBoard
  guid: string
  cellSelected: ICell | null
  gamePhase: Phase
  player1: IPlayer
  player2: IPlayer
}

const state: IState = {
  board: initBoard(),
  cellSelected: null,
  gamePhase: Phase.Setup,
  player1: initPlayer(ColorPlayer.Blue),
  player2: initPlayer(ColorPlayer.Red),
  guid: ''
}

export default state
