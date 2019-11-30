<template>
  <div class="game">
    <table>
      <tr v-for="(row, rowIndex) in board" :key="`row-${rowIndex}`">
        <td v-for="(cell, colIndex) in row" :key="`col-${colIndex}`">
          <pre>{{ cell }}</pre>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ICell } from '../models/ICell'
import { initBoard } from '@/services/BoardService'

@Component
export default class Game extends Vue {
  private gameId: string = ''
  private board: ICell[][] = initBoard()
}
</script>

<style lang="scss" scoped>
table {
  margin: auto;
}
</style>
