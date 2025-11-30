<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  min?: number | string
  max?: number | string
  step?: number | string
}>()
const emit = defineEmits<{
  input: [event: InputEvent]
}>()

const value = defineModel<number>()
const showInput = ref(false)
</script>

<template>
  <div class="flex flex-col gap-4">
    <input
      type="range"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      class="selector h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700"
      v-model.number="value"
      @input="(e) => emit('input', e)"
      @click.right="
        (e) => {
          showInput = !showInput
          e.preventDefault()
        }
      "
    />
    <input
      v-show="showInput"
      type="number"
      :min="props.min"
      :max="props.max"
      class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      v-model.number="value"
    />
  </div>
</template>

<style scoped>
.selector {
  display: block;
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
}

input[type='number'] {
  @apply appearance-none;
  appearance: textfield;
  -moz-appearance: textfield;
}

input[type='number']:focus {
  @apply appearance-none;
  appearance: textfield;
  -moz-appearance: textfield;
}
</style>
