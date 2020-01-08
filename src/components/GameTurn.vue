<template>
  <div v-if="turns" class="turns">
    <ul>
      <li v-for="(turn, k) in turns" :key="k" class="turn-item">
        {{ turn.colorPlayer }} / {{ columnLabel[turn.from.col] }}
        {{ turn.from.row }} / {{ columnLabel[turn.to.col] }}{{ turn.to.row }}
        <span v-if="turn.winner && turn.loser">
          [<span :class="`color-${turn.winner.color}`"
            >{{ rankLabel[turn.winner.rank] }} ({{ turn.winner.rank }})</span
          >
          wins against
          <span :class="`color-${turn.loser.color}`"
            >{{ rankLabel[turn.loser.rank] }} ({{ turn.loser.rank }})</span
          >]
        </span>
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
import { Rank } from '@/enums/Rank'

@Component
export default class GameTurn extends Vue {
  @Getter
  private turns!: ITurn[]

  private columnLabel = ColumnLabel
  private rankLabel = Rank

  private hasWinner(turn: ITurn): boolean {
    return !!turn.winner
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.turns {
  margin: 10px;
}
.turn-item {
  padding: 5px;
}

.color-0 {
  background-color: $blue_color;
}
.color-1 {
  background-color: $red_color;
}
</style>