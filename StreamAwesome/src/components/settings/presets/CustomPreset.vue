<script setup lang="ts">
import { ref } from 'vue'
import type { CustomIcon, FontAwesomePreset } from '@/model/customIcon'

const props = defineProps<{
  icon: CustomIcon<FontAwesomePreset>
}>()

const currentIcon = ref(props.icon ?? ({} as CustomIcon<FontAwesomePreset>))
currentIcon.value.presetSettings = {
  preset: 'Custom',
  backgroundColor: '#111111',
  foregroundColor: '#FFAB00'
}
currentIcon.value.fontAwesomeIcon.style = 'solid'
currentIcon.value.fontAwesomeIcon.family = 'duotone'
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
}
</style>
