<template>
  <select v-model="value"></select>
</template>

<script lang="ts">
import Vue from 'vue'
import { Model } from 'vue-property-decorator'
import { IPiece } from '../models/IPiece'

export default class PieceSelect extends Vue {
  @Model('input')
  private value: IPiece | null = null
}
</script>
