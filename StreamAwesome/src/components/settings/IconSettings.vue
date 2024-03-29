<script setup lang="ts">
import type { CustomIcon } from '@/model/customIcon'
import HueSelector from '@/components/settings/HueSelector.vue'
import chroma from 'chroma-js'
import { reactive } from 'vue'
const props = defineProps({
  icon: {
    type: Object as () => CustomIcon
  }
})

const currentIcon = reactive(props.icon || ({} as CustomIcon))

function updateHue(hue: number) {
  const foregroundColor = chroma(currentIcon.foregroundColor)
  const backgroundColor = chroma(currentIcon.backgroundColor)
  currentIcon.foregroundColor = foregroundColor.set('hsl.h', hue).hex()
  currentIcon.backgroundColor = backgroundColor.set('hsl.h', hue).hex()
}
defineEmits(['downloadIcon'])
</script>

<template>
  <div>
    <HueSelector :value="chroma(currentIcon.foregroundColor).hsl()[0]" @input="updateHue" />
  </div>
  <div class="mt-5 hidden">
    <label for="iconSymbol" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >Symbol:
    </label>
    <input
      disabled
      id="iconSymbol"
      type="text"
      v-model="currentIcon.symbol"
      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
    />
  </div>
  <div class="mt-5">
    <label for="iconSize" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >Size:
    </label>
    <input
      id="iconSize"
      type="range"
      v-model="currentIcon.fontSize"
      min="50"
      max="250"
      class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
    />
  </div>
  <div class="mt-5">
    <label for="iconStyle" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >Style:
    </label>
    <select
      id="iconStyle"
      v-model="currentIcon.fontWeight"
      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
    >
      <option value="100">Thin</option>
      <option value="300">Light</option>
      <option value="400">Regular</option>
      <option value="900">Solid</option>
    </select>
  </div>
  <div class="mt-5">
    <button
      type="button"
      class="mb-2 me-2 w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-cyan-300 dark:focus:ring-cyan-800"
      @click="$emit('downloadIcon')"
    >
      Download Icon
    </button>
  </div>
</template>
