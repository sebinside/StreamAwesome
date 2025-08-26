import { useIconsStore } from '@/stores/icons'
import { watch } from 'vue'
import { useUrlSearchParams, type UrlParams } from '@vueuse/core'
import { PersistenceHandler } from './persistence/PersitenceHandler'

export class URLHandler {
  public static initialize(triggerIconDownload: () => void) {
    URLHandler.readURLAndUpdateIcon(triggerIconDownload)
    URLHandler.watchIconAndUpdateURL()
  }

  private static readURLAndUpdateIcon(triggerIconDownload: () => void) {
    const params = useUrlSearchParams('history')
    if (params.version !== undefined) {
      console.log('Found URL parameters. Trying to parse input...')

      const icon = PersistenceHandler.convertPersistentIconToIcon(params)

      if (icon !== null) {
        console.log('Successfully parsed icon from URL parameters.')
        useIconsStore().currentIcon = icon

        if (params.download !== undefined) {
          triggerIconDownload()
          console.log('Triggered icon download from URL parameters.')
        }
      } else {
        console.error('Failed to parse icon from URL parameters.')
      }
    }
  }

  private static watchIconAndUpdateURL() {
    watch(useIconsStore().currentIcon, (newIcon) => {
      const params = useUrlSearchParams('history')
      URLHandler.clearURLParameters(params)
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
    })
  }

  private static clearURLParameters(params: UrlParams) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        delete params[key]
      }
    }
  }
}
