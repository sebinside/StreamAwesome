<script setup lang="ts">
import type { Icon } from '@/model/icon'
import IconGenerator from '@/logic/generator'
import { onMounted, ref, watch } from 'vue'
import { useFontsStatusStore } from '@/stores/fontStatus'

const fontStatustore = useFontsStatusStore()
const iconCanvas = ref<HTMLCanvasElement | null>(null)
const props = defineProps({
  icon: {
    type: Object as () => Icon
  }
})

onMounted(() => {
  waitForRequiredInitialization(createGenerator)
})

function waitForRequiredInitialization(callback: () => void) {
  if (iconCanvas.value) {
    if (fontStatustore.fontsLoaded) {
      callback()
    } else {
      fontStatustore.$subscribe((_, state) => {
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
</script>

<template>
  <canvas
    ref="iconCanvas"
    id="symbol"
    width="256"
    height="256"
    class="rounded-3xl border border-cyan-500"
  ></canvas>
</template>
@/stores/fontStatus
