<script setup lang="ts">
import MainSettings from '@/components/MainSettings.vue'
import { streamAwesomeVersion } from '@/version'
</script>

<template>
  <main>
    <h1 class="text-center text-3xl font-bold md:text-start">
      Stream Awesome
      <span class="text-sm text-gray-400">{{ streamAwesomeVersion }}</span>
    </h1>
    <MainSettings />
  </main>
</template>
