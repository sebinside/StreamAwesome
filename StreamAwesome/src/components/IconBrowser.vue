<script setup lang="ts">
import { FontAwesomeBrowser } from '@/logic/fontAwesomeBrowser'
import { useFontsStatusStore } from '@/stores/fontStatus'

const fontStatusStore = useFontsStatusStore()
const fontAwesomeBrowser = new FontAwesomeBrowser(fontStatusStore.fontAwesomeInfo.fontVersion)

fontAwesomeBrowser.getAvailableIcons('github').then((icons) => {
  console.log(icons)
})
</script>

<template>
  <p>I'm the icon browser!</p>
</template>
