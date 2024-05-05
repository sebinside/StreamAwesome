<script setup lang="ts">
import MainSettings from '@/components/MainSettings.vue'
import { streamAwesomeVersionInfo } from '@/model/versions'
</script>

<template>
  <main>
    <h1 class="text-center text-3xl font-bold md:text-start">
      Stream Awesome
      <span class="text-sm text-gray-400">{{ streamAwesomeVersionInfo }}</span>
    </h1>
    <MainSettings />
  </main>
</template>
