<script setup lang="ts">
import type { CustomIcon } from '@/model/customIcon'
import PresetOptions from '@/components/settings/PresetOptions.vue'
import GeneralOptions from '@/components/settings/GeneralOptions.vue'
import DownloadButton from '@/components/settings/DownloadButton.vue'

defineProps<{
  icon: CustomIcon
}>()
defineEmits<{
  downloadIcon: []
}>()
</script>

<template>
  <PresetOptions :icon="icon" />

  <GeneralOptions :icon="icon" />

  <DownloadButton @downloadIcon="$emit('downloadIcon')" />
</template>
