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

const iconStore = useIconsStore()
const { currentIcon } = storeToRefs(iconStore)

const relevantFamilies =
  fontAwesomeVersionInfo.fontLicense === 'Pro'
    ? Object.values(FontAwesomeFamilyKeys)
    : Object.values(FontAwesomeFreeFamilyKeys)
const relevantStyles =
  fontAwesomeVersionInfo.fontLicense === 'Pro'
    ? Object.values(FontAwesomeStyleKeys).filter((key) => {
        return key !== BrandsKeyword
      })
    : Object.values(FontAwesomeFreeStyleKeys)

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

  const { id, label, unicode, isBrandsIcon, family, duotoneAlpha } =
    currentIcon.value.fontAwesomeIcon
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

  const { id, label, unicode, isBrandsIcon, style, duotoneAlpha } =
    currentIcon.value.fontAwesomeIcon
  return { id, label, unicode, isBrandsIcon, family, style, duotoneAlpha }
}

function updateSize(event: Event) {
  const size = +(event.target as HTMLInputElement).value
  currentIcon.value.fontSize = size
}

function updateFamily(family: FontAwesomeFamily) {
  currentIcon.value.fontAwesomeIcon.family = family
}

function updateStyle(style: FontAwesomeStyle) {
  currentIcon.value.fontAwesomeIcon.style = style
}

function updateAlpha(event: Event) {
  const alpha = +(event.target as HTMLInputElement).value
  currentIcon.value.fontAwesomeIcon.duotoneAlpha = alpha
}
</script>

<template>
  <div class="mt-5">
    <label for="iconSize" class="mb-[0.5] block text-sm font-medium text-gray-900 dark:text-white"
      >Icon Size and Style:
    </label>
    <input
      id="iconSize"
      type="range"
      :value="currentIcon.fontSize ?? 180"
      @input="(event) => updateSize(event)"
      min="50"
      max="250"
      class="mb-6 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:bg-gray-700"
    />
  </div>

  <div v-if="currentIcon.fontAwesomeIcon.family.includes(DuotoneKeyword)">
    <label
      for="duotoneAlpha"
      class="mb-[0.5] block text-sm font-medium text-gray-900 dark:text-white"
      >Duotone Transparency:
    </label>
    <input
      id="duotoneAlpha"
      type="range"
      :value="currentIcon.fontAwesomeIcon.duotoneAlpha ?? 0.5"
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
          :checked="family === currentIcon.fontAwesomeIcon.family"
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

    <div v-if="!currentIcon.fontAwesomeIcon.family.includes(DuotoneKeyword)">
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
            :checked="style === currentIcon.fontAwesomeIcon.style"
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
</template>
