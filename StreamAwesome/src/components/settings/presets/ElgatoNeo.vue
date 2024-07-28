<script setup lang="ts">
import { reactive } from 'vue'
import type { CustomIcon, FontAwesomePreset } from '@/model/customIcon'

const props = defineProps<{
  icon: CustomIcon<FontAwesomePreset>
}>()

const currentIcon = reactive(props.icon ?? ({} as CustomIcon<FontAwesomePreset>))
currentIcon.presetSettings = {
  preset: 'Elgato Neo',
  colorSpace: 'lch',
  hueStart: 0,
  hueStop: 180,
  lightness: 50,
  invertDirection: false,
  saturation: 100,
  symbolOnly: false,
  translation: 0
}
currentIcon.fontAwesomeIcon.style = 'solid'
currentIcon.fontAwesomeIcon.family = 'classic'
</script>

<template>Elgato Neo</template>

<style scoped></style>
