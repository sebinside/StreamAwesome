<script setup lang="ts">
defineEmits<{
  downloadIcon: []
}>()
</script>

<template>
  <div class="mt-10">
    <button
      type="button"
      class="me-2 mb-2 w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:ring-2 focus:ring-cyan-300 focus:outline-none dark:focus:ring-cyan-800"
      @click="$emit('downloadIcon')"
    >
      Download Icon
    </button>
  </div>
</template>
