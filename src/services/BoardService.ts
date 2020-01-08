import { ICell, IBoard } from '@/models/ICell'
import { IPiece } from '@/models/IPiece'
import { ColorPlayer } from '@/enums/ColorPlayer'
import { IPlayer } from '@/models/IPlayer'
import { initPlayerPieces } from './PlayerService'
import { GameStatus } from '@/enums/GameStatus'
import { PieceType } from '@/enums/PieceType'
import { Rank } from '@/enums/Rank'

const BOARD_SIZE = 10

export const initBoard = (): IBoard => {
  const rows: ICell[] = Array.from(
    { length: BOARD_SIZE },
    (_c, col: number) => ({
      row: 0,
      col,
      piece: null
    })
  )

  return Array.from({ length: BOARD_SIZE }, (_r, row: number) =>
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
    if (attacker.rank === Rank.Miner) {
      return attacker
    }
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

export const onePieceCanMove = (board: IBoard, color: ColorPlayer) => {
  return board
    .flat()
    .filter(
      (cell: ICell) =>
        cell.piece?.color === color && cell.piece.type === PieceType.Unit
    )
    .some((cell) => getPossibleMoves(board, cell).length > 0)
}

export const boardPieces = (board: IBoard) =>
  board
    .flat()
    .filter((cell) => cell.piece)
    .map((cell) => cell.piece as IPiece)

export const boardPieceIds = (pieces: Array<IPiece | null>) =>
  pieces.map((piece) => piece?.id)

export const unsetPieces = (board: IBoard, pieces: IPiece[]) => {
  const pieceIds = boardPieceIds(boardPieces(board))
  return pieces.filter((piece) => !pieceIds.includes(piece.id))
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
  const color = cell.piece.color
  const extraMoves = [cell, ...moves]
    .map((move) => getExtraAttachMoves(board, move, color))
    .flat()
  return [...moves, ...extraMoves]
}

const getVerticalMoves = (board: IBoard, cell: ICell): ICell[] => {
  if (!cell.piece) {
    return []
  }

  const maxMove = cell.piece.rank === Rank.Scout ? BOARD_SIZE : 1
  const column = board
    .flat()
    .filter((c) => c.col === cell.col)
    .filter(
      (c, index) =>
        c.row !== cell.row &&
        Math.abs(cell.row - index) <= maxMove &&
        canPlayOnThisCell(cell, c)
    )

  if (maxMove > 1) {
    return findingMinAndMax(column, cell, 'row')
  }

  return column
}

const getHorizontalMoves = (board: IBoard, cell: ICell): ICell[] => {
  if (!cell.piece) {
    return []
  }

  const maxMove = cell.piece.rank === Rank.Scout ? BOARD_SIZE : 1
  const row = board[cell.row].filter(
    (c, index) =>
      c.col !== cell.col &&
      Math.abs(cell.col - index) <= maxMove &&
      canPlayOnThisCell(cell, c)
  )
  if (maxMove > 1) {
    return findingMinAndMax(row, cell, 'col')
  }
  return row
}

const findingMinAndMax = (
  cells: ICell[],
  fromCell: ICell,
  rowOrCol: 'row' | 'col'
) => {
  const colIndexes = cells.map((c) => c[rowOrCol])
  if (colIndexes.length === 0) {
    return cells
  }

  let maxIndex = fromCell[rowOrCol]
  let minIndex = fromCell[rowOrCol]

  for (let i = 1; i < BOARD_SIZE; i++) {
    const plus = fromCell[rowOrCol] + i
    if (colIndexes.some((index) => index === plus)) {
      maxIndex = plus
    } else {
      break
    }
  }

  for (let i = 1; i < BOARD_SIZE; i++) {
    const minus = fromCell[rowOrCol] - i
    if (colIndexes.some((index) => index === minus)) {
      minIndex = minus
    } else {
      break
    }
  }

  return cells.filter((c) => minIndex <= c[rowOrCol] && c[rowOrCol] <= maxIndex)
}

const getExtraAttachMoves = (
  board: IBoard,
  cell: ICell,
  color: ColorPlayer
): ICell[] => {
  const { row, col } = cell

  const otherColor =
    color === ColorPlayer.Blue ? ColorPlayer.Red : ColorPlayer.Blue

  const up = getCell(board, row - 1, col, otherColor)
  const bottom = getCell(board, row + 1, col, otherColor)
  const left = getCell(board, row, col - 1, otherColor)
  const right = getCell(board, row, col + 1, otherColor)

  return [up, bottom, left, right].filter((cell) => !!cell) as ICell[]
}

const getCell = (
  board: IBoard,
  row: number,
  col: number,
  color: ColorPlayer
): ICell | null => {
  if (!board[row] || !board[row][col]) {
    return null
  }
  if (board[row][col].piece?.color === color) {
    return board[row][col]
  }
  return null
}

const canPlayOnThisCell = (fromCell: ICell, toCell: ICell): boolean => {
  return !toCell.piece && isCellPlayable(toCell.row, toCell.col)
}
