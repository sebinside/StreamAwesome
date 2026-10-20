<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CustomIcon, NeoStyle } from '@/model/customIcon'
import { ColorSpaceKeys, NeoStyleKeys } from '@/model/customIcon'
import { useIconsStore } from '@/stores/icons.ts'
import { storeToRefs } from 'pinia'
import Icon from '@/components/utils/IconDisplay.vue'

const iconStore = useIconsStore()
const { currentIcon } = storeToRefs(iconStore)

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
    neoStyle: 'whiteicon',
    translation: 0
  }
  currentIcon.value.fontAwesomeIcon.style = 'solid'
  currentIcon.value.fontAwesomeIcon.family = 'classic'
}

const currentHue = computed(() => (currentIcon.value as CustomIcon<'Neo'>).presetSettings.hueStart)

const settingsExpanded = ref(false)
const toggleSettings = () => {
  settingsExpanded.value = !settingsExpanded.value
}

const updateNeoStyle = (style: NeoStyle) => {
  ;(currentIcon.value as CustomIcon<'Neo'>).presetSettings.neoStyle = style
}

function getPreviewStyle(style: NeoStyle): { background: string; color: string } {
  const { hueStart, saturation, lightness } = (currentIcon.value as CustomIcon<'Neo'>)
    .presetSettings
  const hsl = (s: number, l: number) => `hsl(${hueStart} ${s * 100}% ${l * 100}%)`
  switch (style) {
    case 'whiteicon':
      return { background: hsl(saturation, lightness), color: 'white' }
    case 'blackicon':
      return { background: hsl(saturation, lightness), color: 'black' }
    case 'blackbackground':
      return { background: 'black', color: hsl(saturation, lightness) }
    case 'darkbackground':
      return { background: hsl(saturation * 0.5, lightness * 0.3), color: hsl(saturation, lightness) }
  }
}
</script>

<template>
  <label for="hueSelector" class="block grow text-sm font-medium text-gray-900 dark:text-white"
    >Hue Start:</label
  >
  <input
    type="range"
    id="hueSelector"
    min="0"
    max="360"
    class="selector focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
    v-model.number="(currentIcon as CustomIcon<'Neo'>).presetSettings.hueStart"
  />

  <label class="mt-3 inline-flex cursor-pointer items-center">
    <input
      type="checkbox"
      class="peer sr-only"
      v-model="(currentIcon as CustomIcon<'Neo'>).presetSettings.invertDirection"
    />
    <div
      class="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:inset-s-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
    ></div>
    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-white">Invert Direction</span>
  </label>

  <br />

  <label class="mt-3 block text-sm font-medium text-gray-900 dark:text-white">Neo Style: </label>
  <div class="mt-1 flex rounded-md shadow-sm">
    <div class="flex-1" v-for="(style, index) in NeoStyleKeys" :key="style">
      <input
        type="radio"
        name="iconNeoStyle"
        :id="style"
        :value="style"
        class="peer hidden"
        @input="() => updateNeoStyle(style)"
        :checked="style === (currentIcon as CustomIcon<'Neo'>).presetSettings.neoStyle"
      />
      <label
        :for="style"
        :class="{
          'rounded-s-lg': index === 0,
          'rounded-e-lg': index === NeoStyleKeys.length - 1
        }"
        class="flex cursor-pointer justify-center border border-gray-200 bg-white px-4 py-2 select-none peer-checked:border-blue-600 hover:bg-gray-100 focus:z-10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:peer-checked:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
      >
        <div
          class="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-base dark:border-gray-700"
          :style="{ background: getPreviewStyle(style).background }"
          :title="style"
        >
          <Icon
            :fontAwesomeIcon="currentIcon.fontAwesomeIcon"
            :style="{ color: getPreviewStyle(style).color }"
          />
        </div>
      </label>
    </div>
  </div>

  <button
    class="mt-4 cursor-pointer rounded bg-slate-900 p-1 leading-3 text-gray-200 hover:text-blue-500"
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
