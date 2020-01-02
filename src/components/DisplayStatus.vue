<template>
  <div v-if="game">{{ label[game.status] }}</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { GameStatusLabel } from '@/enums/GameStatus'
import { IGame } from '../models/IGame'

@Component
export default class DisplayStatus extends Vue {
  @Getter
  private game!: IGame

  private label = GameStatusLabel
}
</script>
