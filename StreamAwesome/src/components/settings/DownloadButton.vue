<script setup lang="ts">
import { useCopyIcon } from '@/composables/useCopyIcon.ts'
import { useMagicKeys, whenever } from '@vueuse/core'
import { useDownloadIcon } from '@/composables/useDownloadIcon.ts'

const { downloadIcon } = useDownloadIcon()
const { copyIconToClipboard, iconIsCopiedToClipboard } = useCopyIcon()

const copyShortcutIsPressed = useMagicKeys()['Ctrl+C']
whenever(copyShortcutIsPressed!, copyIconToClipboard)
</script>

<template>
  <div class="mt-10 flex">
    <button
      type="button"
      class="mb-2 w-full cursor-pointer rounded-l-lg border-r-2 border-gray-700 bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:from-teal-500"
      @click="downloadIcon"
    >
      <i class="fa-solid fa-download"></i> Download
    </button>
    <button
      type="button"
      class="mb-2 w-full cursor-pointer rounded-r-lg bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:to-pink-500"
      @click="copyIconToClipboard"
    >
      <span v-if="!iconIsCopiedToClipboard"><i class="fa-solid fa-copy"></i> Copy</span>
      <span v-else><i class="fa-solid fa-check"></i> Copied</span>
    </button>
  </div>
</template>
