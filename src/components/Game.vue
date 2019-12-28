<template>
  <section class="game">
    <aside v-if="player1">
      <h4>
        Joueur 1
      </h4>
      <PlayerPiece :player="player1" :pieces="player1UnsetPieces" />
      <button v-if="isPlayer1Ready" @click="player1Ready">je suis prêt</button>
    </aside>
    <section class="board">
      <section
        class="row"
        v-for="(row, rowIndex) in board"
        :key="`row-${rowIndex}`"
      >
        <Cell
          v-for="(cell, colIndex) in row"
          :key="`col-${colIndex}`"
          :cell="cell"
          :display-player-zone="true"
        />
      </section>
    </section>
    <aside v-if="player2">
      <h4>
        Joueur 2
      </h4>
      <PlayerPiece :player="player2" :pieces="player2UnsetPieces" />
      <button v-if="isPlayer1Ready && isPlayer2Ready" @click="player2Ready">
        je suis prêt
      </button>
    </aside>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

import { IBoard } from '@/models/ICell'
import { initBoard } from '@/services/BoardService'
import Cell from '@/components/Cell.vue'
import PlayerPiece from '@/components/PlayerPiece.vue'
import { IPlayer } from '@/models/IPlayer'
import { IPiece } from '../models/IPiece'
import { IGame } from '../models/IGame'
import { GameStatus } from '../enums/GameStatus'

@Component({
  components: {
    Cell,
    PlayerPiece
  }
})
export default class Game extends Vue {
  private gameId: string = ''
  @Getter
  private game!: Game
  @Getter
  private board!: IBoard
  @Getter
  private player1!: IPlayer
  @Getter
  private player1UnsetPieces!: IPiece[]
  @Getter
  private player2!: IPlayer
  @Getter
  private player2UnsetPieces!: IPiece[]
  @Getter
  private isPlayer1Ready!: boolean
  @Getter
  private isPlayer2Ready!: boolean

  @Action
  private player1Ready!: any
  @Action
  private player2Ready!: any
  @Action
  private timeToPlay!: any

  @Watch('game', { deep: true, immediate: true })
  private onGameChange(game: IGame) {
    if (game.status === GameStatus.Player2Ready) {
      this.timeToPlay()
    }
  }
}
</script>

<style lang="scss" scoped>
section.game {
  display: flex;
  margin: 0 1rem;
  align-items: flex-start;
}

section.board {
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex: 1;
}

aside {
  flex: 1;
}

.row {
  display: flex;
  flex: 1 0 100%;
  justify-content: center;
}
</style>
