<template>
  <section
    class="cell"
    :class="{
      odd: isPlayable && isOdd,
      playable: isPlayable,
      'non-playable': !isPlayable
    }"
    @dblclick="clear"
    @dragover="dragover"
    @drop="drop"
  >
    <section :class="colorZone">
      <piece-board v-if="cell.piece" :piece="cell.piece" />
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

import { ICell } from '../models/ICell'
import PieceBoard from './PieceBoard.vue'
import {
  getPlayerZoneByRowIndex,
  isCellPlayable
} from '@/services/BoardService'
import { getPlayerAndPieceId } from '@/services/PlayerService'
import { ColorPlayer } from '../enums/ColorPlayer'
import { IPlayer } from '../models/IPlayer'
import { IGame } from '../models/IGame'
import { GameStatus } from '../enums/GameStatus'

@Component({
  components: { PieceBoard }
})
export default class Cell extends Vue {
  @Prop({ required: true })
  private cell!: ICell
  @Prop({ type: Boolean, default: false })
  private displayPlayerZone!: boolean

  @Getter
  private game!: IGame
  @Getter
  private player1!: IPlayer
  @Getter
  private player2!: IPlayer
  @Action
  private setPieceToCell!: any

  private dragover(event: any) {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  private drop(event: any) {
    event.preventDefault()
    const playerAndPieceId = event.dataTransfer.getData('text')
    const { player, pieceId } = getPlayerAndPieceId(playerAndPieceId)
    if (this.colorPlayer !== player) {
      return
    }
    const realPlayer = player === ColorPlayer.Blue ? this.player1 : this.player2
    const piece = realPlayer.pieces.find((p) => p.id === pieceId)
    if (piece) {
      this.setPieceToCell({ cell: this.cell, piece })
    }
  }

  private get id(): string {
    return `cell-${this.cell.row}-${this.cell.col}`
  }

  private get isOdd(): boolean {
    return (this.cell.row + this.cell.col) % 2 === 1
  }

  private get isPlayable(): boolean {
    return isCellPlayable(this.cell.row, this.cell.col)
  }

  private get colorPlayer(): ColorPlayer | null {
    if (!this.displayPlayerZone) {
      return null
    }
    return getPlayerZoneByRowIndex(this.cell.row)
  }

  private get colorZone() {
    if (this.colorPlayer === ColorPlayer.Red) {
      return 'red'
    }
    if (this.colorPlayer === ColorPlayer.Blue) {
      return 'blue'
    }
    return null
  }

  private clear() {
    if (this.game.status >= GameStatus.Live) {
      return
    }
    this.setPieceToCell({ cell: this.cell, piece: null })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';

section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;

  &.playable {
    border: 0.5px solid black;
  }

  &.non-playable {
    border: 0.5px solid #00000000;
  }

  pre {
    font-size: 10px;
  }
  &.odd {
    background-color: rgba(0, 0, 0, 0.3);
  }

  .red {
    background-color: $red_color;
  }

  .blue {
    background-color: $blue_color;
  }
}
</style>
