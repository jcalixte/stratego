import { ICell } from '@/models/ICell'

export interface IState {
  guid: string
  cellSelected: ICell | null
}

export default {
  cellSelected: null,
  guid: ''
} as IState
