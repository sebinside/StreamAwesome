<script setup lang="ts">
import IconBrowser from '@/components/browser/IconBrowser.vue'
import IconCanvas from '@/components/IconCanvas.vue'
import IconSettings from '@/components/settings/IconSettings.vue'
import { URLManager } from '@/logic/URLManager'
import { useFontsStatusStore } from '@/stores/fontStatus'
import { useDownloadIcon } from '@/composables/useDownloadIcon.ts'

const { downloadIcon } = useDownloadIcon()

URLManager.initialize(() => useFontsStatusStore().waitForFontsLoaded(downloadIcon))
</script>

<template>
  <div class="flex flex-col md:flex-row">
    <div class="mr-0 grid md:mr-7">
      <IconCanvas class="mt-5 mb-5 place-self-center md:place-self-auto" />
      <IconSettings />
    </div>
    <div class="flex-grow">
      <IconBrowser />
    </div>
  </div>
</template>
