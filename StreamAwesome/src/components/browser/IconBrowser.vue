<script setup lang="ts">
import InputGroup from '@/components/browser/InputGroup.vue'
import Icon from '@/components/utils/IconDisplay.vue'

import { FontAwesomeBrowser } from '@/logic/fontAwesomeBrowser'
import type { FontAwesomeIcon } from '@/model/fontAwesomeIcon'
import { FontAwesomeIconType } from '@/model/fontAwesomeIconType'
import { fontAwesomeVersionInfo } from '@/model/versions'
import { useIconsStore } from '@/stores/icons'
import { ref, type Ref } from 'vue'

let availableIcons: Ref<FontAwesomeIconType[]> = ref([])
const iconStore = useIconsStore()

function selectIcon(icon: FontAwesomeIconType) {
  iconStore.currentIcon.fontAwesomeIcon = iconTypetoFontAwesomeIcon(icon)
}

function iconTypetoFontAwesomeIcon(iconType: FontAwesomeIconType): FontAwesomeIcon {
  const id = iconType.id
  const label = iconType.label
  const unicode = iconType.unicode
  const isBrandsIcon = iconType.isBrand()

  // Icons have the previously selected style and family, selecting an icon does not change this
  const style = iconStore.currentIcon.fontAwesomeIcon.style
  const family = iconStore.currentIcon.fontAwesomeIcon.family

  return { id, label, unicode, isBrandsIcon, style, family }
}

async function queryIcons(query: string) {
  const fontAwesomeBrowser = new FontAwesomeBrowser(fontAwesomeVersionInfo.fontVersion)
  let icons = await fontAwesomeBrowser.getAvailableIcons(query)
  availableIcons.value = icons.filter((icon) => icon.isFree())
}

queryIcons('video')
</script>
<template>
  <InputGroup label="Search:" inputId="iconBrowser" @input="queryIcons($event.target.value)" />
  <div class="mt-3 grid grid-cols-3 grid-rows-3 justify-items-stretch gap-2 text-center">
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
