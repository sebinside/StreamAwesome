<script setup lang="ts">
import { ref } from 'vue'
import SliderPicker from './RangeInput.vue'

const hue = defineModel<number>()
const currentHue = ref(hue)
</script>

<template>
  <SliderPicker class="hueSelector" v-model="hue" min="0" max="360" />
</template>

<style scoped>
.hueSelector:deep(input[type='range']) {
  height: 1rem;
  background: linear-gradient(
    90deg,
    hsl(0, 72%, 56%) 0%,
    hsl(60, 72%, 56%) 25%,
    hsl(120, 72%, 56%) 33.3%,
    hsl(240, 72%, 56%) 66.6%,
    hsl(360, 72%, 56%) 100%
  );
}

.hueSelector:deep(input[type='range']::-webkit-slider-thumb),
.hueSelector:deep(input[type='range']::-moz-range-thumb) {
  background-color: hsl(v-bind('currentHue'), 72%, 56%);
}
</style>
