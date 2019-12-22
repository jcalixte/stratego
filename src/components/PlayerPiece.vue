<template>
  <div class="player-piece" v-if="pieces.length">
    <PieceBoard
      class="piece-board"
      v-for="(piece, k) in pieces"
      :key="k"
      :player="player.color"
      :piece="piece"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IPlayer } from '../models/IPlayer'
import PieceBoard from '@/components/PieceBoard.vue'
import { IPiece } from '../models/IPiece'

@Component({
  components: {
    PieceBoard
  }
})
export default class PlayerPiece extends Vue {
  @Prop({ type: Object, required: true })
  private player!: IPlayer
  @Prop({ type: Array, required: true })
  private pieces!: IPiece[]
}
</script>

<style lang="scss" scoped>
.player-piece {
  display: grid;
  grid-template-columns: repeat(6, 50px);
  grid-gap: 5px;
  border: 2px solid #444;
  margin: 5px;

  .piece-board {
    margin: 5px 0;
  }
}
</style>
