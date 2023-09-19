<script setup lang="ts">
import type Icon from '../model/icon'
import IconGenerator from '../utils/generator'

const props = defineProps({
  icon: {
    type: Object as () => Icon
  }
})

function callGenerator() {
  if (props.icon) {
    new IconGenerator().generateIcon(props.icon)
  }
}
</script>

<template>
  <canvas id="symbol" width="256" height="256" class="rounded-3xl border border-cyan-500"></canvas>
  <p @click="callGenerator">Recevied {{ icon?.symbol || 'no icon' }}</p>
</template>
