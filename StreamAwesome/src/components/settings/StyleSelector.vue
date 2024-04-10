<script setup lang="ts">
import type { CustomIcon } from '@/model/customIcon'
import {
  BrandsKeyword,
  FontAwesomeFamilyKeys,
  FontAwesomeStyleKeys,
  type FontAwesomeStyle
} from '@/model/fontAwesomeConstants'
import { FontAwesomeIconType } from '@/model/fontAwesomeIconType'
import Icon from '@/components/utils/IconDisplay.vue'
import type { FontAwesomeIcon } from '@/model/fontAwesomeIcon'
import { fontAwesomeVersionInfo } from '@/model/versions'

const props = defineProps({
  icon: {
    type: Object as () => CustomIcon
  }
})

// TODO: Replace copy pase by encapsulated object in template
const relevantFamilies = Object.values(FontAwesomeFamilyKeys)
const relevantStyles = Object.values(FontAwesomeStyleKeys).filter((key) => {
  return key !== BrandsKeyword
})

function createFontAwesomeIconDisplay(style: FontAwesomeStyle): FontAwesomeIcon {
  if (props.icon === undefined) {
    const fallBackIcon = FontAwesomeIconType.createFallBackIcon()
    return {
      id: fallBackIcon.id,
      label: fallBackIcon.label,
      unicode: fallBackIcon.unicode,
      isBrandsIcon: fallBackIcon.isBrand(),
      family: fontAwesomeVersionInfo.fontLicense,
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

defineEmits(['updateStyle', 'updateFamily'])
</script>

<template>
  <p for="iconSymbol" class="mb-3 mt-2 block text-sm font-medium text-gray-900 dark:text-white">
    Family:
  </p>
  <div class="rounded-md shadow-sm" id="familySelector">
    <span v-for="(family, index) in relevantFamilies" :key="family">
      <input
        type="radio"
        name="iconFamily"
        :id="family"
        :value="family"
        class="peer hidden"
        @change="$emit('updateFamily', family)"
        :checked="family === props.icon?.fontAwesomeIcon.family"
      />
      <label
        :for="family"
        :class="{
          'rounded-s-lg': index === 0,
          'rounded-e-lg': index === relevantFamilies.length - 1
        }"
        class="cursor-pointer select-none border border-gray-200 bg-white px-4 py-2 text-lg text-gray-900 hover:bg-gray-100 hover:text-gray-600 focus:z-10 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
      >
        {{ family[0].toUpperCase() + family.slice(1) }}
      </label>
    </span>
  </div>

  <p for="iconSymbol" class="mb-3 mt-6 block text-sm font-medium text-gray-900 dark:text-white">
    Style:
  </p>
  <div class="rounded-md shadow-sm" id="styleSelector">
    <span v-for="(style, index) in relevantStyles" :key="style">
      <input
        type="radio"
        name="iconStyle"
        :id="style"
        :value="style"
        class="peer hidden"
        @change="$emit('updateStyle', style)"
        :checked="style === props.icon?.fontAwesomeIcon.style"
      />
      <label
        :for="style"
        :class="{
          'rounded-s-lg': index === 0,
          'rounded-e-lg': index === relevantStyles.length - 1
        }"
        class="cursor-pointer select-none border border-gray-200 bg-white px-4 py-2 text-2xl text-gray-900 hover:bg-gray-100 hover:text-gray-600 focus:z-10 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
      >
        <Icon
          :fontAwesomeIcon="createFontAwesomeIconDisplay(style)"
          :title="style[0].toUpperCase() + style.slice(1)"
        />
      </label>
    </span>
  </div>
</template>

<style scoped>
#styleSelector {
  max-width: 256px;
}
</style>
