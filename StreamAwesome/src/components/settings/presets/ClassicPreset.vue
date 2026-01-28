<script setup lang="ts">
import { ref } from 'vue'
import type { CustomIcon, FontAwesomePreset } from '@/model/customIcon'

const props = defineProps<{
  icon: CustomIcon<FontAwesomePreset>
}>()

const currentIcon = ref(props.icon ?? ({} as CustomIcon<FontAwesomePreset>))
if (currentIcon.value.presetSettings.preset !== 'Classic') {
  applyDefaultSettings()
}

function applyDefaultSettings() {
  currentIcon.value.presetSettings = {
    preset: 'Classic',
    hue: 217
  }
  currentIcon.value.fontAwesomeIcon.style = 'solid'
  currentIcon.value.fontAwesomeIcon.family = 'classic'
}

const currentHue = ref((currentIcon.value as CustomIcon<'Classic'>).presetSettings.hue)
</script>

<template>
  <label for="hueSelector" class="block flex-grow text-sm font-medium text-gray-900 dark:text-white"
    >Hue:</label
  >
  <input
    type="range"
    id="hueSelector"
    max="360"
    min="0"
    class="color-range-input focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
    v-model.number="(currentIcon as CustomIcon<'Classic'>).presetSettings.hue"
    @input="currentHue = (currentIcon as CustomIcon<'Classic'>).presetSettings.hue"
  />
</template>
