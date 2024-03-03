<script setup lang="ts"></script>

<template>
  <p for="iconSymbol" class="mb-3 mt-2 block text-sm font-medium text-gray-900 dark:text-white">
    Symbol:
  </p>
  <div class="inline-flex rounded-md shadow-sm">
    <span>
      <input
        type="radio"
        id="profile"
        name="navigation"
        value="profile"
        class="peer hidden"
      />
      <label
        for="profile"
        class="cursor-pointer select-none rounded-s-lg border border-gray-200 bg-white px-4 py-2 text-3xl text-gray-900 hover:bg-gray-100 hover:text-gray-600 focus:z-10 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
      >
      <i class="fa-thin fa-gear"></i>
      </label> </span
    ><span>
      <input type="radio" id="settings" name="navigation" value="settings" class="peer hidden" />
      <label
        for="settings"
        class="cursor-pointer select-none border border-gray-200 bg-white px-4 py-2 text-3xl text-gray-900 hover:bg-gray-100 hover:text-gray-600 focus:z-10 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
      >
      <i class="fa-light fa-gear"></i>
      </label>
    </span>
    <span>
      <input type="radio" id="other" name="navigation" value="other" class="peer hidden" />
      <label
        for="other"
        class="cursor-pointer select-none border border-gray-200 bg-white px-4 py-2 text-3xl text-gray-900 hover:bg-gray-100 hover:text-gray-600 focus:z-10 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
      >
      <i class="fa-regular fa-gear"></i>
      </label>
    </span>
    <span>
      <input type="radio" id="messages" name="navigation" value="messages" class="peer hidden" />
      <label
        for="messages"
        class="cursor-pointer select-none rounded-e-lg border border-gray-200 bg-white px-4 py-2 text-3xl text-gray-900 hover:bg-gray-100 hover:text-gray-600 focus:z-10 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500"
      >
      <i class="fa-solid fa-gear"></i>
      </label>
    </span>
  </div>
</template>

<style scoped></style>
