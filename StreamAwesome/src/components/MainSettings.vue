<script setup lang="ts">
import IconCanvas from './IconCanvas.vue'
import IconSettings from './IconSettings.vue'
import { useIconsStore } from '@/stores/icons'

const iconStore = useIconsStore()
</script>

<template>
  <IconCanvas :icon="iconStore.currentIcon" class="mb-5 mt-5" />
  <IconSettings :icon="iconStore.currentIcon"></IconSettings>
</template>
