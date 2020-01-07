<template>
  <div v-if="game">
    <div v-if="winner">Vainqueur {{ winnerLabel }} !</div>
    <div v-else>
      {{ label[game.status] }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { GameStatusLabel } from '@/enums/GameStatus'
import { IGame } from '../models/IGame'
import { IPlayer } from '../models/IPlayer'
import { ColorPlayer } from '../enums/ColorPlayer'

@Component
export default class DisplayStatus extends Vue {
  @Getter
  private game!: IGame
  @Getter
  private winner!: IPlayer | null

  @Action
  private gameFinished!: any

  private label = GameStatusLabel

  private get winnerLabel() {
    if (!this.winner) {
      return ''
    }
    return this.winner.color === ColorPlayer.Blue ? 'Joueur 1' : 'Joueur 2'
  }

  @Watch('winner')
  private onWinnerSet(winner: IPlayer | null) {
    if (winner !== null) {
      this.gameFinished()
    }
  }
}
</script>
