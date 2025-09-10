import { ref, readonly } from 'vue'
import { defineStore } from 'pinia'
import { whenever } from '@vueuse/core'

export const useFontsStatusStore = defineStore('fontStatus', () => {
  const fontsLoaded = ref(false)
  function setFontsLoaded() {
    fontsLoaded.value = true
  }

  function waitForFontsLoaded(callback: () => void) {
    whenever(fontsLoaded, callback, { immediate: true, once: true })
  }

  return {
    fontsLoaded: readonly(fontsLoaded),
    setFontsLoaded,
    waitForFontsLoaded
  }
})
