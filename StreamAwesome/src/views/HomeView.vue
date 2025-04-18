<script setup lang="ts">
import MainSettings from '@/components/MainSettings.vue'
import { streamAwesomeVersionInfo } from '@/model/versions'
import ViewOnGithub from '@/components/utils/ViewOnGithub.vue'
</script>

<template>
  <main class="relative">
    <h1 class="text-center text-3xl font-bold md:text-start">
      Stream Awesome
      <span class="text-sm text-gray-400">{{ streamAwesomeVersionInfo }}</span>
    </h1>
    <ViewOnGithub class="absolute right-0 top-0" />
    <MainSettings />
  </main>
</template>
