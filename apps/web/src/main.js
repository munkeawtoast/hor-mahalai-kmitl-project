import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'


const app = createApp(App)
library.add(fas, far, fab)

// https://stackoverflow.com/questions/66389974/using-font-awesome-in-vue-3
// app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

app.mount('#app')
