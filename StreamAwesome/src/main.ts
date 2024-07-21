import './style.css'

import { fontAwesomeVersionInfo, setFontAwesomeLicense } from '@/model/versions'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
;(async () => {
  try {
    await loadFontAwesomeStyles()
  } catch (error) {
    console.error(
      'Failed to load one or more styles, this is most likely because you are using the free version of Font Awesome. This can be avoided by changing the font license from `Free` to `Pro` in `versions.ts`:',
      error
    )
    console.info('Changing font license to `Free`.')
    setFontAwesomeLicense('Free')
  }

  const app = createApp(App)

  app.use(createPinia())
  app.use(router)

  app.mount('#app')
})()

async function loadFontAwesomeStyles() {
  import('../fonts/fontawesome/css/all.min.css')
  import('../fonts/fontawesome/css/regular.min.css')
  import('../fonts/fontawesome/css/solid.min.css')
  import('../fonts/fontawesome/css/brands.min.css')

  if (fontAwesomeVersionInfo.fontLicense === 'Pro') {
    // Needs to be in an array to avoid static analysis
    const proStyles = [
      '../fonts/fontawesome/css/sharp-light.min.css',
      '../fonts/fontawesome/css/sharp-thin.min.css',
      '../fonts/fontawesome/css/sharp-regular.min.css',
      '../fonts/fontawesome/css/sharp-solid.min.css'
    ]

    for (const style of proStyles) {
      await new Function(`return import("${style}")`)()
    }
  }
}
