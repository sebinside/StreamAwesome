<script setup lang="ts">
import InputGroup from '@/components/browser/InputGroup.vue'
import Icon from '@/components/browser/IconDisplay.vue'

import { FontAwesomeBrowser } from '@/logic/fontAwesomeBrowser'
import { FontAwesomeIcon } from '@/model/fontAwesomeIcon'
import { useIconsStore } from '@/stores/icons'
import { ref, type Ref } from 'vue'

let availableIcons: Ref<FontAwesomeIcon[]> = ref([])
const iconStore = useIconsStore()

function selectIcon(icon: FontAwesomeIcon) {
  iconStore.currentIcon.symbol = icon.unicode

  if (icon.isBrand()) {
    iconStore.currentIcon.fontAwesomeFontFamilySuffix = 'Brands'
  } else {
    iconStore.currentIcon.fontAwesomeFontFamilySuffix = FontAwesomeIcon.fontVersionInfo.fontLicense
  }
}

async function queryIcons(query: string) {
  const fontAwesomeBrowser = new FontAwesomeBrowser(FontAwesomeIcon.fontVersionInfo.fontVersion)
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
      :icon="icon"
      class="cursor-pointer rounded bg-slate-900 p-2 text-xl hover:text-blue-500 focus:text-blue-500"
    ></Icon>
  </div>
</template>
