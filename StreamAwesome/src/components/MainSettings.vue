<script setup lang="ts">
import IconBrowser from '@/components/browser/IconBrowser.vue'
import IconCanvas from '@/components/IconCanvas.vue'
import IconSettings from '@/components/settings/IconSettings.vue'
import { getMatchingGenerator } from '@/logic/generator/generators'
import { useIconsStore } from '@/stores/icons'

const iconStore = useIconsStore()

function downloadIcon() {
  const iconGenerator = getMatchingGenerator(iconStore.currentIcon)
  iconGenerator.saveIcon(iconStore.currentIcon)
}
</script>

<template>
  <div class="flex flex-col md:flex-row">
    <div class="mr-0 grid md:mr-7">
      <IconCanvas
        :icon="iconStore.currentIcon"
        class="mt-5 mb-5 place-self-center md:place-self-auto"
        @download-icon="downloadIcon"
      />
      <IconSettings :icon="iconStore.currentIcon" @download-icon="downloadIcon" />
    </div>
    <div class="flex-grow">
      <IconBrowser />
    </div>
  </div>
</template>
