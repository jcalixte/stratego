import { GetterTree } from 'vuex'
import { IState } from '@/store/state'
import { GameStatus } from '@/enums/GameStatus'
import {
  getPossibleMoves,
  onePieceCanMove,
  boardPieces,
  unsetPieces
} from '@/services/BoardService'
import { ColorPlayer } from '@/enums/ColorPlayer'
import { PieceType } from '@/enums/PieceType'

export const getters: GetterTree<IState, IState> = {
  game: ({ game }) => game,
  board: ({ board }) => board,
  boardPieces: ({ board }) => board && boardPieces(board),
  player1: ({ player1 }) => player1,
  player1UnsetPieces: ({ board, player1 }) =>
    board && player1 && unsetPieces(board, player1.pieces),
  isPlayer1Ready: ({ game, board, player1 }) =>
    game &&
    board &&
    player1 &&
    game.status < GameStatus.Player1Ready &&
    unsetPieces(board, player1.pieces).length === 0,
  player2: ({ player2 }) => player2,
  player2UnsetPieces: ({ board, player2 }) =>
    board && player2 && unsetPieces(board, player2.pieces),
  isPlayer2Ready: ({ game, board, player2 }) =>
    game &&
    board &&
    player2 &&
    game.status < GameStatus.Player2Ready &&
    unsetPieces(board, player2.pieces).length === 0,
  cellSelected: ({ cellSelected }) => cellSelected,
  pieceSelected: ({ cellSelected }) => cellSelected?.piece ?? null,
  possibleMoves: ({ board, cellSelected }) =>
    board && getPossibleMoves(board, cellSelected),
  turns: ({ turns }) => turns,
  winner: ({ game, board, player1, player2 }) => {
    if (!game || !board || game.status < GameStatus.Live) {
      return null
    }

    const pieces = boardPieces(board)

    const hasPlayer2HisFlag = pieces.some(
      (piece) =>
        piece.type === PieceType.Flag && piece?.color === ColorPlayer.Red
    )
    if (!hasPlayer2HisFlag || !onePieceCanMove(board, ColorPlayer.Red)) {
      return player1
    }

    const hasPlayer1HisFlag = pieces.some(
      (piece) =>
        piece.type === PieceType.Flag && piece?.color === ColorPlayer.Blue
    )
    if (!hasPlayer1HisFlag || !onePieceCanMove(board, ColorPlayer.Blue)) {
      return player2
    }
    return null
  }
}
