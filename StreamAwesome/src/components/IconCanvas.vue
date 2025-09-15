<script setup lang="ts">
import { useTemplateRef, watchEffect } from 'vue'
import { useFontsStatusStore } from '@/stores/fontStatus'
import { useIconsStore } from '@/stores/icons.ts'
import { triggerGenerator } from '@/logic/generator/generators'
import { useDownloadIcon } from '@/composables/useDownloadIcon.ts'

const iconCanvas = useTemplateRef('iconCanvas')
const fontStatusStore = useFontsStatusStore()
const iconsStore = useIconsStore()

watchEffect(() => {
  const iconCanvasIsInitialized = iconCanvas.value != null && fontStatusStore.fontsLoaded

  if (iconCanvasIsInitialized) {
    triggerGenerator(iconsStore.currentIcon, iconCanvas.value)
  }
})

const { downloadIcon } = useDownloadIcon()
</script>

<template>
  <canvas
    ref="iconCanvas"
    id="symbol"
    width="256"
    height="256"
    class="cursor-pointer rounded-3xl border border-cyan-500"
    @click="downloadIcon"
  ></canvas>
</template>
