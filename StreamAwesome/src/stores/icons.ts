import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { CustomIcon, FontAwesomePreset } from '@/model/customIcon'

export const useIconsStore = defineStore('icons', () => {
  const currentIcon = ref<CustomIcon<FontAwesomePreset>>({
    presetSettings: {
      preset: 'Neo',
      colorSpace: 'lch',
      hueStart: 300,
      hueShift: 60,
      lightness: 0.6,
      invertDirection: false,
      saturation: 0.8,
      neoStyle: 'whiteicon',
      translation: 0
    },
    fontSize: 180,
    fontAwesomeIcon: {
      id: 'gear',
      family: 'classic',
      label: 'Gear',
      isBrandsIcon: false,
      style: 'solid',
      unicode: 'f013',
      duotoneAlpha: 0.5
    },
    secondaryIcon: {
      icon: {
        id: 'microphone-lines',
        family: 'classic',
        label: 'Microphone Lines',
        isBrandsIcon: false,
        style: 'solid',
        unicode: 'f3c9',
        duotoneAlpha: 0.5
      },
      corner: 'br',
      fontSize: 70
    }
  })

  // Which icon the search and the style/size settings currently edit (UI state, not persisted)
  const editTarget = ref<'main' | 'secondary'>('main')

  return { currentIcon, editTarget }
})
