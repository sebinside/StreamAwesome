import { useIconsStore } from '@/stores/icons'
import { watchThrottled } from '@vueuse/core'
import { useUrlSearchParams, type UrlParams } from '@vueuse/core'
import { PersistenceHandler } from './persistence/PersistenceHandler'
import { useDownloadIcon } from '@/composables/useDownloadIcon.ts'

export class URLManager {
  public static initialize() {
    URLManager.readURLAndUpdateIcon()
    URLManager.watchIconAndUpdateURL()
  }

  private static readURLAndUpdateIcon() {
    const params = useUrlSearchParams('history')
    if (params.version !== undefined) {
      console.log('Found URL parameters. Trying to parse input...')

      const icon = PersistenceHandler.convertPersistentIconToIcon(params)

      if (icon !== null) {
        console.log('Successfully parsed icon from URL parameters.')
        useIconsStore().currentIcon = icon

        if (params.download !== undefined) {
          useDownloadIcon().downloadIcon()
          console.log('Triggered icon download from URL parameters.')
        }
      } else {
        console.error('Failed to parse icon from URL parameters.')
      }
    }
  }

  private static watchIconAndUpdateURL() {
    watchThrottled(
      useIconsStore().currentIcon,
      (newIcon) => {
        const params = useUrlSearchParams('history')
        URLManager.clearURLParameters(params)
        const persistentIcon = PersistenceHandler.convertIconToPersistentIcon(newIcon)

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
      },
      { throttle: URLManager.urlUpdateThrottle, trailing: true }
    )
  }

  // Changing the URL too often might cause stability problems: https://issues.chromium.org/issues/40113103
  private static urlUpdateThrottle = 100

  private static clearURLParameters(params: UrlParams) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        delete params[key]
      }
    }
  }
}
