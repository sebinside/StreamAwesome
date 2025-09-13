import { useIconsStore } from '@/stores/icons.ts'
import { getMatchingGenerator } from '@/logic/generator/generators.ts'

export function useDownloadIcon() {
  const iconStore = useIconsStore()

  function downloadIcon() {
    const iconGenerator = getMatchingGenerator(iconStore.currentIcon)
    iconGenerator.saveIcon(iconStore.currentIcon)
  }

  return {
    downloadIcon
  }
}
