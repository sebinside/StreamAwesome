<script setup lang="ts">
import { useFontLoading } from '@/composables/useFontLoading.ts'

useFontLoading()
</script>

<template>
  <!-- This is actually required to enforce all fonts to be loaded correctly, don't even try to remove it.-->
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
