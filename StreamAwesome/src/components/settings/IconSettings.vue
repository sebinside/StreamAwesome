<script setup lang="ts">
import PresetOptions from '@/components/settings/PresetOptions.vue'
import GeneralOptions from '@/components/settings/GeneralOptions.vue'
import DownloadButton from '@/components/settings/DownloadButton.vue'
import { useIconsStore } from '@/stores/icons.ts'

const iconStore = useIconsStore()
</script>

<template>
  <PresetOptions :icon="iconStore.currentIcon" />

  <GeneralOptions :icon="iconStore.currentIcon" />

  <DownloadButton />
</template>
