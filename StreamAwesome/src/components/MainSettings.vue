<script setup lang="ts">
import IconBrowser from '@/components/browser/IconBrowser.vue'
import IconCanvas from '@/components/IconCanvas.vue'
import IconSettings from '@/components/settings/IconSettings.vue'
import IconGenerator from '@/logic/generator'
import { FontAwesomeIcon } from '@/model/fontAwesomeIcon'
import { useIconsStore } from '@/stores/icons'

const iconStore = useIconsStore()

function downloadIcon() {
  const iconGenerator = new IconGenerator(FontAwesomeIcon.fontVersionInfo.fontFamilyBase)
  iconGenerator.saveIcon(iconStore.currentIcon)
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
