import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFontsStatusStore = defineStore('fontStatus', () => {
  const fontsLoaded = ref(false)
  function setFontsLoaded() {
    fontsLoaded.value = true
  }

  function waitForFontsLoaded(callback: () => void) {
    if (fontsLoaded.value) {
      callback()
    } else {
      useFontsStatusStore().$subscribe((_, state) => {
        if (state.fontsLoaded) {
          callback()
        }
      })
    }
  }

  return { fontsLoaded, setFontsLoaded, waitForFontsLoaded }
})
