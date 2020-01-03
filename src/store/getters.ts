import { GetterTree } from 'vuex'
import { IState } from '@/store/state'
import { GameStatus } from '@/enums/GameStatus'
import { IBoard } from '@/models/ICell'
import { IPiece } from '@/models/IPiece'
import { getPossibleMoves } from '@/services/BoardService'
import { ColorPlayer } from '@/enums/ColorPlayer'
import { PieceType } from '@/enums/PieceType'

const boardPieces = (board: IBoard) =>
  board
    .flat()
    .filter((cell) => cell.piece)
    .map((cell) => cell.piece)

const boardPieceIds = (pieces: Array<IPiece | null>) =>
  pieces.map((piece) => piece?.id)

const unsetPieces = (board: IBoard, pieces: IPiece[]) => {
  const pieceIds = boardPieceIds(boardPieces(board))
  return pieces.filter((piece) => !pieceIds.includes(piece.id))
}
export const getters: GetterTree<IState, IState> = {
  game: ({ game }) => game,
  board: ({ board }) => board,
  boardPieces: ({ board }) => boardPieces(board),
  player1: ({ player1 }) => player1,
  player1UnsetPieces: ({ board, player1 }) =>
    unsetPieces(board, player1.pieces),
  isPlayer1Ready: ({ game, board, player1 }) =>
    game.status < GameStatus.Player1Ready &&
    unsetPieces(board, player1.pieces).length === 0,
  player2: ({ player2 }) => player2,
  player2UnsetPieces: ({ board, player2 }) =>
    unsetPieces(board, player2.pieces),
  isPlayer2Ready: ({ game, board, player2 }) =>
    game.status < GameStatus.Player2Ready &&
    unsetPieces(board, player2.pieces).length === 0,
  cellSelected: ({ cellSelected }) => cellSelected,
  pieceSelected: ({ cellSelected }) => cellSelected?.piece ?? null,
  possibleMoves: ({ board, cellSelected }) =>
    getPossibleMoves(board, cellSelected),
  turns: ({ turns }) => turns,
  winner: ({ game, board, player1, player2 }) => {
    if (game.status < GameStatus.Live) {
      return null
    }

    const pieces = boardPieces(board)

    const hasPlayer2AFlagOrAUnitInGame = pieces.some(
      (piece) =>
        piece?.color === ColorPlayer.Red &&
        [PieceType.Flag, PieceType.Unit].includes(piece.type)
    )
    if (!hasPlayer2AFlagOrAUnitInGame) {
      return player1
    }

    const hasPlayer1AFlagOrAUnitInGame = pieces.some(
      (piece) =>
        piece?.color === ColorPlayer.Blue &&
        [PieceType.Flag, PieceType.Unit].includes(piece.type)
    )
    if (!hasPlayer1AFlagOrAUnitInGame) {
      return player2
    }
  }
}
