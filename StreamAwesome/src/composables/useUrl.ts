import { useRouter } from 'vue-router'
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
        console.error('Failed to parse icon from URL parameters. Trying to redirect...')
        tryRedirectToMatchingVersion(params)
      }
    }
  }

  // Changing the URL too often might cause stability problems: https://issues.chromium.org/issues/40113103
  const urlUpdateThrottle = 100

  watchThrottled(
    iconStore.currentIcon,
    async (newIcon) => {
      const persistentIcon = PersistenceHandler.convertIconToPersistentIcon(newIcon)
      await writeURLParametersFromPersistentIcon(persistentIcon)
    },
    {
      throttle: urlUpdateThrottle,
      trailing: true
    }
  )

  const router = useRouter()

  async function writeURLParametersFromPersistentIcon(persistentIcon: Record<string, unknown>) {
    await router.replace({
      query: persistentIcon as Record<string, string>
    })
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
