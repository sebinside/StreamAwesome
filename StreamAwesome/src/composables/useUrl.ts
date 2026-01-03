import { useIconsStore } from '@/stores/icons.ts'
import { watchThrottled } from '@vueuse/core'
import { useUrlSearchParams } from '@vueuse/core'
import { PersistenceHandler } from '@/logic/persistence/PersistenceHandler.ts'
import { useDownloadIcon } from '@/composables/useDownloadIcon.ts'

export function useUrl() {
  const publicStreamAwesomeURLBase = 'https://streamawesome.app/'
  const params = useUrlSearchParams('history')
  const iconStore = useIconsStore()
  const { downloadIcon } = useDownloadIcon()

  readURLAndUpdateIcon()

  function readURLAndUpdateIcon() {
    if (params.version === undefined) {
      return
    }

    console.log('Found URL parameters. Trying to parse input...')
    const icon = PersistenceHandler.convertPersistentIconToIcon(params)

    if (icon === null) {
      console.error('Failed to parse icon from URL parameters. Trying to redirect...')
      tryRedirectToMatchingVersion(params)
      return
    }

    console.log('Successfully parsed icon from URL parameters.')
    iconStore.currentIcon = icon

    if (params.download !== undefined) {
      downloadIcon()
      console.log('Triggered icon download from URL parameters.')
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

  function tryRedirectToMatchingVersion(record: Record<string, unknown>) {
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

  return {
    writeURLParametersFromPersistentIcon,
    tryRedirectToMatchingVersion
  }
}
