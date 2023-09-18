<script setup lang="ts">
import IconCanvas from './IconCanvas.vue'
import type Icon from '../model/Icon'

function alertHelloWorld() {
  window.alert('Hello World!')
}

const sampleIcon: Icon = {
  backgroundColor: '#0b1524',
  foregroundColor: '#4982dd',
  symbol: 'f013'
}
</script>

<template>
  <h1 class="text-3xl font-bold">Stream Awesome</h1>
  <RouterLink to="/about">About</RouterLink>

  <IconCanvas :icon="sampleIcon" />
  <button @click="alertHelloWorld">Generate icon</button>
</template>
