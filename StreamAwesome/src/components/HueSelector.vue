<script setup lang="ts">
import { defineProps, ref } from 'vue'
const props = defineProps({
  value: Number
})

let currentValue = ref(props.value)
const emit = defineEmits(['input'])

function emitUpdate() {
  emit('input', currentValue.value)
}
</script>

<template>
  <label for="hueSelector" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
    >Hue:</label
  >
  <input
    type="range"
    id="hueSelector"
    max="360"
    min="0"
    v-model="currentValue"
    @input="emitUpdate"
  />
</template>

<style scoped>
#hueSelector {
  display: block;
  background: linear-gradient(
    90deg,
    hsl(0, 72%, 56%) 0%,
    hsl(60, 72%, 56%) 25%,
    hsl(120, 72%, 56%) 33.3%,
    hsl(240, 72%, 56%) 66.6%,
    hsl(360, 72%, 56%) 100%
  );
  height: 1rem;
  width: 100%;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  outline: 2px solid transparent;
  outline-offset: 2px;
}

input[type='range']::-webkit-slider-thumb,
input[type='range']::-moz-range-thumb {
  height: 2rem;
  width: 1rem;
  cursor: grab;
  display: block;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: 2px solid transparent;
  border: none;
  border-radius: 0.25rem;
  background-color: hsl(var(--selected-hue), 72%, 56%);
}
</style>
