<template>
  <div class="mt-5">
    <label :for="inputId" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >{{ label }}
    </label>
    <input
      :id="inputId"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target || '')"
      class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
    />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    label: {
      type: String
    },
    inputId: {
      required: true,
      type: String
    },
    modelValue: {
      required: false
    }
  },
  emits: ['update:modelValue']
}
</script>
