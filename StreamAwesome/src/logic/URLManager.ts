import { useIconsStore } from '@/stores/icons'
import { watchThrottled } from '@vueuse/core'
import { useUrlSearchParams, type UrlParams } from '@vueuse/core'
import { PersistenceHandler } from './persistence/PersistenceHandler'
import { useDownloadIcon } from '@/composables/useDownloadIcon.ts'

const publicStreamAwesomeURLBase = 'https://streamawesome.app/'

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
        console.error('Failed to parse icon from URL parameters. Trying to redirect...')
        URLManager.tryRedirectToMatchingVersion(params)
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
        URLManager.writeURLParametersFromPersistentIcon(persistentIcon)
      },
      { throttle: URLManager.urlUpdateThrottle, trailing: true }
    )
  }

  // Changing the URL too often might cause stability problems: https://issues.chromium.org/issues/40113103
  private static urlUpdateThrottle = 100

  public static writeURLParametersFromPersistentIcon(persistentIcon: Record<string, unknown>) {
    const params = useUrlSearchParams('history')
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

  private static clearURLParameters(params: UrlParams) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        delete params[key]
      }
    }
  }

  public static tryRedirectToMatchingVersion(record: Record<string, unknown>) {
    if (record.version === undefined || typeof record.version !== 'string') {
      console.error('No version found in record for redirection.')
      return
    }

    const versionPattern = /^\d+\.\d+\.\d+$/
    if (!versionPattern.test(record.version)) {
      console.error(`Invalid version format for redirection: ${record.version}`)
      return
    }

    const targetURL = `${publicStreamAwesomeURLBase}v${record.version}/?${new URLSearchParams(record as Record<string, string>).toString()}`
    console.log(`Redirecting to URL for version ${record.version}: ${targetURL}`)
    window.location.href = targetURL
  }
}
