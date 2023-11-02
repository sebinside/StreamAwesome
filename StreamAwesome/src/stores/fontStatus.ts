import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFontsStatusStore = defineStore('fontStatus', () => {
  const fontsLoaded = ref(false)
  function setFontsLoaded() {
    fontsLoaded.value = true
  }

  return { fontsLoaded, setFontsLoaded }
})
