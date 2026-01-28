<script setup lang="ts">
import type { CustomIcon, FontAwesomePreset } from '@/model/customIcon'
import { useIconsStore } from '@/stores/icons.ts'
import { storeToRefs } from 'pinia'

defineProps<{
  icon: CustomIcon<FontAwesomePreset>
}>()

const iconStore = useIconsStore()
const { currentIcon } = storeToRefs(iconStore)

if (currentIcon.value.presetSettings.preset !== 'Modern') {
  applyDefaultSettings()
}

function applyDefaultSettings() {
  currentIcon.value.presetSettings = {
    preset: 'Modern',
    inverted: false
  }
  currentIcon.value.fontAwesomeIcon.style = 'thin'
  currentIcon.value.fontAwesomeIcon.family = 'sharp'
}
</script>

<template>
  <label class="inline-flex cursor-pointer items-center">
    <input
      type="checkbox"
      class="peer sr-only"
      v-model="(currentIcon as CustomIcon<'Modern'>).presetSettings.inverted"
    />
    <div
      class="peer relative h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
    ></div>
    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-white">Invert Colors</span>
  </label>
</template>

<style scoped></style>
