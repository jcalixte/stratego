<template>
  <div class="home">
    <AddGame />
    <Game />
  </div>
</template>

<script>
import AddGame from '@/components/AddGame.vue'
import Game from '@/components/Game.vue'

export default {
  name: 'home',
  components: {
    AddGame,
    Game
  }
}
</script>
