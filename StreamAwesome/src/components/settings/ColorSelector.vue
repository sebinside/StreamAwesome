<script setup lang="ts">
import { ref, type Ref } from 'vue'

const DEFAULT_HUE = 217
const DEFAULT_SATURATION = 0.69
const DEFAULT_LIGHTNESS = 0.57

const props = defineProps({
  hue: {
    default: 215,
    type: Number
  },
  saturation: {
    default: 0.75,
    type: Number
  },
  lightness: {
    default: 0.6,
    type: Number
  },
  hex: {
    default: '#AAAAAA',
    type: String
  }
})
const emit = defineEmits(['input', 'hexChange'])

const currentHue: Ref<Number> = ref(props.hue)
const currentSaturation: Ref<Number> = ref(props.saturation)
const currentLightness: Ref<Number> = ref(props.lightness)
const currentHex: Ref<String> = ref(props.hex)

const settingsExpanded: Ref<boolean> = ref(false)

const toggleSettings = (e: Event<HTMLButtonElement>) => {
  settingsExpanded.value = !settingsExpanded.value
  e.target.blur()
}

const resetColor = (e: Event<HTMLButtonElement>) => {
  currentHue.value = DEFAULT_HUE
  currentSaturation.value = DEFAULT_SATURATION
  currentLightness.value = DEFAULT_LIGHTNESS
  emit('input', { key: 'h', value: DEFAULT_HUE })
  emit('input', { key: 's', value: DEFAULT_SATURATION })
  emit('input', { key: 'l', value: DEFAULT_LIGHTNESS })
  e.target.blur()
}

const onHexInput = (e: Event<HTMLInputElement>) => {
  const hex = e.target.value
  currentHex.value = hex
  emit('hexChange', hex)
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
    <label for="hexInput" class="mt-2 block text-sm font-medium text-gray-900 dark:text-white"
      >HEX value:</label
    >
    <div class="relative">
      <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
        <span class="h-6 w-4 align-middle text-gray-500 dark:text-gray-400">#</span>
      </div>
      <input
        type="text"
        id="hexInput"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-7 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        :value="currentHex"
        @input="onHexInput"
      />
    </div>
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
