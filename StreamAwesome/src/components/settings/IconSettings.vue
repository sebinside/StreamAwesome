<script setup lang="ts">
import type { CustomIcon } from '@/model/customIcon'
import PresetOptions from '@/components/settings/PresetOptions.vue'
import GeneralOptions from '@/components/settings/GeneralOptions.vue'
import DownloadButton from '@/components/settings/DownloadButton.vue'
import type { FontAwesomeFamily, FontAwesomeStyle } from '@/model/fontAwesomeConstants'
import { reactive } from 'vue'
const props = defineProps({
  icon: {
    type: Object as () => CustomIcon
  }
})

const currentIcon = reactive(props.icon ?? ({} as CustomIcon))

// TODO: More refactoring required
function updateSize(size: number) {
  currentIcon.fontSize = size
}

function updateFamily(family: FontAwesomeFamily) {
  currentIcon.fontAwesomeIcon.family = family
}

function updateStyle(style: FontAwesomeStyle) {
  currentIcon.fontAwesomeIcon.style = style
}

defineEmits(['downloadIcon'])
</script>

<template>
  <PresetOptions :icon="icon" />

  <GeneralOptions
    :icon="icon"
    @updateSize="updateSize"
    @updateFamily="updateFamily"
    @updateStyle="updateStyle"
  />

  <DownloadButton @downloadIcon="$emit('downloadIcon')" />
</template>
