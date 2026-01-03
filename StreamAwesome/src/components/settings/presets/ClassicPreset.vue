<script setup lang="ts">
import { ref } from 'vue'
import type { CustomIcon, FontAwesomePreset } from '@/model/customIcon'

const props = defineProps<{
  icon: CustomIcon<FontAwesomePreset>
}>()

const currentIcon = ref(props.icon ?? ({} as CustomIcon<FontAwesomePreset>))
if (currentIcon.value.presetSettings.preset !== 'Classic') {
  applyDefaultSettings()
}

function applyDefaultSettings() {
  currentIcon.value.presetSettings = {
    preset: 'Classic',
    hue: 217
  }
  currentIcon.value.fontAwesomeIcon.style = 'solid'
  currentIcon.value.fontAwesomeIcon.family = 'classic'
}

const currentHue = ref((currentIcon.value as CustomIcon<'Classic'>).presetSettings.hue)
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
    class="selector focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
    v-model.number="(currentIcon as CustomIcon<'Classic'>).presetSettings.hue"
    @input="currentHue = (currentIcon as CustomIcon<'Classic'>).presetSettings.hue"
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

#hueSelector::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 9999px;
  background-color: hsl(v-bind('currentHue'), 72%, 56%);
  border: 2px solid white;
  box-shadow: 0 0 0 2px rgba(0,0,0,.15);
}

/* ---------- Firefox only ---------- */
#hueSelector::-moz-range-track {
  height: 8px;
  background: transparent;
  border: none;
}
#hueSelector::-moz-range-progress {
  height: 8px;
  background: transparent;
}
#hueSelector::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border-radius: 9999px;
  background: hsl(v-bind('currentHue'), 72%, 56%);
  border: 2px solid white;
  box-shadow: 0 0 0 2px rgba(0,0,0,.15);
}
</style>
