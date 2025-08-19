<script setup lang="ts">
import { watchFontLoading } from './utils/watchFontLoading'
watchFontLoading()
</script>

<template>
  <main class="m-auto mt-0 max-w-4xl bg-gray-800 p-4 text-white md:my-14 md:rounded-2xl">
    <RouterView />
  </main>
</template>
