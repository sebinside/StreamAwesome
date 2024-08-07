<script setup lang="ts">
import type { CustomIcon, FontAwesomePreset } from '@/model/customIcon'
import { onMounted, ref, watch } from 'vue'
import { useFontsStatusStore } from '@/stores/fontStatus'
import { getMatchingGenerator } from '@/logic/generator/generators'

const fontStatusStore = useFontsStatusStore()
const iconCanvas = ref<HTMLCanvasElement | null>(null)
const props = defineProps<{
  icon: CustomIcon<FontAwesomePreset>
}>()

onMounted(() => {
  waitForRequiredInitialization(createGenerator)
})

function waitForRequiredInitialization(callback: () => void) {
  if (iconCanvas.value) {
    if (fontStatusStore.fontsLoaded) {
      callback()
    } else {
      fontStatusStore.$subscribe((_, state) => {
        if (state.fontsLoaded) {
          callback()
        }
      })
    }
  }
}

function createGenerator() {
  if (props.icon && iconCanvas.value) {
    triggerGenerator(props.icon, iconCanvas.value)

    watch(props.icon, () => {
      if (props.icon && iconCanvas.value) {
        triggerGenerator(props.icon, iconCanvas.value)
      }
    })
  }
}

function triggerGenerator(icon: CustomIcon<any>, canvas: HTMLCanvasElement) {
  const iconGenerator = getMatchingGenerator(icon, canvas)
  iconGenerator.generateIcon(icon)
}

defineEmits<{
  downloadIcon: []
}>()
</script>

<template>
  <canvas
    ref="iconCanvas"
    id="symbol"
    width="256"
    height="256"
    class="cursor-pointer rounded-3xl border border-cyan-500"
    @click="$emit('downloadIcon')"
  ></canvas>
</template>
