<script setup lang="ts">
import type { CustomIcon } from '@/model/customIcon'
import { FontAwesomeStyleKeys } from '@/model/fontAwesomeIcon'
import { FontAwesomeIcon } from '@/model/fontAwesomeIcon'
import Icon from '@/components/utils/IconDisplay.vue'

const props = defineProps({
  icon: {
    type: Object as () => CustomIcon
  }
})

const relevantStyles = Object.values(FontAwesomeStyleKeys).filter((key) => {
  return key !== 'brands'
})

defineEmits(['input'])
</script>

<template>
  <p for="iconSymbol" class="mb-3 mt-2 block text-sm font-medium text-gray-900 dark:text-white">
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
      <Icon
      :iconUnicode="props.icon?.unicode || '3f'"
      :isBrandIcon="props.icon?.fontAwesomeFontFamilySuffix === 'Brands'"
      :fontWeight="FontAwesomeIcon.getFontWeight(style)"
      :title="style[0].toUpperCase() + style.slice(1)"
      /> 
      </label>
    </span>
  </div>
</template>

<style scoped>
#styleSelector {
  max-width:256px;
}
</style>
