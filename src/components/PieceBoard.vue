<template>
  <div class="piece-board" draggable="true" @dragstart="dragstart">
    <div>{{ piece.rank || piece.type }}</div>
    <img v-if="hasAsset" :src="getAsset()" :alt="piece.rank" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IPiece } from '../models/IPiece'
import { PieceType } from '../enums/PieceType'
import { PieceAsset } from '../enums/PieceAsset'
import { ColorPlayer } from '../enums/ColorPlayer'

const images = require.context('../assets/units', false, /\.png$/)

@Component
export default class PieceBoard extends Vue {
  @Prop({ type: Number, required: false })
  private player?: ColorPlayer
  @Prop({ type: Object, required: true })
  private piece!: IPiece
  private pieceAsset = PieceAsset

  private hasAsset(): boolean {
    return (
      this.piece.type !== PieceType.Unit &&
      this.piece.rank !== undefined &&
      !!PieceAsset.rank[this.piece.rank]
    )
  }

  private getAsset() {
    if (
      this.piece.type !== PieceType.Unit &&
      this.pieceAsset.type[this.piece.type]
    ) {
      return images(`./${this.pieceAsset.type[this.piece.type]}`)
    }
    if (
      this.piece.rank !== undefined &&
      this.pieceAsset.rank[this.piece.rank]
    ) {
      return images(`./${this.pieceAsset.rank[this.piece.rank]}`)
    }
    return null
  }

  private dragstart(event: any) {
    if (this.player === undefined) {
      return
    }
    const id = `${this.player}_${this.piece.id}`
    event.dataTransfer.setData('text', id)
    event.dataTransfer.dropEffect = 'move'
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 30px;
  height: auto;
}
</style>
