<script setup lang="ts">
import { FontAwesomeIcon } from '@/model/fontAwesomeIcon'
import { computed, type ComputedRef } from 'vue'
import { useIconsStore } from '@/stores/icons'
import type { FontWeight } from '@/model/fontAwesomeIcon'

const iconStore = useIconsStore()

const props = defineProps({
  icon: {
    required: true,
    type: Object as () => FontAwesomeIcon
  }
})

const unicodeString: ComputedRef<string> = computed(() => {
  return String.fromCharCode(parseInt(props.icon.unicode, 16))
})
const cssFontString: ComputedRef<string> = computed(() => {
  return `"${FontAwesomeIcon.fontVersionInfo.fontFamilyBase} ${
    props.icon.isBrand() ? 'Brands' : iconStore.currentIcon.fontAwesomeFontFamilySuffix
  }"`
})
const cssFontWeight: ComputedRef<FontWeight> = computed(() => {
  return iconStore.currentIcon.fontWeight
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
