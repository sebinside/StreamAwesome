<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { CustomIcon, FontAwesomePreset } from '@/model/customIcon'

const props = defineProps<{
  icon: CustomIcon<FontAwesomePreset>
}>()

const currentIcon = reactive(props.icon ?? ({} as CustomIcon<FontAwesomePreset>))
currentIcon.presetSettings = {
  preset: 'Elgato Neo',
  colorSpace: 'lch',
  hueStart: 0,
  hueStop: 180,
  lightness: 50,
  invertDirection: false,
  saturation: 100,
  symbolOnly: false,
  translation: 0
}
currentIcon.fontAwesomeIcon.style = 'solid'
currentIcon.fontAwesomeIcon.family = 'classic'

const currentHue = ref(currentIcon.presetSettings.hueStart)

</script>

<template>
  <label class="inline-flex cursor-pointer items-center">
    <input
      type="checkbox"
      class="peer sr-only"
      v-model="(currentIcon as CustomIcon<'Elgato Neo'>).presetSettings.invertDirection"
    />
    <div
      class="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
    ></div>
    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-white">Invert Direction</span>
  </label>

  <label for="hueSelector" class="block flex-grow text-sm font-medium text-gray-900 dark:text-white"
    >Hue start:</label
  >
  <input
    type="range"
    id="hueSelector"
    max="360"
    min="0"
    class="selector focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
    v-model="(currentIcon as CustomIcon<'Elgato Neo'>).presetSettings.hueStart"
  />
  <label for="hueSelector" class="block flex-grow text-sm font-medium text-gray-900 dark:text-white"
    >Hue stop:</label
  >
  <input
    type="range"
    id="hueSelector"
    max="360"
    min="0"
    class="selector focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
    v-model="(currentIcon as CustomIcon<'Elgato Neo'>).presetSettings.hueStop"
  />
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
