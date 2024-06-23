<script setup lang="ts">
import { reactive, ref } from 'vue'
import chroma from 'chroma-js'
import type { CustomIcon, ColorValue } from '@/model/customIcon'

const props = defineProps({
  icon: {
    type: Object as () => CustomIcon
  }
})

const currentIcon = reactive(props.icon ?? ({} as CustomIcon))
const color = chroma(props.icon?.foregroundColor ?? '#000000')
const currentHue = ref(color.hsl()[0])

function updateColorValue(param: ColorValue) {
  if (!param.value) return

  const foregroundColor = chroma(currentIcon.foregroundColor)
  currentIcon.foregroundColor = foregroundColor.set('hsl.' + param.key, param.value).hex()
  currentIcon.backgroundColor = chroma(currentIcon.foregroundColor).darken(4.15).hex()
}
</script>

<template>
  <label for="hueSelector" class="block flex-grow text-sm font-medium text-gray-900 dark:text-white"
    >Hue:</label
  >
  <input
    type="range"
    id="hueSelector"
    max="360"
    min="0"
    class="selector focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
    v-model="currentHue"
    @input="() => updateColorValue({ key: 'h', value: currentHue })"
  />
</template>

<style scoped>
.selector {
  display: block;
  height: 1rem;
  width: 100%;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 0.25rem;
  outline: 2px solid transparent;
  outline-offset: 2px;
}

#hueSelector {
  background: linear-gradient(
    90deg,
    hsl(0, 72%, 56%) 0%,
    hsl(60, 72%, 56%) 25%,
    hsl(120, 72%, 56%) 33.3%,
    hsl(240, 72%, 56%) 66.6%,
    hsl(360, 72%, 56%) 100%
  );
}

input[type='range']::-webkit-slider-thumb,
input[type='range']::-moz-range-thumb {
  height: 2rem;
  width: 1rem;
  cursor: grab;
  display: block;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: 2px solid transparent;
  border: none;
  border-radius: 0.25rem;
}

input[type='range']#hueSelector::-webkit-slider-thumb,
input[type='range']#hueSelector::-moz-range-thumb {
  background-color: hsl(v-bind('currentHue'), 72%, 56%);
}
</style>
