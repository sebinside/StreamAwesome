<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import type { FontWeight } from '@/model/fontAwesomeIconType'
import { fontAwesomeVersionInfo } from '@/model/versions'
import type { FontAwesomeIcon } from '@/model/fontAwesomeIcon'
import { FontAwesomeIconType } from '@/model/fontAwesomeIconType'

const props = defineProps({
  fontAwesomeIcon: {
    required: true,
    type: Object as () => FontAwesomeIcon
  }
})

const unicodeString: ComputedRef<string> = computed(() => {
  return String.fromCharCode(parseInt(props.fontAwesomeIcon.unicode, 16))
})
const cssFontString: ComputedRef<string> = computed(() => {
  return `"${fontAwesomeVersionInfo.fontFamilyBase} ${FontAwesomeIconType.getFontFamilySuffix(
    props.fontAwesomeIcon.family,
    props.fontAwesomeIcon.style
  )}"`
})
const cssFontWeight: ComputedRef<FontWeight> = computed(() => {
  return FontAwesomeIconType.getFontWeightOfStyle(props.fontAwesomeIcon.style)
})
</script>

<template>
  <span>{{ unicodeString }}</span>
</template>
<style scoped>
span {
  font-family: v-bind('cssFontString');
  font-weight: v-bind('cssFontWeight');
}
</style>
