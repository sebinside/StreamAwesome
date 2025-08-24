<script setup lang="ts">
import IconBrowser from '@/components/browser/IconBrowser.vue'
import IconCanvas from '@/components/IconCanvas.vue'
import IconSettings from '@/components/settings/IconSettings.vue'
import { getMatchingGenerator } from '@/logic/generator/generators'
import { useIconsStore } from '@/stores/icons'
import { useMagicKeys, whenever } from '@vueuse/core'

const iconStore = useIconsStore()

function downloadIcon() {
  const iconGenerator = getMatchingGenerator(iconStore.currentIcon)
  iconGenerator.saveIcon(iconStore.currentIcon)
}

function copyIconToClipboard() {
  const iconGenerator = getMatchingGenerator(iconStore.currentIcon)
  iconGenerator.copyIconToClipboard(iconStore.currentIcon)
}

const copyShortcut = useMagicKeys()['Ctrl+C']
whenever(copyShortcut, copyIconToClipboard)
</script>

<template>
  <div class="flex flex-col md:flex-row">
    <div class="mr-0 grid md:mr-7">
      <IconCanvas
        :icon="iconStore.currentIcon"
        class="mt-5 mb-5 place-self-center md:place-self-auto"
        @download-icon="downloadIcon"
      />
      <IconSettings
        :icon="iconStore.currentIcon"
        @download-icon="downloadIcon"
        @copy-icon-to-clipboard="copyIconToClipboard"
      />
    </div>
    <div class="flex-grow">
      <IconBrowser />
    </div>
  </div>
</template>
