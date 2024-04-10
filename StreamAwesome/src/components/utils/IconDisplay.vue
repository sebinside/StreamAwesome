<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import { fontAwesomeVersionInfo } from '@/model/versions'
import type { FontAwesomeIcon } from '@/model/fontAwesomeIcon'
import { FontAwesomeIconType } from '@/model/fontAwesomeIconType'
import type { FontWeight } from '@/model/fontAwesomeConstants'

const props = defineProps({
  fontAwesomeIcon: {
    required: true,
    type: Object as () => FontAwesomeIcon
  }
})

// TODO: Icon Display should not work with unicode but with the <i> tags
const unicodeString: ComputedRef<string> = computed(() => {
  return String.fromCharCode(parseInt(props.fontAwesomeIcon.unicode, 16))
})
const cssFontString: ComputedRef<string> = computed(() => {
  return `"${fontAwesomeVersionInfo.fontFamilyBase} ${FontAwesomeIconType.getFontFamilySuffix(
    props.fontAwesomeIcon
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
