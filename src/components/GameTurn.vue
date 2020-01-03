<template>
  <div v-if="turns" class="turns">
    <ul>
      <li
        v-for="(turn, k) in turns"
        :key="k"
        class="turn-item"
        :class="{ 'has-winner': hasWinner(turn) }"
      >
        {{ turn.colorPlayer }} / {{ label[turn.from.col] }}{{ turn.from.row }} /
        {{ label[turn.to.col] }}{{ turn.to.row }}
        {{ turn.winner && turn.winner.rank }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { GameStatusLabel } from '@/enums/GameStatus'
import { ITurn } from '../models/ITurn'
import { ColumnLabel } from '@/enums/ColumnLabel'

@Component
export default class GameTurn extends Vue {
  @Getter
  private turns!: ITurn[]

  private label = ColumnLabel

  private hasWinner(turn: ITurn): boolean {
    return !!turn.winner
  }
}
</script>

<style lang="scss" scoped>
.turns {
  margin: 10px;
}
.turn-item {
  background-color: rgb(68, 68, 99);
  color: white;
  padding: 5px;

  &.has-winner {
    background-color: rgb(0, 0, 148);
  }
}
</style>