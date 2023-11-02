<script setup lang="ts">
import { useFontsStatusStore } from '@/stores/fontStatus'
const fontStatusStore = useFontsStatusStore()
document.fonts.onloadingdone = () => fontStatusStore.setFontsLoaded()
</script>

<template>
  <i class="fa-solid fa-glasses"></i>
  <i class="fa-regular fa-glasses"></i>
  <i class="fa-light fa-glasses"></i>
  <i class="fa-duotone fa-glasses"></i>
  <i class="fa-thin fa-glasses"></i>
  <i class="fa-sharp fa-solid fa-glasses"></i>
  <i class="fa-sharp fa-regular fa-glasses"></i>
  <i class="fa-sharp fa-light fa-glasses"></i>
  <i class="fa-brands fa-font-awesome"></i>
</template>

<style scoped>
* {
  visibility: hidden;
}
</style>
@/stores/fontStatus
