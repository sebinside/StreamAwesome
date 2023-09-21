import './style.css'
import '../public/fonts/fontawesome/css/all.min.css'
import '../public/fonts/fontawesome/css/sharp-light.min.css'
import '../public/fonts/fontawesome/css/sharp-regular.min.css'
import '../public/fonts/fontawesome/css/sharp-solid.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
