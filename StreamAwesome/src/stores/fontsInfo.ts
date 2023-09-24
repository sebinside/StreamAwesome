import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFontsInfoStore = defineStore('fontsInfo', () => {
  const fontsLoaded = ref(false)
  function setFontsLoaded(loaded: boolean) {
    fontsLoaded.value = loaded
  }

  return { fontsLoaded, setFontsLoaded }
})
