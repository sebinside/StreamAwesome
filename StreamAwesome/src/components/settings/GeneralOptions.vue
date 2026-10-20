<script setup lang="ts">
import {
  BrandsKeyword,
  DuotoneKeyword,
  FontAwesomeFamilyKeys,
  FontAwesomeStyleKeys,
  FontAwesomeFreeFamilyKeys,
  type FontAwesomeFamily,
  type FontAwesomeStyle,
  FontAwesomeFreeStyleKeys
} from '@/model/fontAwesomeConstants'
import { FontAwesomeIconType } from '@/model/fontAwesomeIconType'
import Icon from '@/components/utils/IconDisplay.vue'
import type { FontAwesomeIcon } from '@/model/fontAwesomeIcon'
import { fontAwesomeVersionInfo } from '@/model/fontAwesomeInfo'
import { useIconsStore } from '@/stores/icons.ts'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const iconStore = useIconsStore()
const { currentIcon, editTarget } = storeToRefs(iconStore)

// The settings below edit either the main or the secondary icon, depending on the selected target
const hasSecondary = computed(() => currentIcon.value.secondaryIcon !== undefined)
const isSecondaryTarget = computed(() => editTarget.value === 'secondary')
const activeIcon = computed(() =>
  isSecondaryTarget.value && currentIcon.value.secondaryIcon
    ? currentIcon.value.secondaryIcon.icon
    : currentIcon.value.fontAwesomeIcon
)
const activeSize = computed({
  get: () =>
    isSecondaryTarget.value && currentIcon.value.secondaryIcon
      ? currentIcon.value.secondaryIcon.fontSize
      : (currentIcon.value.fontSize ?? 180),
  set: (size: number) => {
    if (isSecondaryTarget.value && currentIcon.value.secondaryIcon) {
      currentIcon.value.secondaryIcon.fontSize = size
    } else {
      currentIcon.value.fontSize = size
    }
  }
})
const sizeRange = computed(() =>
  isSecondaryTarget.value ? { min: 30, max: 120 } : { min: 50, max: 250 }
)

const relevantFamilies =
  fontAwesomeVersionInfo.fontLicense === 'Pro' ? FontAwesomeFamilyKeys : FontAwesomeFreeFamilyKeys
const relevantStyles =
  fontAwesomeVersionInfo.fontLicense === 'Pro'
    ? FontAwesomeStyleKeys.filter((fontAwesomeStyleKey) => fontAwesomeStyleKey !== BrandsKeyword)
    : FontAwesomeFreeStyleKeys

function createFontAwesomeIconDisplayFromStyle(style: FontAwesomeStyle): FontAwesomeIcon {
  if (currentIcon.value === undefined) {
    const fallBackIcon = FontAwesomeIconType.createFallBackIcon()
    return {
      id: fallBackIcon.id,
      label: fallBackIcon.label,
      unicode: fallBackIcon.unicode,
      isBrandsIcon: fallBackIcon.isBrand(),
      family: fallBackIcon.styles.free[0]!.family,
      duotoneAlpha: 0.5,
      style: style
    }
  }

  const { id, label, unicode, isBrandsIcon, family, duotoneAlpha } = activeIcon.value
  return { id, label, unicode, isBrandsIcon, family, style, duotoneAlpha }
}

function createFontAwesomeIconDisplayFromFamily(family: FontAwesomeFamily): FontAwesomeIcon {
  if (currentIcon.value === undefined) {
    const fallBackIcon = FontAwesomeIconType.createFallBackIcon()
    return {
      id: fallBackIcon.id,
      label: fallBackIcon.label,
      unicode: fallBackIcon.unicode,
      isBrandsIcon: fallBackIcon.isBrand(),
      family: family,
      duotoneAlpha: 0.5,
      style: fallBackIcon.styles.free[0]!.style
    }
  }

  const { id, label, unicode, isBrandsIcon, style, duotoneAlpha } = activeIcon.value
  return { id, label, unicode, isBrandsIcon, family, style, duotoneAlpha }
}

