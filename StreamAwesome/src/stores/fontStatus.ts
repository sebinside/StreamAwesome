import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { FontAwesomeInfo } from '@/model/fontAwesomeInfo'

export const useFontsStatusStore = defineStore('fontStatus', () => {
  const fontAwesomeInfo = reactive({
    fontFamilyBase: 'Font Awesome 6',
    fontVersion: '6.4.2',
    fontLicense: 'Pro'
  } as FontAwesomeInfo)

  const fontsLoaded = ref(false)
  function setFontsLoaded() {
    fontsLoaded.value = true
  }

  return { fontsLoaded, setFontsLoaded, fontAwesomeInfo }
})
