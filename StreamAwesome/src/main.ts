import './style.css'

import { fontAwesomeVersionInfo, setFontAwesomeLicense } from '@/model/versions'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
;(async () => {
  await loadFontAwesomeStyles()

  const app = createApp(App)

  app.use(createPinia())
  app.use(router)

  app.mount('#app')
})()

async function loadFontAwesomeStyles() {
  const freeStyles = import.meta.glob([
    '../fonts/fontawesome/css/all.min.css',
    '../fonts/fontawesome/css/regular.min.css',
    '../fonts/fontawesome/css/solid.min.css',
    '../fonts/fontawesome/css/brands.min.css'
  ])

  await Promise.all(Object.values(freeStyles).map(importModule => importModule()))

  if (fontAwesomeVersionInfo.fontLicense === 'Pro') {
    const proStyles = import.meta.glob([
      '../fonts/fontawesome/css/sharp-light.min.css',
      '../fonts/fontawesome/css/sharp-thin.min.css',
      '../fonts/fontawesome/css/sharp-regular.min.css',
      '../fonts/fontawesome/css/sharp-solid.min.css',
      '../fonts/fontawesome/css/sharp-duotone-solid.min.css'
    ])

    if (Object.keys(proStyles).length > 0) {
      await Promise.all(Object.values(proStyles).map(importModule => importModule()))
    } else {
      console.error('Failed to load one or more styles, this is most likely because you are using the free version of Font Awesome. This can be avoided by changing the font license from `Free` to `Pro` in `versions.ts`')
      console.info('Changing font license to `Free`.')
      setFontAwesomeLicense('Free')
    }
  }
}
