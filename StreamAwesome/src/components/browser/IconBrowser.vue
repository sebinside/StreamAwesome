<script setup lang="ts">
import InputGroup from '@/components/browser/InputGroup.vue'
import Icon from '@/components/utils/IconDisplay.vue'

import { FontAwesomeBrowser } from '@/logic/fontAwesomeBrowser'
import type { FontAwesomeIcon } from '@/model/fontAwesomeIcon'
import { FontAwesomeIconType } from '@/model/fontAwesomeIconType'
import { fontAwesomeVersionInfo } from '@/model/fontAwesomeInfo'
import { useIconsStore } from '@/stores/icons'
import { defaultSecondaryIconFontSize } from '@/logic/generator/secondaryIconPlacement'
import { type SecondaryCorner } from '@/model/customIcon'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useEventListener } from '@vueuse/core'

const availableIcons = ref<FontAwesomeIconType[]>([])
const iconStore = useIconsStore()
const { editTarget: target } = storeToRefs(iconStore)

const targets = ['main', 'secondary'] as const

// Keys 1 and 2 switch between main and secondary icon, unless the user is typing
useEventListener(window, 'keydown', (e: KeyboardEvent) => {
  const el = e.target as HTMLElement
  if (e.ctrlKey || e.metaKey || e.altKey || el.matches('input:is([type=text],[type=search],[type=number],:not([type])), textarea, select')) {
    return
  }
  if (e.key === '1' || e.key === '2') {
    // Like clicking, pressing 2 again moves the secondary icon to the next position
    cycleCorner(targets[Number(e.key) - 1]!)
    target.value = targets[Number(e.key) - 1]!
  }
})

// Only top/left with fixed values, so the dot animates between all positions (auto values cannot transition)
const cornerDotClasses: Record<SecondaryCorner, string> = {
  tl: 'top-0.5 left-0.5',
  tr: 'top-0.5 left-2.5',
  br: 'top-2.5 left-2.5',
  bl: 'top-2.5 left-0.5',
  center: 'top-1.5 left-1.5'
}

function defaultIcon(id: string, unicode: string): FontAwesomeIconType {
  const solid = [{ family: 'classic', style: 'solid' }] as const
  return new FontAwesomeIconType(id, id, unicode, { free: [...solid], pro: [...solid] })
}

// Fixed quick picks shown above the search results, independent of the search string
const defaultIcons: Record<(typeof targets)[number], FontAwesomeIconType[]> = {
  main: [
    defaultIcon('video', 'f03d'),
    defaultIcon('microphone', 'f130'),
    defaultIcon('camera', 'f030'),
    defaultIcon('desktop', 'f390'),
    defaultIcon('gamepad', 'f11b'),
    defaultIcon('comments', 'f086'),
    defaultIcon('music', 'f001'),
    defaultIcon('heart', 'f004')
  ],
  secondary: [
    defaultIcon('slash', 'f715'),
    defaultIcon('square', 'f0c8'),
    defaultIcon('circle-plus', 'f055'),
    defaultIcon('circle-minus', 'f056'),
    defaultIcon('circle-xmark', 'f057'),
    defaultIcon('play', 'f04b'),
    defaultIcon('pause', 'f04c'),
    defaultIcon('gear', 'f013')
  ]
}

// Clicking the already active Secondary button moves the secondary icon to the next position (clockwise, then center)
function cycleCorner(option: (typeof targets)[number]) {
  const secondary = iconStore.currentIcon.secondaryIcon
  if (option !== 'secondary' || target.value !== 'secondary' || !secondary) {
    return
  }
  const order: SecondaryCorner[] = ['tl', 'tr', 'br', 'bl', 'center']
  secondary.corner = order[(order.indexOf(secondary.corner) + 1) % order.length]!
}

function removeSecondaryIcon() {
  delete iconStore.currentIcon.secondaryIcon
  target.value = 'main'
}

function selectIcon(icon: FontAwesomeIconType) {
  const fontAwesomeIcon = iconTypetoFontAwesomeIcon(icon)

  if (target.value === 'main') {
    iconStore.currentIcon.fontAwesomeIcon = fontAwesomeIcon
  } else if (iconStore.currentIcon.secondaryIcon) {
    iconStore.currentIcon.secondaryIcon.icon = fontAwesomeIcon
  } else {
    iconStore.currentIcon.secondaryIcon = {
      icon: fontAwesomeIcon,
      corner: 'tr',
      fontSize: defaultSecondaryIconFontSize
    }
  }
}

function iconTypetoFontAwesomeIcon(iconType: FontAwesomeIconType): FontAwesomeIcon {
  const { id, label, unicode } = iconType
  const isBrandsIcon = iconType.isBrand()

  // Icons have some previously selected properties, selecting an icon does not change this
  const { style, family, duotoneAlpha } =
    target.value === 'secondary' && iconStore.currentIcon.secondaryIcon
      ? iconStore.currentIcon.secondaryIcon.icon
      : iconStore.currentIcon.fontAwesomeIcon

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
  <div class="flex items-end gap-3">
    <InputGroup class="flex-1" label="Search:" inputId="iconBrowser" @on-input="queryIcons" />
    <div class="flex rounded-md shadow-sm">
      <div v-for="(option, index) in targets" :key="option" class="relative">
        <input
          type="radio"
          name="iconTarget"
          :id="`iconTarget-${option}`"
          :value="option"
          v-model="target"
          class="peer hidden"
        />
        <label
          :for="`iconTarget-${option}`"
          :title="
            option === 'main'
              ? 'Edit main icon (1)'
              : 'Edit secondary icon (2, press or click again to move it to the next position)'
          "
          @click="cycleCorner(option)"
          :class="{
            'rounded-s-lg': index === 0,
            'rounded-e-lg': index === targets.length - 1
          }"
          class="flex h-10.5 w-11 cursor-pointer items-center justify-center border border-gray-200 bg-white select-none peer-checked:border-blue-600 peer-checked:text-blue-500 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
        >
          <span class="relative block h-6 w-6 rounded border-2 border-current">
            <span
              v-if="option === 'main'"
              class="absolute inset-1.5 rounded-full bg-current"
            ></span>
            <span
              v-else
              :class="cornerDotClasses[iconStore.currentIcon.secondaryIcon?.corner ?? 'tr']"
              class="absolute h-2 w-2 rounded-full bg-current transition-all"
            ></span>
          </span>
        </label>
        <button
          v-if="option === 'secondary' && iconStore.currentIcon.secondaryIcon"
          title="Remove secondary icon"
          class="absolute -top-2 -right-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-slate-900 text-xs text-gray-200 hover:text-blue-500"
          @click="removeSecondaryIcon"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  </div>
  <p
    v-if="target === 'secondary' && !iconStore.currentIcon.secondaryIcon"
    class="mt-2 text-sm text-gray-500 dark:text-gray-400"
  >
    Pick an icon below to add a secondary icon.
  </p>
  <div class="mt-3 grid grid-cols-6 gap-1 text-center sm:grid-cols-8">
    <Icon
      v-for="icon of defaultIcons[target]"
      @click="selectIcon(icon)"
      :key="icon.id"
      :title="icon.label"
      :fontAwesomeIcon="iconTypetoFontAwesomeIcon(icon)"
      class="cursor-pointer rounded bg-slate-900 p-2 text-xl hover:text-blue-500 focus:text-blue-500"
    ></Icon>
  </div>
  <hr class="mt-3 border-gray-200 dark:border-gray-700" />
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
