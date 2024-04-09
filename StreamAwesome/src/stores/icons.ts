import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { CustomIcon } from '@/model/customIcon'

export const useIconsStore = defineStore('icons', () => {
  const currentIcon: CustomIcon = reactive({
    backgroundColor: '#000023',
    foregroundColor: '#4680dd',
    fontSize: 180,
    fontAwesomeIcon: {
      id: 'gear',
      family: 'classic',
      label: 'Gear',
      style: 'solid',
      unicode: 'f013'
    }
  })

  return { currentIcon }
})
