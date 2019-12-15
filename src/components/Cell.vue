<template>
  <section class="cell" :class="{ odd: isOdd }">
    <section :class="colorZone">
      <piece-board v-if="cell.piece" :piece="cell.piece" />
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ICell } from '../models/ICell'
import PieceBoard from './PieceBoard.vue'
import { getPlayerZoneByRowIndex } from '@/services/BoardService'
import { ColorPlayer } from '../enums/ColorPlayer'

@Component({
  components: { PieceBoard }
})
export default class Cell extends Vue {
  @Prop({ required: true })
  private cell!: ICell
  @Prop({ type: Boolean, default: false })
  private displayPlayerZone!: boolean

  private get isOdd(): boolean {
    return (this.cell.row + this.cell.col) % 2 === 1
  }

  private get colorZone() {
    if (!this.displayPlayerZone) {
      return null
    }
    const colorPlayer = getPlayerZoneByRowIndex(this.cell.row)
    if (colorPlayer === ColorPlayer.Red) {
      return 'red'
    }
    if (colorPlayer === ColorPlayer.Blue) {
      return 'blue'
    }
    return null
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';

section {
  flex: 1;
  border: 0.5px solid black;
  width: 60px;
  height: 60px;
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
