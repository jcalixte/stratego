import { ICell } from '@/models/ICell'
import { Phase } from '@/enums/Phase'
import { IPlayer } from '@/models/IPlayer'
import { initPlayer } from '@/services/BoardService'
import { ColorPlayer } from '@/enums/ColorPlayer'

export interface IState {
  guid: string
  cellSelected: ICell | null
  player1: IPlayer
  player2: IPlayer
  gamePhase: Phase
}

const state: IState = {
  cellSelected: null,
  gamePhase: Phase.Setup,
  player1: initPlayer(ColorPlayer.Blue),
  player2: initPlayer(ColorPlayer.Red),
  guid: ''
}

export default state
