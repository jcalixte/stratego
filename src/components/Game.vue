<template>
  <section class="game">
    <aside v-for="(player, p) in players" :key="player.color">
      <h2>Joueur {{ p + 1 }}</h2>
      <ul>
        <li v-for="(piece, k) in player.pieces" :key="k">
          <PieceBoard :piece="piece" />
        </li>
      </ul>
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
        />
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ICell } from '../models/ICell'
import { initBoard, initPlayers } from '@/services/BoardService'
import Cell from '@/components/Cell.vue'
import PieceBoard from '@/components/PieceBoard.vue'
import { IPlayer } from '../models/IPlayer'

@Component({
  components: {
    Cell,
    PieceBoard
  }
})
export default class Game extends Vue {
  private gameId: string = ''
  private board: ICell[][] = initBoard()
  private players: IPlayer[] = initPlayers()
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
  order: 1;
}

.row {
  display: flex;
}
</style>
