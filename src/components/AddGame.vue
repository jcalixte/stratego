<template>
  <div class="add-game">
    <label for="game-id">Créer ou rejoindre une partie</label>
    <button @click="createGame">Créer une partie</button>
    <input type="text" id="game-id" name="game-id" v-model="gameId" />
    <button @click="joinGame">rejoindre</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

@Component
export default class AddGame extends Vue {
  private gameId: string = ''

  @Action
  private retrieveGame!: any

  private async createGame() {
    const game = await this.retrieveGame()
    if (game) {
      this.$router.push({
        name: 'game',
        params: {
          id: game._id
        }
      })
    }
  }

  private async joinGame() {
    const game = await this.retrieveGame(this.gameId)
    if (game) {
      this.$router.push({
        name: 'game',
        params: {
          id: this.gameId
        }
      })
    }
  }
}
</script>
