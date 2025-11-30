<script setup lang="ts">
import { ref } from 'vue'
import SliderPicker from './RangeInput.vue'

const saturation = defineModel<number>()
const currentSaturation = ref(saturation)
</script>

<template>
  <SliderPicker class="saturationSelector" v-model="saturation" min="0" max="1" step="0.01" />
</template>

<style scoped>
.saturationSelector >>> input[type='range'] {
  height: 1rem;
  background: linear-gradient(
    90deg,
    hsl(v-bind('currentSaturation'), 5%, 56%) 0%,
    hsl(v-bind('currentSaturation'), 100%, 56%) 100%
  );
}
</style>
