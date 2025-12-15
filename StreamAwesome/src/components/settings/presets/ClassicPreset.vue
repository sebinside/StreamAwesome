<script setup lang="ts">
import { ref } from 'vue'
import type { CustomIcon, FontAwesomePreset } from '@/model/customIcon'
import HueInput from '../Sliders/HueInput.vue'

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
</script>

<template>
  <label for="hueSelector" class="block grow text-sm font-medium text-gray-900 dark:text-white"
    >Hue:</label
  >
  <HueInput id="hueSelector" v-model="(currentIcon as CustomIcon<'Classic'>).presetSettings.hue" />
</template>

<style scoped></style>
