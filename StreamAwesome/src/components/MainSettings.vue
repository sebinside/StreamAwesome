<script setup lang="ts">
import IconBrowser from '@/components/browser/IconBrowser.vue'
import IconCanvas from '@/components/IconCanvas.vue'
import IconSettings from '@/components/settings/IconSettings.vue'
import IconGenerator from '@/logic/generator'
import { useIconsStore } from '@/stores/icons'

const iconStore = useIconsStore()

function downloadIcon() {
  const iconGenerator = new IconGenerator()
  iconGenerator.saveIcon(iconStore.currentIcon)
}
</script>

<template>
  <div class="flex flex-col md:flex-row">
    <div class="mr-0 grid md:mr-7">
      <IconCanvas
        :icon="iconStore.currentIcon"
        class="mb-5 mt-5 place-self-center md:place-self-auto"
        @download-icon="downloadIcon"
      />
      <IconSettings :icon="iconStore.currentIcon" @download-icon="downloadIcon" />
    </div>
    <div class="flex-grow">
      <IconBrowser />
    </div>
  </div>
</template>
