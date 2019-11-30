<template>
  <div class="add-game">
    <label for="game-id">Join a game</label>
    <input type="text" id="game-id" name="game-id" v-model="gameId" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AddGame extends Vue {
  private gameId: string = ''
}
</script>
