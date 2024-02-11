import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { CustomIcon } from '@/model/customIcon'

export const useIconsStore = defineStore('icons', () => {
  const currentIcon: CustomIcon = reactive({
    backgroundColor: '#0b1524',
    foregroundColor: '#4982dd',
    unicode: 'f013',
    label: 'Gear',
    fontSize: 180,
    fontAwesomeFontFamilySuffix: 'Pro',
    fontWeight: 900
  })

  return { currentIcon }
})
