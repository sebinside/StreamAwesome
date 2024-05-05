<script setup lang="ts">
import type { FontAwesomeIcon } from '@/model/fontAwesomeIcon'
import { FontAwesomeIconType } from '@/model/fontAwesomeIconType'

const props = defineProps({
  fontAwesomeIcon: {
    required: true,
    type: Object as () => FontAwesomeIcon
  }
})
</script>

<template>
  <i :class="FontAwesomeIconType.calculateIconClassDescription(props.fontAwesomeIcon)"></i>
</template>
