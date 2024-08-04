import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { CustomIcon } from '@/model/customIcon'

export const useIconsStore = defineStore('icons', () => {
  const currentIcon: CustomIcon<'Neo'> = reactive({
    presetSettings: {
      preset: 'Neo',
      colorSpace: 'lch',
      hueStart: 300,
      hueShift: 60,
      lightness: 0.6,
      invertDirection: false,
      saturation: 0.8,
      symbolOnly: false,
      translation: 0.5
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
