<script setup lang="ts">
// Temporary Preset till more are implemented

import type { CustomIcon, FontAwesomePreset } from '@/model/customIcon'

// disable for demo purposes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  icon: CustomIcon<FontAwesomePreset>
}>()
</script>

<template>
  <div class="text-sm">Currently nothing else available.</div>
</template>
