<script setup lang="ts">
function alertHelloWorld() {
  window.alert('Hello World!')
}
</script>

<template>
  <h1 class="text-3xl font-bold">Stream Awesome</h1>
  <RouterLink to="/about">About</RouterLink>

  <canvas id="symbol" width="256" height="256" class="rounded-3xl border border-cyan-500"></canvas>
  <button @click="alertHelloWorld">Generate icon</button>
</template>
