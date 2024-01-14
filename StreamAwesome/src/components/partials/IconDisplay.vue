<script setup lang="ts">
import type { FontAwesomeIcon } from '@/model/fontAwesomeIcon'
import { computed, type ComputedRef } from 'vue'
import { useFontsStatusStore } from '@/stores/fontStatus'
import TypeCaster from '@/logic/typeCaster'
import { useIconsStore } from '@/stores/icons'
import type { FontWeight } from '@/model/icon'

const iconStore = useIconsStore()
const fontStatusStore = useFontsStatusStore()

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
  return `"${fontStatusStore.fontAwesomeInfo.fontFamilyBase} ${TypeCaster.fontFamilyFromIcon(
    props.icon
  )}"`
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
