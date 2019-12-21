<template>
  <div class="player-piece">
    <div v-for="(piece, k) in player.pieces" :key="k">
      <PieceBoard :player="player.color" :piece="piece" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IPlayer } from '../models/IPlayer'
import PieceBoard from '@/components/PieceBoard.vue'

@Component({
  components: {
    PieceBoard
  }
})
export default class Game extends Vue {
  @Prop({ type: Object, required: true })
  private player!: IPlayer
}
</script>

<style>
.player-piece {
  display: grid;
  grid-template-columns: 50px 50px 50px 50px;
  grid-gap: 5px;
  border: 2px solid #444;
  margin: 0 5px;
}
</style>
