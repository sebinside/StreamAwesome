<script setup lang="ts">
import AppFooter from './components/utils/AppFooter.vue'
import FontLoader from './components/utils/FontLoader.vue'
</script>

<template>
  <main class="m-auto mt-0 max-w-4xl bg-gray-800 p-4 text-white md:my-3 md:rounded-2xl">
    <RouterView />
  </main>
  <AppFooter />
  <FontLoader />
</template>
