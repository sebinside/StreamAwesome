<script setup lang="ts">
import type Icon from '@/model/icon'
import IconGenerator from '@/logic/generator'
import { onMounted, ref, watch } from 'vue'
import { useFontsInfoStore } from '@/stores/fontsInfo'

const fontsInfoStore = useFontsInfoStore()
const iconCanvas = ref<HTMLCanvasElement | null>(null)
const props = defineProps({
  icon: {
    type: Object as () => Icon
  }
})

onMounted(() => {
  if (iconCanvas.value) {
    if (fontsInfoStore.fontsLoaded) {
      callGenerator()
    } else {
      fontsInfoStore.$subscribe((_, state) => {
        if (state.fontsLoaded) {
          callGenerator()
        }
      })
    }
  }
})

function callGenerator() {
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
  <p>Recevied {{ icon?.symbol || 'no icon' }}</p>
  <button @click="callGenerator">Generate icon</button>
</template>
