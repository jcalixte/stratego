import { ICell, IBoard } from '@/models/ICell'
import { IPlayer } from '@/models/IPlayer'
import { IGame } from '@/models/IGame'
import { ITurn } from '@/models/ITurn'
import uuid from 'uuid/v4'

export interface IState {
  uuid: string
  board: IBoard | null
  game: IGame | null
  guid: string
  cellSelected: ICell | null
  player1: IPlayer | null
  player2: IPlayer | null
  turns: ITurn[]
}

const state: IState = {
  uuid: uuid(),
  board: null,
  game: null,
  cellSelected: null,
  player1: null,
  player2: null,
  guid: '',
  turns: []
}

export default state
