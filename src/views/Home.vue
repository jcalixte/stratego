<template>
  <div class="home">
    <button @click="clearBoard">CLEAR</button>
    <DisplayStatus />
    <Game />
  </div>
</template>

<script>
import DisplayStatus from '@/components/DisplayStatus.vue'
import Game from '@/components/Game.vue'
import { mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    DisplayStatus,
    Game
  },
  methods: {
    ...mapActions(['clearBoard'])
  }
}
</script>
