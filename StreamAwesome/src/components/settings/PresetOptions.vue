<script setup lang="ts">
import type { CustomIcon } from '@/model/customIcon'
import ElgatoClassic from '@/components/settings/presets/ElgatoClassic.vue'
import { ref } from 'vue'

defineProps<{
  icon: CustomIcon
}>()

// TODO: Move somewhere else in the refactoring of the model
const availablePresets = ['Elgato Classic', 'Other']
type IconPreset = (typeof availablePresets)[number]

const selectedPreset = ref<IconPreset>('Elgato Classic')
</script>

<template>
  <label for="presetselector" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
    >Select Icon Preset:</label
  >
  <select
    id="presetselector"
    v-model="selectedPreset"
    class="mb-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
  >
    <option v-for="preset in availablePresets" :value="preset" :key="preset">
      {{ preset }}
    </option>
  </select>

  <ElgatoClassic :icon="icon" v-if="selectedPreset === 'Elgato Classic'" />
  <div v-if="selectedPreset === 'Other'">No other presets available yet</div>
</template>
