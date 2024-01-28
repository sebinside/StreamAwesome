<script setup lang="ts">
import IconBrowser from '@/components/browser/IconBrowser.vue'
import IconCanvas from '@/components/IconCanvas.vue'
import IconSettings from '@/components/settings/IconSettings.vue'
import IconGenerator from '@/logic/generator'
import { FontAwesomeIcon } from '@/model/fontAwesomeIcon'
import { useIconsStore } from '@/stores/icons'

const iconStore = useIconsStore()

// TODO: Find better place for this
function downloadIcon() {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const iconGenerator = new IconGenerator(canvas, FontAwesomeIcon.fontVersionInfo.fontFamilyBase)
  iconGenerator.generateIcon(iconStore.currentIcon)

  const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
  let link = document.createElement('a')

  // TODO: Implement better naming using color-namer
  link.download = `stream-awesome-icon-${Math.round(Math.random() * 100000)}.png`
  link.href = image
  link.click()
}
</script>

<template>
  <div class="flex flex-row flex-wrap">
    <div style="max-width: 256px" class="mr-7">
      <IconCanvas :icon="iconStore.currentIcon" class="mb-5 mt-5" @download-icon="downloadIcon" />
      <IconSettings :icon="iconStore.currentIcon" @download-icon="downloadIcon" />
    </div>
    <div class="flex-grow">
      <IconBrowser />
    </div>
  </div>
</template>
