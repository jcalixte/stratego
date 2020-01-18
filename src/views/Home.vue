<template>
  <div class="home">
    <AddGame />
  </div>
</template>

<script>
import AddGame from '@/components/AddGame.vue'
import { mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    AddGame
  },
  created() {
    this.setGuid()
  },
  methods: {
    ...mapActions(['setGuid'])
  }
}
</script>
