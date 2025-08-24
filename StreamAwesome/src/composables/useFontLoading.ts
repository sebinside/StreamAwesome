import { useFontsStatusStore } from '@/stores/fontStatus.ts'
import { onMounted } from 'vue'

export function useFontLoading() {
  // Cross-browser waiting for font loading is messed up, see: https://stackoverflow.com/questions/5680013/how-to-be-notified-once-a-web-font-has-loaded/77481922#77481922
  const waitForFontsLoaded = document.fonts?.ready.then(() => {
    return new Promise((resolve) => {
      let waitTimeMs = 5
      const checkFontsLoaded = () => {
        if (document.fonts?.status === 'loaded') {
          return resolve(null)
        }
        waitTimeMs *= 2
        return setTimeout(checkFontsLoaded, waitTimeMs)
      }
      setTimeout(checkFontsLoaded, 5)
    })
  })

  const fontStatusStore = useFontsStatusStore()

  onMounted(async () => {
    await waitForFontsLoaded
    fontStatusStore.setFontsLoaded()
  })
}
