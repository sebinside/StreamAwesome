<template>
  <span>{{ unicodeString }}</span>
</template>
<script lang="ts">
import type { FontAwesomeIcon } from '@/model/fontAwesomeIcon'
import type { PropType } from 'vue'
import { useFontsStatusStore } from '@/stores/fontStatus'
import TypeCaster from '@/logic/typeCaster'
import { useIconsStore } from '@/stores/icons'
export default {
  props: {
    icon: {
      required: true,
      type: Object as PropType<FontAwesomeIcon>
    }
  },
  computed: {
    unicodeString() {
      return String.fromCharCode(parseInt(this.icon.unicode, 16))
    },
    cssFontString() {
      const fontStatusStore = useFontsStatusStore()
      return `"${fontStatusStore.fontAwesomeInfo.fontFamilyBase} ${TypeCaster.fontFamilyFromIcon(
        this.icon
      )}"`
    },
    cssFontWeight() {
      const iconStore = useIconsStore()
      return iconStore.currentIcon.fontWeight
    }
  }
}
</script>
<style scoped>
span {
  font-family: v-bind('cssFontString');
  font-weight: v-bind('cssFontWeight');
}
</style>
