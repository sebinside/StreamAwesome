<script setup lang="ts">
import { useCopyIcon } from '@/composables/useCopyIcon.ts'
import { useMagicKeys, whenever } from '@vueuse/core'
import { ref } from 'vue'
import { useDownloadIcon } from '@/composables/useDownloadIcon.ts'

const { downloadIcon } = useDownloadIcon()
const { copyIconToClipboard, iconIsCopiedToClipboard } = useCopyIcon()

const copySource = ref<'copy' | 'both'>('copy')

const copyOnly = () => {
  copySource.value = 'copy'
  copyIconToClipboard()
}

const downloadAndCopyIcon = () => {
  copySource.value = 'both'
  downloadIcon()
  copyIconToClipboard()
}

const copyShortcutIsPressed = useMagicKeys()['Ctrl+C']
whenever(copyShortcutIsPressed!, copyOnly)

const copyAndDownloadShortcutIsPressed = useMagicKeys()['Ctrl+Alt+C']
whenever(copyAndDownloadShortcutIsPressed!, downloadAndCopyIcon)
</script>

<template>
  <div class="mt-10 flex">
    <button
      type="button"
      class="mb-2 w-full cursor-pointer rounded-l-lg bg-linear-to-r from-cyan-500 to-blue-500 px-2 py-2.5 text-center text-sm font-medium whitespace-nowrap text-white hover:from-teal-500"
      @click="downloadIcon"
    >
      <i class="fa-solid fa-floppy-disk"></i> Save
    </button>
    <button
      type="button"
      class="mb-2 w-full cursor-pointer border-x-2 border-gray-700 bg-linear-to-r from-blue-500 to-blue-500 px-2 py-2.5 text-center text-sm font-medium whitespace-nowrap text-white hover:bg-linear-to-b hover:to-violet-500"
      @click="downloadAndCopyIcon"
    >
      <span v-if="!(iconIsCopiedToClipboard && copySource === 'both')"
        ><i class="fa-solid fa-circle-check"></i> Both</span
      >
      <span v-else><i class="fa-solid fa-check"></i> Copied</span>
    </button>
    <button
      type="button"
      class="mb-2 w-full cursor-pointer rounded-r-lg bg-linear-to-r from-blue-500 to-purple-500 px-2 py-2.5 text-center text-sm font-medium whitespace-nowrap text-white hover:to-pink-500"
      @click="copyOnly"
    >
      <span v-if="!(iconIsCopiedToClipboard && copySource === 'copy')"
        ><i class="fa-solid fa-copy"></i> Copy</span
      >
      <span v-else><i class="fa-solid fa-check"></i> Copied</span>
    </button>
  </div>
</template>
