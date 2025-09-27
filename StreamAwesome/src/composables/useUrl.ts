import { useIconsStore } from '@/stores/icons.ts'
import { watchThrottled } from '@vueuse/core'
import { useUrlSearchParams } from '@vueuse/core'
import { PersistenceHandler } from '../logic/persistence/PersistenceHandler.ts'
import { useDownloadIcon } from '@/composables/useDownloadIcon.ts'

export function useUrl() {
  const params = useUrlSearchParams('history')
  const iconStore = useIconsStore()
  const { downloadIcon } = useDownloadIcon()

  readURLAndUpdateIcon()

  function readURLAndUpdateIcon() {
    if (params.version !== undefined) {
      console.log('Found URL parameters. Trying to parse input...')

      const icon = PersistenceHandler.convertPersistentIconToIcon(params)

      if (icon !== null) {
        console.log('Successfully parsed icon from URL parameters.')
        iconStore.currentIcon = icon

        if (params.download !== undefined) {
          downloadIcon()
          console.log('Triggered icon download from URL parameters.')
        }
      } else {
        console.error('Failed to parse icon from URL parameters.')
      }
    }
  }

  // Changing the URL too often might cause stability problems: https://issues.chromium.org/issues/40113103
  const urlUpdateThrottle = 100

  watchThrottled(
    iconStore.currentIcon,
    (newIcon) => {
      clearURLParameters()

      const persistentIcon = PersistenceHandler.convertIconToPersistentIcon(newIcon)
      writeURLParametersFromPersistentIcon(persistentIcon)
    },
    {
      throttle: urlUpdateThrottle,
      trailing: true
    }
  )

  function writeURLParametersFromPersistentIcon(persistentIcon: Record<string, unknown>) {
    for (const key in persistentIcon) {
      if (persistentIcon.hasOwnProperty(key)) {
        if (typeof persistentIcon[key] === 'string') {
          params[key] = persistentIcon[key] as string
        } else {
          console.warn(`Unexpected type for key "${key}":`, persistentIcon[key])
          params[key] = JSON.stringify(persistentIcon[key])
        }
      }
    }
  }

  function clearURLParameters() {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        delete params[key]
      }
    }
  }

  return {
    writeURLParametersFromPersistentIcon
  }
}
