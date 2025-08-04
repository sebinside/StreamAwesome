<script setup lang="ts">
import { useFontsStatusStore } from '@/stores/fontStatus'
import { onMounted } from 'vue'

// Cross-browser waiting for font loading is messed up, see: https://stackoverflow.com/questions/5680013/how-to-be-notified-once-a-web-font-has-loaded/77481922#77481922
const waitForFontsLoaded = document.fonts?.ready.then(() => {
  return new Promise((resolve) => {
    let waitTimeMs = 5
    const checkFontsLoaded = () => {
      if (document.fonts?.status === 'loaded') {
        return resolve(null)
      }
      waitTimeMs *= 2
      return setTimeout(checkFontsLoaded, waitTimeMs)
    }
    setTimeout(checkFontsLoaded, 5)
  })
})

const fontStatusStore = useFontsStatusStore()

onMounted(async () => {
  await waitForFontsLoaded
  fontStatusStore.setFontsLoaded()
})
</script>

<template>
  <div class="sr-only">
    <i class="fa-solid fa-glasses"></i>
    <i class="fa-regular fa-glasses"></i>
    <i class="fa-light fa-glasses"></i>
    <i class="fa-duotone fa-glasses"></i>
    <i class="fa-thin fa-glasses"></i>
    <i class="fa-sharp fa-solid fa-glasses"></i>
    <i class="fa-sharp fa-regular fa-glasses"></i>
    <i class="fa-sharp fa-light fa-glasses"></i>
    <i class="fa-sharp fa-thin fa-glasses"></i>
    <i class="fa-sharp fa-duotone fa-glasses"></i>
    <i class="fa-brands fa-font-awesome"></i>
  </div>
</template>
