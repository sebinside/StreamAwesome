<script setup lang="ts">
import { FontAwesomeIcon } from '@/model/fontAwesomeIcon'
import { computed, type ComputedRef } from 'vue'
import { useIconsStore } from '@/stores/icons'
import type { FontWeight, FontFamilySuffix } from '@/model/fontAwesomeIcon'

const iconStore = useIconsStore()

const props = defineProps({
  iconUnicode: {
    required: true,
    type: String
  },
  isBrandIcon: {
    required: false,
    type: Boolean
  },
  fontWeight: {
    required: false,
    type: Object as () => FontWeight
  },
  fontFamilySuffix: {
    required: false,
    type: Object as () => FontFamilySuffix
  }
})

const unicodeString: ComputedRef<string> = computed(() => {
  return String.fromCharCode(parseInt(props.iconUnicode, 16))
})
const cssFontString: ComputedRef<string> = computed(() => {
  return `"${FontAwesomeIcon.fontVersionInfo.fontFamilyBase} ${
    props.isBrandIcon ? 'Brands' : (props.fontFamilySuffix || FontAwesomeIcon.fontVersionInfo.fontLicense)
  }"`
})
const cssFontWeight: ComputedRef<FontWeight> = computed(() => {
  return props.fontWeight || iconStore.currentIcon.fontWeight
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
