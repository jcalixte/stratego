<template>
  <div class="piece-board">
    <pre>{{ piece }}</pre>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IPiece } from '../models/IPiece'

@Component
export default class PieceBoard extends Vue {
  @Prop({ type: Object, required: true })
  private piece!: IPiece
}
</script>
