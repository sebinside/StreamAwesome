<script setup lang="ts">
import { reactive } from 'vue'
import type { CustomIcon, FontAwesomePreset } from '@/model/customIcon'

const props = defineProps<{
  icon: CustomIcon<FontAwesomePreset>
}>()

const currentIcon = reactive(props.icon ?? ({} as CustomIcon<FontAwesomePreset>))
currentIcon.presetSettings = {
  preset: 'Custom',
  backgroundColor: '#FF0000',
  foregroundColor: '#FFFFFF'
}
currentIcon.fontAwesomeIcon.style = 'solid'
currentIcon.fontAwesomeIcon.family = 'duotone'
</script>

<template>Custom</template>

<style scoped></style>
