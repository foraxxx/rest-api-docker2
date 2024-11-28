import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  // server: {
  //   proxy: {
  //     '/api': 'http://localhost:7000', // Перенаправление запросов с клиента
  //   },
  // },
  // server: {
  //   host: true,
  // },
})

