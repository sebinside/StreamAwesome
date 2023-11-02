import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Icon } from '@/model/icon'

export const useIconsStore = defineStore('icons', () => {
  const currentIcon: Icon = reactive({
    backgroundColor: '#0b1524',
    foregroundColor: '#4982dd',
    symbol: 'f013',
    fontSize: 180,
    fontAwesomeFontFamily: 'Pro',
    fontWeight: 900
  })

  return { currentIcon }
})
