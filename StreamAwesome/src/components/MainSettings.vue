<script setup lang="ts">
import IconBrowser from '@/components/browser/IconBrowser.vue'
import IconCanvas from '@/components/IconCanvas.vue'
import IconSettings from '@/components/settings/IconSettings.vue'
import UserUserPresetManager from '@/components/utils/UserPresetManager.vue'
import { getMatchingGenerator } from '@/logic/generator/generators'
import { URLHandler } from '@/logic/URLHandler'
import { useIconsStore } from '@/stores/icons'
import type { CustomIcon, FontAwesomePreset } from '@/model/customIcon'
import { useFontsStatusStore } from '@/stores/fontStatus'

const iconStore = useIconsStore()
URLHandler.initialize(() => useFontsStatusStore().waitForFontsLoaded(downloadIcon))

function downloadIcon() {
  const iconGenerator = getMatchingGenerator(iconStore.currentIcon)
  iconGenerator.saveIcon(iconStore.currentIcon)
}

function loadPreset(preset: CustomIcon<FontAwesomePreset>) {
  Object.assign(iconStore.currentIcon, preset)
}

</script>

<template>
  <div class="flex flex-col md:flex-row">
    <div class="mr-0 grid md:mr-7">
      <IconCanvas
        class="mt-5 mb-5 place-self-center md:place-self-auto"
        @download-icon="downloadIcon"
      />
      <div class="mb-3">
        <UserUserPresetManager
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
