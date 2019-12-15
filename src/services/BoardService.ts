import { ICell, IBoard } from '@/models/ICell'
import { IPiece } from '@/models/IPiece'
import { ColorPlayer } from '@/enums/ColorPlayer'
import { IPlayer } from '@/models/IPlayer'
import { initPlayerPieces } from './PlayerService'

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

export const initPlayers = () => {
  const player1: IPlayer = {
    color: ColorPlayer.Blue,
    pieces: initPlayerPieces(ColorPlayer.Blue)
  }
  const player2: IPlayer = {
    color: ColorPlayer.Red,
    pieces: initPlayerPieces(ColorPlayer.Red)
  }
  return [player1, player2]
}
