<template>
  <a
    href="https://github.com/sebinside/StreamAwesome"
    target="_blank"
    class="btn btn-primary float-right text-sm"
  >
    <button
      class="github-button me-2 w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-cyan-300 dark:focus:ring-cyan-800"
    >
      <i class="fa-brands fa-github"></i><span class="github-text"></span>
    </button>
  </a>
</template>

<style scoped>
.github-text::after {
  content: 'View on GitHub';
}

.github-button:hover .github-text::after {
  content: 'Vue on GitHub';
}

.github-button {
  width: 12em;
  height: 2.5em;
  margin: 0;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fa-github {
  font-size: 1.5em;
  margin-right: 0.3em;
}
</style>
