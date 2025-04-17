<script setup lang="ts">
import type { CustomIcon, FontAwesomePreset } from '@/model/customIcon'
import {
  BrandsKeyword,
  DuotoneKeyword,
  FontAwesomeFamilyKeys,
  FontAwesomeStyleKeys,
  type FontAwesomeFamily,
  type FontAwesomeStyle
} from '@/model/fontAwesomeConstants'
import { FontAwesomeIconType } from '@/model/fontAwesomeIconType'
import Icon from '@/components/utils/IconDisplay.vue'
import type { FontAwesomeIcon } from '@/model/fontAwesomeIcon'
import { reactive } from 'vue'

const props = defineProps<{
  icon: CustomIcon<FontAwesomePreset>
}>()

const currentIcon = reactive(props.icon ?? ({} as CustomIcon<FontAwesomePreset>))

const relevantFamilies = Object.values(FontAwesomeFamilyKeys)
const relevantStyles = Object.values(FontAwesomeStyleKeys).filter((key) => {
  return key !== BrandsKeyword
})

function createFontAwesomeIconDisplayFromStyle(style: FontAwesomeStyle): FontAwesomeIcon {
  if (props.icon === undefined) {
    const fallBackIcon = FontAwesomeIconType.createFallBackIcon()
    return {
      id: fallBackIcon.id,
      label: fallBackIcon.label,
      unicode: fallBackIcon.unicode,
      isBrandsIcon: fallBackIcon.isBrand(),
      family: fallBackIcon.styles.free[0].family,
      style: style
    }
  } else {
    const id = props.icon.fontAwesomeIcon.id
    const label = props.icon.fontAwesomeIcon.label
    const unicode = props.icon.fontAwesomeIcon.unicode
    const isBrandsIcon = props.icon.fontAwesomeIcon.isBrandsIcon
    const family = props.icon.fontAwesomeIcon.family

    return { id, label, unicode, isBrandsIcon, family, style }
  }
}

function createFontAwesomeIconDisplayFromFamily(family: FontAwesomeFamily): FontAwesomeIcon {
  if (props.icon === undefined) {
    const fallBackIcon = FontAwesomeIconType.createFallBackIcon()
    return {
      id: fallBackIcon.id,
      label: fallBackIcon.label,
      unicode: fallBackIcon.unicode,
      isBrandsIcon: fallBackIcon.isBrand(),
      family: family,
      style: fallBackIcon.styles.free[0].style
    }
  } else {
    const id = props.icon.fontAwesomeIcon.id
    const label = props.icon.fontAwesomeIcon.label
    const unicode = props.icon.fontAwesomeIcon.unicode
    const isBrandsIcon = props.icon.fontAwesomeIcon.isBrandsIcon
    const style = props.icon.fontAwesomeIcon.style

    return { id, label, unicode, isBrandsIcon, family, style }
  }
}

function updateSize(event: Event) {
  const size = +(event.target as HTMLInputElement).value
  currentIcon.fontSize = size
}

function updateFamily(family: FontAwesomeFamily) {
  currentIcon.fontAwesomeIcon.family = family
}

function updateStyle(style: FontAwesomeStyle) {
  currentIcon.fontAwesomeIcon.style = style
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
      :value="props.icon?.fontSize ?? 180"
      @input="(event) => updateSize(event)"
      min="50"
      max="250"
      class="mb-6 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700"
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
          :checked="family === props.icon?.fontAwesomeIcon.family"
        />
        <label
          :for="family"
          :title="family[0].toUpperCase() + family.slice(1)"
          :class="{
            'rounded-s-lg': index === 0,
            'rounded-e-lg': index === relevantFamilies.length - 1
          }"
          class="block cursor-pointer select-none border border-gray-200 bg-white px-4 py-2 text-center text-2xl text-gray-900 hover:bg-gray-100 hover:text-gray-600 focus:z-10 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
        >
          <Icon
            :fontAwesomeIcon="createFontAwesomeIconDisplayFromFamily(family)"
          />
        </label>
      </div>
    </div>

    <div v-if="!icon.fontAwesomeIcon.family.includes(DuotoneKeyword)">
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
            :checked="style === props.icon?.fontAwesomeIcon.style"
          />
          <label
            :for="style"
            :title="style[0].toUpperCase() + style.slice(1)"
            :class="{
              'rounded-s-lg': index === 0,
              'rounded-e-lg': index === relevantStyles.length - 1
            }"
            class="block cursor-pointer select-none border border-gray-200 bg-white px-4 py-2 text-center text-2xl text-gray-900 hover:bg-gray-100 hover:text-gray-600 focus:z-10 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
          >
            <Icon
              :fontAwesomeIcon="createFontAwesomeIconDisplayFromStyle(style)"
            />
          </label>
        </div>
      </div>
    </div>
  </section>
</template>
