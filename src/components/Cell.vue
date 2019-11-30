<template>
  <div class="cell">
    <td>{{ cell }}</td>
  </div>
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
table {
  margin: auto;
}
</style>
