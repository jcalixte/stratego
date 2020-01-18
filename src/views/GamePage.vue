<template>
  <div class="game-page">
    <button @click="clearBoard">CLEAR</button>
    <DisplayStatus />
    <Game />
    <GameTurn />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

import DisplayStatus from '@/components/DisplayStatus.vue'
import GameTurn from '@/components/GameTurn.vue'
import Game from '@/components/Game.vue'
import database from '@/repository/database'

@Component({
  components: {
    DisplayStatus,
    GameTurn,
    Game
  }
})
export default class GamePage extends Vue {
  @Prop({ type: String, required: true })
  private id!: string

  @Action
  private clearBoard!: any
  @Action
  private retrieveGame!: any

  private created() {
    database.initLive(this.id)
    this.retrieveGame(this.id)
  }
}
</script>
