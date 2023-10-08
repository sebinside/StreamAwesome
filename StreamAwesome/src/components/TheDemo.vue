<script setup lang="ts">
import IconCanvas from './IconCanvas.vue'
import HueSelector from './HueSelector.vue'
import IconSettings from './IconSettings.vue'
import { useIconsStore } from '@/stores/icons'
import chroma from 'chroma-js'

const iconStore = useIconsStore()

function udpateHue(hue: number) {
  const foregroundColor = chroma(iconStore.currentIcon.foregroundColor)
  const backgroundColor = chroma(iconStore.currentIcon.backgroundColor)
  iconStore.currentIcon.foregroundColor = foregroundColor.set('hsl.h', hue).hex()
  iconStore.currentIcon.backgroundColor = backgroundColor.set('hsl.h', hue).hex()
}
</script>

<template>
  <h1 class="text-3xl font-bold">Stream Awesome <i class="fa-solid fa-square-question"></i></h1>
  <RouterLink to="/about">About</RouterLink>

  <IconCanvas :icon="iconStore.currentIcon" /><br />
  <HueSelector :value="216" @input="udpateHue" /><br />
  <IconSettings :icon="iconStore.currentIcon"></IconSettings>
</template>
