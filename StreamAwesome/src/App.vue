<script setup lang="ts">
import { RouterView } from 'vue-router'
import FontLoader from './components/FontLoader.vue'
</script>

<template>
  <FontLoader />
  <div class="m-auto mt-10 max-w-lg rounded-2xl bg-gray-800 p-4 text-white">
    <RouterView />
  </div>
</template>
