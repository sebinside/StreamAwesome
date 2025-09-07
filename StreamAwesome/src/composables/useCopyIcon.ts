import { useClipboardItems } from '@vueuse/core'
import { useIconsStore } from '@/stores/icons.ts'
import { getMatchingGenerator } from '@/logic/generator/generators.ts'

export function useCopyIcon() {
  const iconStore = useIconsStore()
  const { copy, copied } = useClipboardItems({ copiedDuring: 2_000 })

  async function copyIconToClipboard() {
    const iconAsClipboardItem = await getIconAsClipboardItem()
    await copy([iconAsClipboardItem])
  }

  async function getIconAsClipboardItem() {
    const iconGenerator = getMatchingGenerator(iconStore.currentIcon)
    const iconAsBlob = await iconGenerator.getIconAsBlob(iconStore.currentIcon)

    return new ClipboardItem({ 'image/png': iconAsBlob })
  }

  return {
    copyIconToClipboard,
    iconIsCopiedToClipboard: copied
  }
}
