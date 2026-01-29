<script setup lang="ts">
import InputGroup from '@/components/browser/InputGroup.vue'
import Icon from '@/components/utils/IconDisplay.vue'

import { FontAwesomeBrowser } from '@/logic/fontAwesomeBrowser'
import type { FontAwesomeIcon } from '@/model/fontAwesomeIcon'
import type { FontAwesomeIconType } from '@/model/fontAwesomeIconType'
import { fontAwesomeVersionInfo } from '@/model/fontAwesomeInfo'
import { useIconsStore } from '@/stores/icons'
import { ref } from 'vue'

const availableIcons = ref<FontAwesomeIconType[]>([])
const iconStore = useIconsStore()

function selectIcon(icon: FontAwesomeIconType) {
  iconStore.currentIcon.fontAwesomeIcon = iconTypetoFontAwesomeIcon(icon)
}

function iconTypetoFontAwesomeIcon(iconType: FontAwesomeIconType): FontAwesomeIcon {
  const { id, label, unicode } = iconType
  const isBrandsIcon = iconType.isBrand()

  // Icons have some previously selected properties, selecting an icon does not change this
  const { style, family, duotoneAlpha } = iconStore.currentIcon.fontAwesomeIcon

  return { id, label, unicode, isBrandsIcon, style, family, duotoneAlpha }
}

async function queryIcons(query: string) {
  const fontAwesomeBrowser = new FontAwesomeBrowser(fontAwesomeVersionInfo.fontVersion)
  const icons = await fontAwesomeBrowser.getAvailableIcons(query)

  if (fontAwesomeVersionInfo.fontLicense === 'Free') {
    availableIcons.value = icons.filter((icon) => icon.isFree())
  } else {
    availableIcons.value = icons
  }
}

queryIcons('video')
</script>
<template>
  <InputGroup label="Search:" inputId="iconBrowser" @on-input="queryIcons" />
  <div
    class="mt-3 grid grid-cols-6 grid-rows-3 justify-items-stretch gap-1 text-center sm:grid-cols-8"
  >
    <Icon
      v-for="icon of availableIcons"
      @click="selectIcon(icon)"
      :key="icon.id"
      :title="icon.label"
      :fontAwesomeIcon="iconTypetoFontAwesomeIcon(icon)"
      class="cursor-pointer rounded bg-slate-900 p-2 text-xl hover:text-blue-500 focus:text-blue-500"
    ></Icon>
  </div>
</template>
