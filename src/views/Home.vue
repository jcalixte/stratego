<template>
  <div class="home">
    <button @click="clearBoard">CLEAR</button>
    <DisplayStatus />
    <Game />
    <GameTurn />
  </div>
</template>

<script>
import DisplayStatus from '@/components/DisplayStatus.vue'
import GameTurn from '@/components/GameTurn.vue'
import Game from '@/components/Game.vue'
import { mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    DisplayStatus,
    GameTurn,
    Game
  },
  methods: {
    ...mapActions(['clearBoard'])
  }
}
</script>
