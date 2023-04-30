import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

console.log(fileURLToPath(new URL('./src/assets/', import.meta.url)))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 4000,
  },
  preview: {
    port: 4000,
  },
  build: {
    outDir: './out',
  },
  resolve: {
    alias: {},
  },
})
