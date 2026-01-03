<script setup lang="ts">
import IconCanvas from '@/components/IconCanvas.vue'
import IconSettings from '@/components/settings/IconSettings.vue'
import IconBrowser from '@/components/browser/IconBrowser.vue'
import { useUrl } from '@/composables/useUrl.ts'
import { useDropZone } from '@vueuse/core'
import { useTemplateRef, nextTick } from 'vue'
import { getMetadata } from 'meta-png'
import { metaDataKeyword, PersistenceHandler } from '@/logic/persistence/PersistenceHandler'

const dropZone = useTemplateRef('dropZone')

function onDrop(files: File[] | null) {
  createIconFromMetadata(files)
}

useDropZone(dropZone, {
  onDrop,
  dataTypes: ['image/png'],
  multiple: true,
  preventDefaultForUnhandled: false
})

const { writeURLParametersFromPersistentIcon, tryRedirectToMatchingVersion } = useUrl()

async function createIconFromMetadata(files: File[] | null) {
  if (!files || files.length !== 1 || !files[0]) {
    console.warn('Only one file can be processed at a time.')
    return
  }

  console.log('Received dropped image. Trying to parse metadata...')
  const arrayBuffer = await files[0].arrayBuffer()
  const metadata = getMetadata(new Uint8Array(arrayBuffer), metaDataKeyword)

  if (!metadata) {
    console.warn('No valid metadata found in dropped image.')
    return
  }

  const parsedMetadata = JSON.parse(metadata) as Record<string, unknown>
  const icon = PersistenceHandler.convertPersistentIconToIcon(parsedMetadata)
  if (!icon) {
    console.warn('Failed to parse icon from dropped image. Trying to redirect...')
    tryRedirectToMatchingVersion(parsedMetadata)
    return
  }

  console.log('Successfully parsed icon from dropped image.')

  // The current approach to load the icon via the URL parameters shall only be a workaround until the UI is more reactive to icon changes.
  await writeURLParametersFromPersistentIcon(parsedMetadata)
  await nextTick()
  window.location.reload()
}
</script>

<template>
  <div class="flex flex-col md:flex-row" ref="dropZone">
    <div class="mr-0 grid md:mr-7">
      <IconCanvas class="mt-5 mb-5 place-self-center md:place-self-auto" />
      <IconSettings />
    </div>
    <div class="flex-grow">
      <IconBrowser />
    </div>
  </div>
</template>
