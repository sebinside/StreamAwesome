<script setup lang="ts">
import SliderPicker from './RangeInput.vue'

const { hue } = defineProps<{
  hue: number
}>()

const lightness = defineModel<number>()
</script>

<template>
  <SliderPicker class="lightnessSelector" v-model="lightness" min="0.05" max="0.95" step="0.01" />
</template>

<style scoped>
.lightnessSelector:deep(input[type='range']) {
  height: 1rem;
  background: linear-gradient(
    90deg,
    hsl(v-bind('hue'), 72%, 5%) 0%,
    hsl(v-bind('hue'), 72%, 95%) 100%
  );
}
</style>
