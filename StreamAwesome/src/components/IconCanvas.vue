<script setup lang="ts">
import type { CustomIcon } from '@/model/customIcon'
import IconGenerator from '@/logic/generator'
import { onMounted, ref, watch } from 'vue'
import { useFontsStatusStore } from '@/stores/fontStatus'

const fontStatusStore = useFontsStatusStore()
const iconCanvas = ref<HTMLCanvasElement | null>(null)
const props = defineProps({
  icon: {
    type: Object as () => CustomIcon
  }
})

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
    const iconGenerator = new IconGenerator(iconCanvas.value)
    iconGenerator.generateIcon(props.icon)

    watch(props.icon, () => {
      if (props.icon) {
        iconGenerator.generateIcon(props.icon)
      }
    })
  }
}

defineEmits(['downloadIcon'])
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
