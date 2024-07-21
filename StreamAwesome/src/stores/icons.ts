import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { CustomIcon } from '@/model/customIcon'

export const useIconsStore = defineStore('icons', () => {
  const currentIcon: CustomIcon<'Elgato Classic'> = reactive({
    presetSettings: {
      preset: 'Elgato Classic',
      hue: 0
    },
    fontSize: 180,
    fontAwesomeIcon: {
      id: 'gear',
      family: 'classic',
      label: 'Gear',
      isBrandsIcon: false,
      style: 'solid',
      unicode: 'f013'
    }
  })

  return { currentIcon }
})
