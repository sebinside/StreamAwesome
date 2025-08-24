<script setup lang="ts">
import type { CustomIcon, FontAwesomePreset } from '@/model/customIcon'
import PresetOptions from '@/components/settings/PresetOptions.vue'
import GeneralOptions from '@/components/settings/GeneralOptions.vue'
import DownloadButton from '@/components/settings/DownloadButton.vue'

defineProps<{
  icon: CustomIcon<FontAwesomePreset>
}>()
defineEmits<{
  downloadIcon: []
  copyIconToClipboard: []
}>()
</script>

<template>
  <PresetOptions :icon="icon" />

  <GeneralOptions :icon="icon" />

  <DownloadButton
    @downloadIcon="$emit('downloadIcon')"
    @copyIconToClipboard="$emit('copyIconToClipboard')"
  />
</template>
