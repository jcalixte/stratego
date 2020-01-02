export enum GameStatus {
  Pending,
  PlayersSet,
  Player1Ready,
  Player2Ready,
  Live,
  Player1Playing,
  Player2Playing,
  Ended
}

interface IGameStatusLabel {
  [key: string]: string
}

export const GameStatusLabel: IGameStatusLabel = {
  [GameStatus.Pending]: 'En attente',
  [GameStatus.PlayersSet]: 'Les joueurs positionnent leurs pièces',
  [GameStatus.Player1Ready]: 'Joueur 1 prêt',
  [GameStatus.Player2Ready]: 'Joueur 2 prêt',
  [GameStatus.Live]: 'Bataille prête !',
  [GameStatus.Player1Playing]: 'Au tour du joueur 1',
  [GameStatus.Player2Playing]: 'Au tour du joueur 2',
  [GameStatus.Ended]: 'Fin de partie'
}
