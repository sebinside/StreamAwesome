<script setup lang="ts">
import type { CustomIcon } from '@/model/customIcon'
import ColorSelector from '@/components/settings/ColorSelector.vue'
import StyleSelector from '@/components/settings/StyleSelector.vue'
import { type FontAwesomeFamily, type FontAwesomeStyle } from '@/model/fontAwesomeConstants'
import chroma from 'chroma-js'
import { reactive } from 'vue'
const props = defineProps({
  icon: {
    type: Object as () => CustomIcon
  }
})

const currentIcon = reactive(props.icon ?? ({} as CustomIcon))

function updateColorValue(param: { key: 'h' | 's' | 'l'; value: number }) {
  if (!param.value) return

  const foregroundColor = chroma(currentIcon.foregroundColor)
  currentIcon.foregroundColor = foregroundColor.set('hsl.' + param.key, param.value).hex()
  currentIcon.backgroundColor = chroma(currentIcon.foregroundColor).darken(4.15).hex()
}

function updateStyle(style: FontAwesomeStyle) {
  currentIcon.fontAwesomeIcon.style = style
}

function updateFamily(family: FontAwesomeFamily) {
  currentIcon.fontAwesomeIcon.family = family
}

defineEmits(['downloadIcon'])
</script>

<template>
  <div>
    <ColorSelector :colorHexString="currentIcon.foregroundColor" @input="updateColorValue" />
  </div>
  <div class="mt-5 hidden">
    <label for="iconSymbol" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >Symbol:
    </label>
    <input
      disabled
      id="iconSymbol"
      type="text"
      v-model="currentIcon.fontAwesomeIcon.unicode"
      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
    />
  </div>
  <div class="mt-5">
    <label for="iconSize" class="mb-[0.5] block text-sm font-medium text-gray-900 dark:text-white"
      >Size:
    </label>
    <input
      id="iconSize"
      type="range"
      v-model="currentIcon.fontSize"
      min="50"
      max="250"
      class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700"
    />
  </div>
  <StyleSelector :icon="icon" @updateStyle="updateStyle" @updateFamily="updateFamily" />
  <div class="mt-10">
    <button
      type="button"
      class="mb-2 me-2 w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-cyan-300 dark:focus:ring-cyan-800"
      @click="$emit('downloadIcon')"
    >
      Download Icon
    </button>
  </div>
</template>
