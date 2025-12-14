<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'
import type { CustomIcon, FontAwesomePreset } from '@/model/customIcon.ts'
import { PersistenceHandler } from "@/logic/persistence/PersistenceHandler.ts";
import type { PersistentIcon } from "@/logic/persistence/PersistentIcon.ts";

interface IconPreset {
  name: string
  settings: PersistentIcon
  createdAt: string
}

const props = defineProps<{
  icon: CustomIcon<FontAwesomePreset>
}>()

const emit = defineEmits<{
  loadPreset: [preset: PersistentIcon]
}>()

const showSaveDialog = ref(false)
const showLoadDialog = ref(false)
const presetName = ref('')

const savedPresets = useStorage<IconPreset[]>('iconPresets', [])
const presetsList = computed(() => savedPresets.value)

function savePreset() {
  if (!presetName.value.trim()) {
    alert('Enter a preset name')
    return
  }

  const newPreset: IconPreset = {
    name: presetName.value.trim(),
    settings: PersistenceHandler.convertIconToPersistentIcon(props.icon),
    createdAt: new Date().toISOString()
  }

  savedPresets.value = [...savedPresets.value, newPreset]

  showSaveDialog.value = false
  presetName.value = ''
}

function loadPreset(preset: IconPreset) {
  emit('loadPreset', preset.settings)
  showLoadDialog.value = false
}

function deletePreset(index: number) {
  if (confirm('Are you sure you want to delete this preset?')) {
    savedPresets.value.splice(index, 1)
  }
}

function openSaveDialog() {
  showSaveDialog.value = true
  presetName.value = ''
}
</script>

<template>
  <div class="preset-manager flex gap-2">
    <button
        @click="openSaveDialog"
        class="w-full rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
    >
      Save Preset
    </button>

    <button
        :disabled="presetsList.length === 0"
        @click="showLoadDialog = true"
        class="w-full rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
    >
      Load Preset ({{ presetsList.length }})
    </button>

    <div
        v-if="showSaveDialog"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 rounded-lg"
    >
      <div class="rounded bg-gray-800 p-6 shadow-lg">
        <h3 class="mb-4 text-lg font-semibold">Save Icon Preset</h3>
        <input
            v-model="presetName"
            type="text"
            placeholder="Enter preset name..."
            class="mb-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 px-3 py-2"
            @keyup.enter="savePreset"
            @keyup.esc="showSaveDialog = false"
        />
        <div class="flex gap-2">
          <button
              @click="savePreset"
              class="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Save
          </button>
          <button
              @click="showSaveDialog = false"
              class="w-full rounded bg-gray-500 px-4 py-2 hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <div
        v-if="showLoadDialog"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        @keyup.esc="showLoadDialog = false"
    >
      <div class="max-h-[90%] min-w-96 max-w-[80%] overflow-y-auto rounded-lg bg-gray-800 p-6 shadow-lg">
        <h3 class="mb-4 text-lg font-semibold">Load Icon Preset</h3>
        <div class="space-y-2">
          <div
              v-for="(preset, index) in presetsList"
              :key="index"
              class="flex items-center justify-between rounded border p-3 border-gray-600"
          >
            <div>
              <div class="font-medium">{{ preset.name }}</div>
              <div class="text-sm text-gray-500">
                {{ new Date(preset.createdAt).toLocaleString() }}
              </div>
            </div>
            <div class="flex gap-1.5">
              <button
                  @click="loadPreset(preset)"
                  class="rounded bg-green-600 px-2 py-1 text-sm text-white hover:bg-green-700"
              >
                Load
              </button>
              <button
                  @click="deletePreset(index)"
                  class="rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <button
              @click="showLoadDialog = false"
              class="w-full rounded bg-gray-500 px-4 py-2 hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
