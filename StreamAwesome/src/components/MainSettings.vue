<script setup lang="ts">
import IconBrowser from '@/components/browser/IconBrowser.vue'
import IconCanvas from '@/components/IconCanvas.vue'
import IconSettings from '@/components/settings/IconSettings.vue'
import { useIconsStore } from '@/stores/icons'

const iconStore = useIconsStore()
</script>

<template>
  <div class="flex flex-row flex-wrap">
    <div style="max-width: 256px" class="mr-7">
      <IconCanvas :icon="iconStore.currentIcon" class="mb-5 mt-5" />
      <IconSettings :icon="iconStore.currentIcon" />
    </div>
    <div class="flex-grow">
      <IconBrowser />
    </div>
  </div>
</template>
