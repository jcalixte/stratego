import { ICell, IBoard } from '@/models/ICell'
import { IPiece } from '@/models/IPiece'
import { IPlayer } from '@/models/IPlayer'
import { ColorPlayer } from '@/enums/ColorPlayer'

export const initBoard = (): IBoard => {
  const row: ICell[] = Array.from({ length: 10 }, (_c, rowIndex: number) => ({
    row: rowIndex,
    col: 0,
    piece: null
  }))

  return Array.from({ length: 10 }, (_r, colIndex: number) =>
    row.map((cell: ICell) => ({ ...cell, col: colIndex }))
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

export const getPlayerZone = (player: IPlayer, board: IBoard) => {
  switch (player.color) {
    case ColorPlayer.Blue:
      return board.filter((_row, rowIndex) => rowIndex < 4)
    case ColorPlayer.Red:
      return board.filter((_row, rowIndex) => rowIndex > 5)
  }
  return board
}
