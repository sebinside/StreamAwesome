<script setup lang="ts">
import type Icon from '../model/Icon'

defineProps({
  icon: {
    type: Object as () => Icon
  }
})
</script>

<template>
  <canvas id="symbol" width="256" height="256" class="rounded-3xl border border-cyan-500"></canvas>
  <p>Recevied {{ icon?.symbol || 'no icon' }}</p>
</template>
