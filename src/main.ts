import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import '@/style.css'
import App from '@/App.vue'
import Aura from '@primeuix/themes/aura'
import { ToastService, Tooltip } from 'primevue'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue',
      },
    },
  },
})
app.use(ToastService)
app.directive('tooltip', Tooltip)
app.mount('#app')
