<script setup lang="ts">
import { FontAwesomeBrowser } from '@/logic/fontAwesomeBrowser'
import { useFontsStatusStore } from '@/stores/fontStatus'

const fontStatusStore = useFontsStatusStore()
const fontAwesomeBrowser = new FontAwesomeBrowser(
  fontStatusStore.fontAwesomeInfo.fontVersion,
  fontStatusStore.fontAwesomeInfo.fontLicense
)

fontAwesomeBrowser.callAPI('Car')
</script>

<template>
  <p>I'm the icon browser!</p>
</template>
