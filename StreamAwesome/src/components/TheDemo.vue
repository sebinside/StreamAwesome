<script setup lang="ts">
import IconCanvas from './IconCanvas.vue'
import type Icon from '@/model/icon'

const sampleIcon: Icon = {
  backgroundColor: '#0b1524',
  foregroundColor: '#4982dd',
  symbol: 'f013',
  fontSize: 180,
  fontAwesomeFontFamily: 'Pro'
}
</script>

<template>
  <h1 class="text-3xl font-bold">Stream Awesome <i class="fa-solid fa-square-question"></i></h1>
  <RouterLink to="/about">About</RouterLink>

  <IconCanvas :icon="sampleIcon" />
</template>
