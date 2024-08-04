<script setup lang="ts">
import { reactive } from 'vue'
import type { CustomIcon, FontAwesomePreset } from '@/model/customIcon'

const props = defineProps<{
  icon: CustomIcon<FontAwesomePreset>
}>()

const currentIcon = reactive(props.icon ?? ({} as CustomIcon<FontAwesomePreset>))
currentIcon.presetSettings = {
  preset: 'Custom',
  backgroundColor: '#111111',
  foregroundColor: '#FFAB00'
}
currentIcon.fontAwesomeIcon.style = 'solid'
currentIcon.fontAwesomeIcon.family = 'duotone'
</script>

<template>
  <label class="inline-flex cursor-pointer items-center">
    <input
      type="color"
      class="cursor-pointer"
      v-model="(currentIcon as CustomIcon<'Custom'>).presetSettings.foregroundColor"
    />
    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-white">Icon Color</span>
  </label>
  <br />
  <label class="mt-2 inline-flex cursor-pointer items-center">
    <input
      type="color"
      class="cursor-pointer"
      v-model="(currentIcon as CustomIcon<'Custom'>).presetSettings.backgroundColor"
    />
    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-white">Background Color</span>
  </label>
</template>

<style scoped>
input[type='color'] {
  border: none;
  padding: 0;
  width: 2rem;
  height: 2rem;
  -webkit-appearance: none;
  appearance: none;
}

input[type='color']::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type='color']::-webkit-color-swatch {
  border: none;
}

input[type='color'] {
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
</style>
