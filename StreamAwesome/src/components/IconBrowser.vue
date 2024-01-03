<script setup lang="ts">
import InputGroup from './partials/InputGroup.vue'
import Icon from './partials/IconDisplay.vue'

import { FontAwesomeBrowser } from '@/logic/fontAwesomeBrowser'
import { FontAwesomeIcon } from '@/model/fontAwesomeIcon'
import { useIconsStore } from '@/stores/icons'
import TypeCaster from '@/logic/typeCaster'
import { useFontsStatusStore } from '@/stores/fontStatus'
import { reactive, ref, type Ref } from 'vue'

let availableIcons: FontAwesomeIcon[] = reactive([])

function selectIcon(icon: FontAwesomeIcon) {
  const iconStore = useIconsStore()
  iconStore.currentIcon.symbol = icon.unicode
  iconStore.currentIcon.fontAwesomeFontFamily = TypeCaster.fontFamilyFromIcon(icon)
}

async function queryIcons(query: string) {
  const fontStatusStore = useFontsStatusStore()
  const fontAwesomeBrowser = new FontAwesomeBrowser(fontStatusStore.fontAwesomeInfo.fontVersion)
  let icons = await fontAwesomeBrowser.getAvailableIcons(query)
  availableIcons = icons.filter((icon) => icon.isFree())
  console.log(availableIcons)
}
</script>
<template>
  <InputGroup label="Search:" inputId="iconBrowser" @input="queryIcons($event.target.value)" />
  <div class="mt-3 grid grid-cols-3 grid-rows-3 justify-items-stretch gap-2 text-center">
    <Icon
      v-for="icon of availableIcons"
      @click="selectIcon(icon)"
      :key="icon.id"
      :icon="icon"
      class="cursor-pointer rounded bg-slate-900 p-2 text-xl"
    ></Icon>
  </div>
</template>
