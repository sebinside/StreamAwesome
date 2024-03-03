<script setup lang="ts">
import type { CustomIcon } from '@/model/customIcon'
import { FontAwesomeStyleKeys } from '@/model/fontAwesomeIcon'
import { FontAwesomeIcon } from '@/model/fontAwesomeIcon'

const props = defineProps({
  icon: {
    type: Object as () => CustomIcon
  }
})

const relevantStyles = Object.values(FontAwesomeStyleKeys).filter((key) => {
  return key !== 'brands'
})

// TODO: Fix width of the elements to fit the overall container size
// TODO: Fix brand icons
// TODO: Fix compound icon names not working properly e.g. smth like file-video
const calculateStyle = (style: string) => [`fa-${style}`, `fa-${props.icon?.label.toLowerCase()}`]

defineEmits(['input'])
</script>

<template>
  <p for="iconSymbol" class="mb-3 mt-2 block text-sm font-medium text-gray-900 dark:text-white">
    Style:
  </p>
  <div class="inline-flex rounded-md shadow-sm" id="styleSelector">
    <span v-for="(style, index) in relevantStyles" :key="style">
      <input
        type="radio"
        name="iconStyle"
        :id="style"
        :value="style"
        class="peer hidden"
        @change="$emit('input', style)"
        :checked="style === FontAwesomeIcon.getFontAwesomeStyle(props.icon?.fontWeight || 900)"
      />
      <label
        :for="style"
        :class="{
          'rounded-s-lg': index === 0,
          'rounded-e-lg': index === relevantStyles.length - 1
        }"
        class="cursor-pointer select-none border border-gray-200 bg-white px-4 py-2 text-2xl text-gray-900 hover:bg-gray-100 hover:text-gray-600 focus:z-10 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
      >
        <i :class="calculateStyle(style)"></i>
      </label>
    </span>
  </div>
</template>

<style scoped></style>
