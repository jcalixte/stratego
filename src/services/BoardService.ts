import { ICell, IBoard } from '@/models/ICell'
import { IPiece } from '@/models/IPiece'
import { ColorPlayer } from '@/enums/ColorPlayer'
import { IPlayer } from '@/models/IPlayer'
import { initPlayerPieces } from './PlayerService'
import { GameStatus } from '@/enums/GameStatus'
import { PieceType } from '@/enums/PieceType'
import { Rank } from '@/enums/Rank'

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

export const isCellSelectable = (cell: ICell, status: GameStatus): boolean => {
  if (!cell.piece) {
    return false
  }
  if (cell.piece.type !== PieceType.Unit) {
    return false
  }
  const isPlayer1Playing =
    cell.piece.color === ColorPlayer.Blue &&
    status === GameStatus.Player1Playing
  const isPlayer2Playing =
    cell.piece.color === ColorPlayer.Red && status === GameStatus.Player2Playing

  return isPlayer1Playing || isPlayer2Playing
}

export const getWinnerPiece = (attacker: IPiece, defender: IPiece): IPiece => {
  if (defender.type === PieceType.Bomb) {
    return defender
  }
  if (defender.type === PieceType.Flag) {
    return attacker
  }
  if (attacker.rank === Rank.Spy && defender.rank === Rank.Marshall) {
    return attacker
  }

  return attacker.rank > defender.rank ? attacker : defender
}

export const getPossibleMoves = (
  board: IBoard,
  cell: ICell | null
): ICell[] => {
  if (!cell?.piece) {
    return []
  }
  const moves = [
    ...getHorizontalMoves(board, cell),
    ...getVerticalMoves(board, cell)
  ]
  return moves
}

const getVerticalMoves = (board: IBoard, cell: ICell): ICell[] => {
  if (!cell.piece) {
    return []
  }

  const maxMove = cell.piece.rank === Rank.Scout ? 1 : 1
  const column = board
    .flat()
    .filter((c) => c.col === cell.col)
    .filter(
      (c, index) =>
        c.row !== cell.row &&
        Math.abs(cell.row - index) <= maxMove &&
        canPlayOnThisCell(cell, c)
    )
  return column
}

const getHorizontalMoves = (board: IBoard, cell: ICell): ICell[] => {
  if (!cell.piece) {
    return []
  }

  const maxMove = cell.piece.rank === Rank.Scout ? 1 : 1
  const row = board[cell.row].filter(
    (c, index) =>
      c.col !== cell.col &&
      Math.abs(cell.col - index) <= maxMove &&
      canPlayOnThisCell(cell, c)
  )
  return row
}

const canPlayOnThisCell = (fromCell: ICell, toCell: ICell): boolean => {
  return (
    !hasSameColorPiece(fromCell, toCell) &&
    isCellPlayable(toCell.row, toCell.col)
  )
}

const hasSameColorPiece = (cell: ICell, moveCell: ICell): boolean => {
  return cell.piece?.color === moveCell.piece?.color
}
