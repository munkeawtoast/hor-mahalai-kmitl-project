import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCity } from '@fortawesome/free-solid-svg-icons'


const app = createApp(App)
library.add(faCity)

// https://stackoverflow.com/questions/66389974/using-font-awesome-in-vue-3
// app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(createPinia())

app.mount('#app')
