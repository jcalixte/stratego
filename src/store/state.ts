import { ICell } from '@/models/ICell'
import { IPiece } from '@/models/IPiece'

export interface IState {
  guid: string
  cellSelected: ICell | null
}

const state: IState = {
  cellSelected: null,
  guid: ''
}

export default state
