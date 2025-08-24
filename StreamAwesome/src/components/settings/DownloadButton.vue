<script setup lang="ts">
defineEmits<{
  downloadIcon: []
  copyIconToClipboard: []
}>()
</script>

<template>
  <div class="mt-10 flex">
    <button
      type="button"
      class="mb-2 w-full cursor-pointer rounded-l-lg border-r-2 border-gray-700 bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:from-teal-500 focus:ring-2 focus:ring-cyan-300 focus:outline-none dark:focus:ring-cyan-800"
      @click="$emit('downloadIcon')"
    >
      <i class="fa-solid fa-download"></i> Download
    </button>
    <button
      type="button"
      class="mb-2 w-full cursor-pointer rounded-r-lg bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:to-pink-500 focus:ring-2 focus:ring-cyan-300 focus:outline-none dark:focus:ring-cyan-800"
      @click="$emit('copyIconToClipboard')"
    >
      <i class="fa-solid fa-copy"></i> Copy
    </button>
  </div>
</template>
