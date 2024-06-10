<script setup lang="ts">
import type { CustomIcon, ColorValue } from '@/model/customIcon'
import chroma from 'chroma-js'
import { ref } from 'vue'

// TODO: Replace color selector with actual legacy icon template
const DEFAULT_HUE = 217
const DEFAULT_SATURATION = 0.69
const DEFAULT_LIGHTNESS = 0.57

const props = defineProps({
  icon: {
    type: Object as () => CustomIcon
  }
})

const color = chroma(props.icon?.foregroundColor ?? '#000000')

const currentHue = ref(color.hsl()[0])
const currentSaturation = ref(color.hsl()[1])
const currentLightness = ref(color.hsl()[2])

const settingsExpanded = ref(false)

const toggleSettings = () => {
  settingsExpanded.value = !settingsExpanded.value
}

const emit = defineEmits<{
  input: [colorValue: ColorValue]
}>()

const resetColor = () => {
  currentHue.value = DEFAULT_HUE
  currentSaturation.value = DEFAULT_SATURATION
  currentLightness.value = DEFAULT_LIGHTNESS

  emit('input', { key: 'h', value: DEFAULT_HUE })
  emit('input', { key: 's', value: DEFAULT_SATURATION })
  emit('input', { key: 'l', value: DEFAULT_LIGHTNESS })
}
</script>

<template>
  <span class="mb-2 flex items-end justify-start">
    <label
      for="hueSelector"
      class="block flex-grow text-sm font-medium text-gray-900 dark:text-white"
      >Hue:</label
    >
    <button
      v-if="settingsExpanded"
      class="grid h-6 w-6 cursor-pointer items-center rounded bg-slate-900 p-1 text-xl hover:text-blue-500 focus:text-blue-500"
      title="Reset settings"
      @click="resetColor"
    >
      <i class="fa-solid fa-arrow-rotate-left text-center text-xs"></i>
    </button>
    <button
      class="ml-2 grid h-6 w-6 cursor-pointer items-center rounded bg-slate-900 p-1 text-xl hover:text-blue-500 focus:text-blue-500"
      :title="settingsExpanded ? 'Less settings' : 'More settings'"
      @click="toggleSettings"
    >
      <i class="fa-solid fa-gear text-center text-xs"></i>
    </button>
  </span>
  <input
    type="range"
    id="hueSelector"
    max="360"
    min="0"
    class="selector focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
    v-model="currentHue"
    @input="$emit('input', { key: 'h', value: currentHue })"
  />
  <div v-if="settingsExpanded" class="mt-2 border-l-2 border-l-gray-700 pl-2">
    <label for="saturationSelector" class="block text-sm font-medium text-gray-900 dark:text-white"
      >Saturation:</label
    >
    <input
      type="range"
      id="saturationSelector"
      max="1"
      min="0.05"
      step="0.01"
      class="selector focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      v-model="currentSaturation"
      @input="$emit('input', { key: 's', value: currentSaturation })"
    />
    <label
      for="lightnessSelector"
      class="mt-2 block text-sm font-medium text-gray-900 dark:text-white"
      >Lightness:</label
    >
    <input
      type="range"
      id="lightnessSelector"
      max="0.95"
      min="0.05"
      step="0.01"
      class="selector focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      v-model="currentLightness"
      @input="$emit('input', { key: 'l', value: currentLightness })"
    />
  </div>
</template>

<style scoped>
.selector {
  display: block;
  height: 1rem;
  width: 100%;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  outline: 2px solid transparent;
  outline-offset: 2px;
}

#hueSelector {
  background: linear-gradient(
    90deg,
    hsl(0, 72%, 56%) 0%,
    hsl(60, 72%, 56%) 25%,
    hsl(120, 72%, 56%) 33.3%,
    hsl(240, 72%, 56%) 66.6%,
    hsl(360, 72%, 56%) 100%
  );
}

#saturationSelector {
  background: linear-gradient(
    90deg,
    hsl(v-bind('currentHue'), 5%, 56%) 0%,
    hsl(v-bind('currentHue'), 100%, 56%) 100%
  );
}

#lightnessSelector {
  background: linear-gradient(
    90deg,
    hsl(v-bind('currentHue'), 72%, 5%) 0%,
    hsl(v-bind('currentHue'), 72%, 95%) 100%
  );
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

input[type='range']#hueSelector::-webkit-slider-thumb,
input[type='range']#hueSelector::-moz-range-thumb {
  background-color: hsl(v-bind('currentHue'), 72%, 56%);
}
</style>
