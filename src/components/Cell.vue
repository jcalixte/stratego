<template>
  <section class="cell">
    <pre>{{ cell }}</pre>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ICell } from '../models/ICell'

@Component
export default class Cell extends Vue {
  @Prop({ required: true })
  private cell!: ICell
}
</script>

<style lang="scss" scoped>
section {
  flex: 1;
}
</style>
