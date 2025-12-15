<script setup lang="ts">
import { ref } from 'vue'
import type { CustomIcon, FontAwesomePreset } from '@/model/customIcon'
import { ColorSpaceKeys } from '@/model/customIcon'
import HuePicker from '../Sliders/HueInput.vue'
import SaturationInput from '../Sliders/SaturationInput.vue'
import LightnessInput from '../Sliders/LightnessInput.vue'
import RangeInput from '../Sliders/RangeInput.vue'

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

// const currentHue = ref((currentIcon.value as CustomIcon<'Neo'>).presetSettings.hueStart)

const settingsExpanded = ref(false)
const toggleSettings = () => {
  settingsExpanded.value = !settingsExpanded.value
}
</script>

<template>
  <label for="hueSelector" class="block grow text-sm font-medium text-gray-900 dark:text-white"
    >Hue Start:</label
  >
  <HuePicker
    id="hueSelector"
    v-model="(currentIcon as CustomIcon<'Neo'>).presetSettings.hueStart"
    min="0"
    max="360"
  />

  <label class="mt-3 inline-flex cursor-pointer items-center">
    <input
      type="checkbox"
      class="peer sr-only"
      v-model="(currentIcon as CustomIcon<'Neo'>).presetSettings.invertDirection"
    />
    <div
      class="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:start-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
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
      class="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:start-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
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
    <RangeInput
      id="hueShift"
      min="0"
      max="180"
      v-model="(currentIcon as CustomIcon<'Neo'>).presetSettings.hueShift"
      class="mt-2.5 mb-1.5"
    />

    <label for="translation" class="block text-sm font-medium text-gray-900 dark:text-white"
      >Translation:</label
    >
    <RangeInput
      id="translation"
      min="-0.5"
      max="0.5"
      step="0.01"
      v-model="(currentIcon as CustomIcon<'Neo'>).presetSettings.hueShift"
      class="mt-2.5 mb-3.5"
    />

    <label
      for="saturationSelector"
      class="mt-2 block text-sm font-medium text-gray-900 dark:text-white"
      >Saturation:</label
    >
    <SaturationInput v-model="(currentIcon as CustomIcon<'Neo'>).presetSettings.saturation" />

    <label
      for="lightnessSelector"
      class="mt-2 block text-sm font-medium text-gray-900 dark:text-white"
      >Lightness:</label
    >
    <LightnessInput
      :hue="(currentIcon as CustomIcon<'Neo'>).presetSettings.hueStart"
      v-model="(currentIcon as CustomIcon<'Neo'>).presetSettings.lightness"
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
