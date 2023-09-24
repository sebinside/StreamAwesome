<script setup lang="ts">
import { useFontsInfoStore } from '@/stores/fontsInfo'
const fontsInfoStore = useFontsInfoStore()
document.fonts.onloadingdone = () => fontsInfoStore.setFontsLoaded(true)
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
