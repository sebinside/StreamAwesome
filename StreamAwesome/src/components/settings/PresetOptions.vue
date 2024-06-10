<script setup lang="ts">
import type { CustomIcon, ColorValue } from '@/model/customIcon'
import ColorSelector from '@/components/settings/presets/ColorSelector.vue'
import chroma from 'chroma-js'
import { reactive } from 'vue'
const props = defineProps({
  icon: {
    type: Object as () => CustomIcon
  }
})

// TODO: Add patterns selector and switch in the template
const currentIcon = reactive(props.icon ?? ({} as CustomIcon))

function updateColorValue(param: ColorValue) {
  if (!param.value) return

  const foregroundColor = chroma(currentIcon.foregroundColor)
  currentIcon.foregroundColor = foregroundColor.set('hsl.' + param.key, param.value).hex()
  currentIcon.backgroundColor = chroma(currentIcon.foregroundColor).darken(4.15).hex()
}
</script>

<template>
  <ColorSelector :icon="icon" @input="updateColorValue" />
</template>
