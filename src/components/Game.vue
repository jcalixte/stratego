<template>
  <section class="game">
    <aside v-if="player1">
      <h4>Joueur 1</h4>
      <PlayerPiece :player="player1" />
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
      <h4>Joueur 2</h4>
      <PlayerPiece :player="player2" />
    </aside>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import { IBoard } from '@/models/ICell'
import { initBoard } from '@/services/BoardService'
import Cell from '@/components/Cell.vue'
import PlayerPiece from '@/components/PlayerPiece.vue'
import { IPlayer } from '@/models/IPlayer'

@Component({
  components: {
    Cell,
    PlayerPiece
  }
})
export default class Game extends Vue {
  private gameId: string = ''
  @Getter
  private board!: IBoard
  @Getter
  private player1!: IPlayer
  @Getter
  private player2!: IPlayer
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

.row {
  display: flex;
  justify-content: space-around;
}
</style>
