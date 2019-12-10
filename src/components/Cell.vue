<template>
  <section class="cell" :class="{ odd: isOdd }">
    <piece-board v-if="cell.piece" :piece="cell.piece" />
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ICell } from '../models/ICell'
import PieceBoard from './PieceBoard.vue'

@Component({
  components: { PieceBoard }
})
export default class Cell extends Vue {
  @Prop({ required: true })
  private cell!: ICell

  private get isOdd(): boolean {
    return (this.cell.row + this.cell.col) % 2 === 1
  }
}
</script>

<style lang="scss" scoped>
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
}
</style>
