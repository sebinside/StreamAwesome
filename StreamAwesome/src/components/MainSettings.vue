<script setup lang="ts">
import IconBrowser from '@/components/browser/IconBrowser.vue'
import IconCanvas from '@/components/IconCanvas.vue'
import IconSettings from '@/components/settings/IconSettings.vue'
import { useIconsStore } from '@/stores/icons'

const iconStore = useIconsStore()
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <div style="max-width: 256px">
      <IconCanvas :icon="iconStore.currentIcon" class="mb-5 mt-5" />
      <IconSettings :icon="iconStore.currentIcon" />
    </div>
    <div class="col-span-2">
      <IconBrowser />
    </div>
  </div>
</template>
