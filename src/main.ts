/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify'

const app = createApp(App)

const pinia = createPinia()

app.use(router)
app.use(pinia)    // habilita o Pinia
app.use(vuetify)  // habilita o Vuetify

app.mount('#app')
