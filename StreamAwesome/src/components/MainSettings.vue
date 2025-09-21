<script setup lang="ts">
import IconCanvas from '@/components/IconCanvas.vue'
import IconSettings from '@/components/settings/IconSettings.vue'
import UserPresetManager from '@/components/utils/UserPresetManager.vue'
import IconBrowser from '@/components/browser/IconBrowser.vue'
import { URLManager } from '@/logic/URLManager'
import { getMatchingGenerator } from '@/logic/generator/generators'
import { useIconsStore } from '@/stores/icons'
import { useDropZone } from '@vueuse/core'
import { nextTick, ref } from 'vue'
import { getMetadata } from 'meta-png'
import { metaDataKeyword, PersistenceHandler } from '@/logic/persistence/PersistenceHandler'
import type { PersistentIcon } from "@/logic/persistence/PersistentIcon.ts";

const iconStore = useIconsStore()
URLManager.initialize()

function downloadIcon() {
  const iconGenerator = getMatchingGenerator(iconStore.currentIcon)
  iconGenerator.saveIcon(iconStore.currentIcon)
}

async function loadPreset(preset: PersistentIcon) {
  const parsedMetadata = JSON.parse(JSON.stringify(preset)) as Record<string, unknown>;
  await loadIconFromURL(parsedMetadata, 'preset')
}

const dropZoneRef = ref<HTMLDivElement>()

function onDrop(files: File[] | null) {
  createIconFromMetadata(files)
}

useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: ['image/png'],
  multiple: true,
  preventDefaultForUnhandled: false
})

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
  await loadIconFromURL(parsedMetadata, 'dropped image')
}

async function loadIconFromURL(parsedMetadata: Record<string, unknown>, source: 'dropped image' | 'preset') {
  const icon = PersistenceHandler.convertPersistentIconToIcon(parsedMetadata)
  if (!icon) {
    console.warn(`Failed to parse icon from ${source}.`)
    return
  }

  console.log(`Successfully parsed icon from ${source}.`)

  // The current approach to load the icon via the URL parameters shall only be a workaround until the UI is more reactive to icon changes.
  URLManager.writeURLParametersFromPersistentIcon(parsedMetadata)
  await nextTick()
  window.location.reload()
}
</script>

<template>
  <div class="flex flex-col md:flex-row" ref="dropZoneRef">
    <div class="mr-0 grid md:mr-7">
      <IconCanvas
          class="mt-5 mb-5 place-self-center md:place-self-auto"
          @download-icon="downloadIcon"
      />
      <div class="mb-3">
        <UserPresetManager
            :icon="iconStore.currentIcon"
            @load-preset="loadPreset"
        />
      </div>
      <IconSettings :icon="iconStore.currentIcon" @download-icon="downloadIcon" />
    </div>
    <div class="flex-grow">
      <IconBrowser />
    </div>
  </div>
</template>
