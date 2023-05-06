import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


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