function updateSize(event: Event) {
  const size = +(event.target as HTMLInputElement).value
  activeSize.value = size
}

function updateFamily(family: FontAwesomeFamily) {
  activeIcon.value.family = family
}

function updateStyle(style: FontAwesomeStyle) {
  activeIcon.value.style = style
}

function updateAlpha(event: Event) {
  const alpha = +(event.target as HTMLInputElement).value
  activeIcon.value.duotoneAlpha = alpha
}
</script>

<template>
  <div :class="{ 'pointer-events-none opacity-40': isSecondaryTarget && !hasSecondary }">
    <div class="mt-8">
      <label for="iconSize" class="mb-[0.5] block text-sm font-medium text-gray-900 dark:text-white"
        >Icon Size and Style:
      </label>
      <input
        id="iconSize"
        type="range"
        :value="activeSize"
        @input="(event) => updateSize(event)"
        :min="sizeRange.min"
        :max="sizeRange.max"
        class="mb-6 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700"
      />
    </div>

    <div v-if="activeIcon.family.includes(DuotoneKeyword)">
      <label
        for="duotoneAlpha"
        class="mb-[0.5] block text-sm font-medium text-gray-900 dark:text-white"
        >Duotone Transparency:
      </label>
      <input
        id="duotoneAlpha"
        type="range"
        :value="activeIcon.duotoneAlpha ?? 0.5"
        @input="(event) => updateAlpha(event)"
        min="0"
        max="1"
        step="0.01"
        class="mb-6 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700"
      />
    </div>

    <section>
      <label class="block text-sm font-medium text-gray-900 dark:text-white">Font Family: </label>
      <div class="mt-1 flex rounded-md shadow-sm">
        <div class="flex-1" v-for="(family, index) in relevantFamilies" :key="family">
          <input
            type="radio"
            name="iconFamily"
            :id="family"
            :value="family"
            class="peer hidden"
            @input="() => updateFamily(family)"
            :checked="family === activeIcon.family"
          />
          <label
            :for="family"
            :title="family[0]!.toUpperCase() + family.slice(1)"
            :class="{
              'rounded-s-lg': index === 0,
              'rounded-e-lg': index === relevantFamilies.length - 1
            }"
            class="block cursor-pointer border border-gray-200 bg-white px-4 py-2 text-center text-2xl text-gray-900 select-none peer-checked:border-blue-600 peer-checked:text-blue-600 hover:bg-gray-100 hover:text-gray-600 focus:z-10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:peer-checked:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          >
            <Icon :fontAwesomeIcon="createFontAwesomeIconDisplayFromFamily(family)" />
          </label>
        </div>
      </div>

      <div v-if="!activeIcon.family.includes(DuotoneKeyword)">
        <label class="mt-3 block text-sm font-medium text-gray-900 dark:text-white"
          >Font Style:
        </label>
        <div class="mt-1 flex rounded-md shadow-sm">
          <div class="flex-1" v-for="(style, index) in relevantStyles" :key="style">
            <input
              type="radio"
              name="iconStyle"
              :id="style"
              :value="style"
              class="peer hidden"
              @input="() => updateStyle(style)"
              :checked="style === activeIcon.style"
            />
            <label
              :for="style"
              :title="style[0]!.toUpperCase() + style.slice(1)"
              :class="{
                'rounded-s-lg': index === 0,
                'rounded-e-lg': index === relevantStyles.length - 1
              }"
              class="block cursor-pointer border border-gray-200 bg-white px-4 py-2 text-center text-2xl text-gray-900 select-none peer-checked:border-blue-600 peer-checked:text-blue-600 hover:bg-gray-100 hover:text-gray-600 focus:z-10 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:peer-checked:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              <Icon :fontAwesomeIcon="createFontAwesomeIconDisplayFromStyle(style)" />
            </label>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
