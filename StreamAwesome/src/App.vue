<script setup lang="ts">
import { useFontLoader } from '@/composables/useFontLoader.ts'

useFontLoader()
</script>

<template>
  <main class="m-auto mt-0 max-w-4xl bg-gray-800 p-4 text-white md:my-14 md:rounded-2xl">
    <RouterView />
  </main>
</template>
