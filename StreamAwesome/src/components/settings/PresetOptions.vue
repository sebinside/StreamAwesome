<script setup lang="ts">
import type { CustomIcon } from '@/model/customIcon'
import ElgatoClassic from '@/components/settings/presets/ElgatoClassic.vue'
defineProps({
  icon: {
    type: Object as () => CustomIcon
  }
})
</script>

<template>
  <ElgatoClassic :icon="icon" />
</template>
