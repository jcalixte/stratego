import { ICell } from '@/models/ICell'

export const initBoard = () => {
  const row: ICell[] = Array.from({ length: 10 }, (_c, rowIndex: number) => ({
    row: rowIndex,
    col: 0
  }))

  return Array.from({ length: 10 }, (_r, colIndex: number) =>
    row.map((cell) => ({ ...cell, col: colIndex }))
  )
}
