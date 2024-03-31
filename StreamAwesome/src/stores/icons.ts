import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { CustomIcon } from '@/model/customIcon'

export const useIconsStore = defineStore('icons', () => {
  const currentIcon: CustomIcon = reactive({
    backgroundColor: '#000023',
    foregroundColor: '#4680dd',
    unicode: 'f013',
    label: 'Gear',
    fontSize: 180,
    fontAwesomeFontFamilySuffix: 'Pro',
    fontWeight: 900
  })

  return { currentIcon }
})
