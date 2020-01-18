<template>
  <div class="piece-board " draggable="true" @dragstart="dragstart">
    <img v-if="isPlayerPiece && hasAsset" :src="getAsset()" :alt="piece.rank" />
    <div class="player-color" :class="`color-${piece.color}`">
      <span v-if="isPlayerPiece">{{ piece.rank }}</span>
      <span v-else>A</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { IPiece } from '../models/IPiece'
import { PieceType } from '../enums/PieceType'
import { PieceAsset } from '../enums/PieceAsset'
import { ColorPlayer } from '../enums/ColorPlayer'
import { IGame } from '../models/IGame'
import { GameStatus } from '../enums/GameStatus'

const images = require.context('../assets/units', false, /\.png$/)

@Component
export default class PieceBoard extends Vue {
  @Prop({ type: Number, required: false })
  private player?: ColorPlayer
  @Prop({ type: Object, required: true })
  private piece!: IPiece
  private pieceAsset = PieceAsset
  @Getter
  private game!: IGame
  @Getter
  private isPlayer1!: boolean
  @Getter
  private isPlayer2!: boolean

  private get isPlayerPiece(): boolean {
    if (this.player === undefined) {
      return true
    }
    return (
      (this.player === ColorPlayer.Blue && this.isPlayer1) ||
      (this.player === ColorPlayer.Red && this.isPlayer2)
    )
  }

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
    if (this.player === undefined || !this.isPlayerPiece) {
      return
    }
    if (this.game.status >= GameStatus.Live) {
      return
    }
    const id = `${this.player}_${this.piece.id}`
    event.dataTransfer.setData('text', id)
    event.dataTransfer.dropEffect = 'move'
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.piece-board {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.player-color {
  width: 20px;
  height: 20px;
  border-radius: 50%;

  &.color-0 {
    background-color: $blue_color;
  }
  &.color-1 {
    background-color: $red_color;
  }
}
img {
  width: 30px;
  height: auto;
}
</style>
