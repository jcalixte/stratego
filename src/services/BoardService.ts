import { ICell, IBoard } from '@/models/ICell'
import { IPiece } from '@/models/IPiece'
import { ColorPlayer } from '@/enums/ColorPlayer'
import { IPlayer } from '@/models/IPlayer'
import { initPlayerPieces } from './PlayerService'

export const initBoard = (): IBoard => {
  const rows: ICell[] = Array.from({ length: 10 }, (_c, col: number) => ({
    row: 0,
    col,
    piece: null
  }))

  return Array.from({ length: 10 }, (_r, row: number) =>
    rows.map((cell: ICell) => ({ ...cell, row }))
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

export const isCellPlayable = (row: number, col: number): boolean => {
  const nonRows = [4, 5]
  const nonCols = [2, 3, 6, 7]

  const notPlayable = nonRows.includes(row) && nonCols.includes(col)

  return !notPlayable
}

export const getPlayerZoneByRowIndex = (row: number): ColorPlayer | null => {
  if (row < 4) {
    return ColorPlayer.Red
  }
  if (row > 5) {
    return ColorPlayer.Blue
  }
  return null
}

export const getPlayerZone = (
  colorPlayer: ColorPlayer,
  board: IBoard
): IBoard => {
  switch (colorPlayer) {
    case ColorPlayer.Red:
      return board.filter((_row, rowIndex) => rowIndex < 4)
    case ColorPlayer.Blue:
      return board.filter((_row, rowIndex) => rowIndex > 5)
  }
}

export const initPlayer = (color: ColorPlayer): IPlayer => {
  return {
    color,
    pieces: initPlayerPieces(color)
  }
}
