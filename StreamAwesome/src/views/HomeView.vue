<script setup lang="ts">
import MainSettings from '@/components/MainSettings.vue'
import { streamAwesomeVersion } from '@/version'

const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <main>
    <h1 class="text-center text-3xl font-bold md:text-start">
      <a :href="baseUrl" class="hover:text-blue-500">Stream Awesome</a>
      <span class="ml-2 text-sm text-gray-400">{{ streamAwesomeVersion }}</span>
    </h1>
    <MainSettings />
  </main>
</template>
