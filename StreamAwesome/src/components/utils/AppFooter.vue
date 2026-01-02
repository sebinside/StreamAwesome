<script setup lang="ts">
import { fontAwesomeVersionInfo } from '@/model/fontAwesomeInfo'
</script>

<template>
  <footer class="m-auto mb-5 max-w-4xl text-center text-sm text-gray-400">
    <a
      class="hover:text-blue-500"
      href="https://github.com/sebinside/StreamAwesome"
      target="_blank"
    >
      <i class="fa-brands fa-github"></i> Open-source software
    </a>
    by
    <a class="hover:text-blue-500" href="https://github.com/sebinside" target="_blank"
      ><i class="fa-solid fa-graduation-cap ml-1"></i> sebinside & community</a
    >
    using
    <a class="hover:text-blue-500" href="https://fontawesome.com" target="_blank"
      ><i class="fa-solid fa-font-awesome ml-1"></i> Font Awesome
      {{ fontAwesomeVersionInfo.fontVersion }} {{ fontAwesomeVersionInfo.fontLicense }}</a
    >.
    <a class="cursor-default" href="https://skate702.de/impressum.html" target="_blank">Imprint.</a>
  </footer>
</template>
