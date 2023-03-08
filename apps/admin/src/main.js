import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { Quasar } from 'quasar'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.css'
import '../public/base.css'


const app = createApp(App)

app.use(router)
app.use(Quasar, {
  plugins: {},
  config: {
    brand: {
      primary: '#198a92',
      secondary: '#65bab2',
      accent: '#9C27B0',

      dark: '#1d1d1d',
      'dark-page': '#121212',

      positive: '#21BA45',
      negative: '#C10015',
      info: '#31CCEC',
      warning: '#F2C037',
    },
    // notify: {}, // default set of options for Notify Quasar plugin
    // loading: {...}, // default set of options for Loading Quasar plugin
    // loadingBar: { ... }, // settings for LoadingBar Quasar plugin
    // ..and many more (check Installation card on each Quasar component/directive/plugin)
  },
})

app.mount('#app')
