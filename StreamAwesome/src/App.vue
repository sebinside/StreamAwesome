<script setup lang="ts">
import { RouterView } from 'vue-router'
import FontLoader from '@/components/utils/FontLoader.vue'
</script>

<template>
  <FontLoader />
  <main class="m-auto mt-0 max-w-4xl bg-gray-800 p-4 text-white md:my-14 md:rounded-2xl">
    <RouterView />
  </main>
</template>
