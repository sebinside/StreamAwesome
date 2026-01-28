<script setup lang="ts">
import { ref } from 'vue'
import type { CustomIcon, FontAwesomePreset } from '@/model/customIcon'

const props = defineProps<{
  icon: CustomIcon<FontAwesomePreset>
}>()

const currentIcon = ref(props.icon ?? ({} as CustomIcon<FontAwesomePreset>))
if (currentIcon.value.presetSettings.preset !== 'Custom') {
  applyDefaultSettings()
}

function applyDefaultSettings() {
  currentIcon.value.presetSettings = {
    preset: 'Custom',
    backgroundColor: '#111111',
    foregroundColor: '#FFAB00'
  }
  currentIcon.value.fontAwesomeIcon.style = 'solid'
  currentIcon.value.fontAwesomeIcon.family = 'duotone'
}
</script>

<template>
  <label class="inline-flex cursor-pointer items-center">
    <input
      type="color"
      v-model="(currentIcon as CustomIcon<'Custom'>).presetSettings.foregroundColor"
    />
    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-white">Icon Color</span>
  </label>
  <br />
  <label class="mt-2 inline-flex cursor-pointer items-center">
    <input
      type="color"
      v-model="(currentIcon as CustomIcon<'Custom'>).presetSettings.backgroundColor"
    />
    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-white">Background Color</span>
  </label>
</template>

<style scoped>
input {
  border: none;
  border-radius: 5px;
  padding: 0;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  overflow: hidden;
  appearance: none;
  -webkit-appearance: none;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
  }
}
</style>
