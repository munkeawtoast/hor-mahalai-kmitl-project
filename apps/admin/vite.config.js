import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '~assets/*': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '~router/*': fileURLToPath(new URL('./src/routers', import.meta.url)),
      '~utils/*': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '~components/*': fileURLToPath(
        new URL('./src/components', import.meta.url),
      ),
      '~views/*': fileURLToPath(new URL('./src/views', import.meta.url)),
    },
  },
})
