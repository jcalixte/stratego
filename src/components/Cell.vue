<template>
  <section class="cell">
    <pre>{{ cell }}</pre>
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
}
</script>

<style lang="scss" scoped>
section {
  flex: 1;
  border: 0.5px solid black;
  pre {
    font-size: 10px;
  }
}
</style>
