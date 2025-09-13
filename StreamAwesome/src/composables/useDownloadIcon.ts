import { useFontsStatusStore } from '@/stores/fontStatus.ts'
import { useIconsStore } from '@/stores/icons.ts'
import { getMatchingGenerator } from '@/logic/generator/generators.ts'

export function useDownloadIcon() {
  const fontsStatusStore = useFontsStatusStore()
  const iconStore = useIconsStore()

  function downloadIcon() {
    fontsStatusStore.waitForFontsLoaded(() => {
      const iconGenerator = getMatchingGenerator(iconStore.currentIcon)
      iconGenerator.saveIcon(iconStore.currentIcon)
    })
  }

  return {
    downloadIcon
  }
}
