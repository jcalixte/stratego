import { ICell, IBoard } from '@/models/ICell'
import { IPiece } from '@/models/IPiece'
import { ColorPlayer } from '@/enums/ColorPlayer'

export const initBoard = (): IBoard => {
  const row: ICell[] = Array.from({ length: 10 }, (_c, colIndex: number) => ({
    row: 0,
    col: colIndex,
    piece: null
  }))

  return Array.from({ length: 10 }, (_r, rowIndex: number) =>
    row.map((cell: ICell) => ({ ...cell, row: rowIndex }))
  )
}

export const putInBoard = (
  piece: IPiece,
  row: number,
  col: number,
  board: IBoard
): IBoard => {
  const rowFound = board.find((_row, rowIndex: number) => rowIndex === row)
  if (!rowFound) {
    return board
  }

  const cell = rowFound.find((_cell, colIndex) => colIndex === col)
  if (cell) {
    cell.piece = piece
  }
  return board
}

export const getPlayerZone = (colorPlayer: ColorPlayer, board: IBoard) => {
  switch (colorPlayer) {
    case ColorPlayer.Red:
      return board.filter((_row, rowIndex) => rowIndex < 4)
    case ColorPlayer.Blue:
      return board.filter((_row, rowIndex) => rowIndex > 5)
  }
  return board
}
