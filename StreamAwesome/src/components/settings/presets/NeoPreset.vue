<script setup lang="ts">
import { ref } from 'vue'
import type { CustomIcon, FontAwesomePreset } from '@/model/customIcon'
import { ColorSpaceKeys } from '@/model/customIcon'

const props = defineProps<{
  icon: CustomIcon<FontAwesomePreset>
}>()

const currentIcon = ref(props.icon ?? ({} as CustomIcon<FontAwesomePreset>))
if (currentIcon.value.presetSettings.preset !== 'Neo') {
  applyDefaultSettings()
}

function applyDefaultSettings() {
  currentIcon.value.presetSettings = {
    preset: 'Neo',
    colorSpace: 'lch',
    hueStart: 300,
    hueShift: 60,
    lightness: 0.6,
    invertDirection: false,
    saturation: 0.8,
    symbolOnly: false,
    translation: 0
  }
  currentIcon.value.fontAwesomeIcon.style = 'solid'
  currentIcon.value.fontAwesomeIcon.family = 'classic'
}

const currentHue = ref((currentIcon.value as CustomIcon<'Neo'>).presetSettings.hueStart)

const settingsExpanded = ref(false)
const toggleSettings = () => {
  settingsExpanded.value = !settingsExpanded.value
}
</script>

<template>
  <label for="hueSelector" class="block flex-grow text-sm font-medium text-gray-900 dark:text-white"
    >Hue Start:</label
  >
  <input
    type="range"
    id="hueSelector"
    min="0"
    max="360"
    class="selector focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
    v-model.number="(currentIcon as CustomIcon<'Neo'>).presetSettings.hueStart"
    @input="currentHue = (currentIcon as CustomIcon<'Neo'>).presetSettings.hueStart"
  />

  <label class="mt-3 inline-flex cursor-pointer items-center">
    <input
      type="checkbox"
      class="peer sr-only"
      v-model="(currentIcon as CustomIcon<'Neo'>).presetSettings.invertDirection"
    />
    <div
      class="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
    ></div>
    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-white">Invert Direction</span>
  </label>

  <br />

  <label class="mt-3 inline-flex cursor-pointer items-center">
    <input
      type="checkbox"
      class="peer sr-only"
      v-model="(currentIcon as CustomIcon<'Neo'>).presetSettings.symbolOnly"
    />
    <div
      class="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
    ></div>
    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-white">Symbol Only</span>
  </label>

  <br />

  <button
    class="mt-3 cursor-pointer rounded bg-slate-900 p-1 leading-3 text-gray-200 hover:text-blue-500"
    :title="settingsExpanded ? 'Fewer options' : 'More options'"
    @click="toggleSettings"
  >
    <i class="fa-solid fa-gear text-center text-xs"></i
    ><span class="ml-2 text-xs">Toggle More Options</span>
  </button>

  <div v-if="settingsExpanded" class="mt-2 border-l-4 border-l-gray-700 pl-2">
    <label for="hueShift" class="block text-sm font-medium text-gray-900 dark:text-white"
      >Hue Shift:</label
    >
    <input
      type="range"
      id="hueShift"
      min="0"
      max="180"
      class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700"
      v-model.number="(currentIcon as CustomIcon<'Neo'>).presetSettings.hueShift"
    />

    <label for="hueShift" class="block text-sm font-medium text-gray-900 dark:text-white"
      >Translation:</label
    >
    <input
      type="range"
      id="hueShift"
      min="-0.5"
      max="0.5"
      step="0.01"
      class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700"
      v-model.number="(currentIcon as CustomIcon<'Neo'>).presetSettings.translation"
    />

    <label
      for="saturationSelector"
      class="mt-2 block text-sm font-medium text-gray-900 dark:text-white"
      >Saturation:</label
    >
    <input
      type="range"
      id="saturationSelector"
      max="1"
      min="0.05"
      step="0.01"
      class="selector focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
      v-model.number="(currentIcon as CustomIcon<'Neo'>).presetSettings.saturation"
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
      class="selector focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
      v-model.number="(currentIcon as CustomIcon<'Neo'>).presetSettings.lightness"
    />

    <label
      for="colorSpaceSelector"
      class="mt-3 mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >Select Color Space:</label
    >
    <select
      id="presetselector"
      v-model="(currentIcon as CustomIcon<'Neo'>).presetSettings.colorSpace"
      class="mb-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
    >
      <option v-for="colorSpace in ColorSpaceKeys" :value="colorSpace" :key="colorSpace">
        {{ colorSpace.toUpperCase() }}
      </option>
    </select>
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

#hueSelector::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  background-color: hsl(v-bind('currentHue'), 72%, 56%);
  border: 2px solid white;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.15);
}

/* ---------- Firefox only ---------- */
#hueSelector::-moz-range-track {
  height: 8px;
  background: transparent;
  border: none;
}
#hueSelector::-moz-range-progress {
  height: 8px;
  background: transparent;
}
#hueSelector::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  background: hsl(v-bind('currentHue'), 72%, 56%);
  border: 2px solid white;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.15);
}
</style>
