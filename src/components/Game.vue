<template>
  <section class="game">
    <aside>
      <h2>
        Player 1
      </h2>
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
    <aside>
      <h2>
        Player 2
      </h2>
    </aside>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ICell } from '../models/ICell'
import { initBoard } from '@/services/BoardService'
import Cell from '@/components/Cell.vue'

@Component({
  components: {
    Cell
  }
})
export default class Game extends Vue {
  private gameId: string = ''
  private board: ICell[][] = initBoard()
}
</script>

<style lang="scss" scoped>
section.game {
  display: flex;
  margin: 0 1rem;
}
section.board {
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.row {
  display: flex;
}
</style>
