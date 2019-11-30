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

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
