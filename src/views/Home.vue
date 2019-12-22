<template>
  <div class="home">
    <button @click="clearBoard">CLEAR</button>
    <AddGame />
    <Game />
  </div>
</template>

<script>
import AddGame from '@/components/AddGame.vue'
import Game from '@/components/Game.vue'
import { mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    AddGame,
    Game
  },
  methods: {
    ...mapActions(['clearBoard'])
  }
}
</script>
