import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/solver': 'http://localhost:3001',
      '/mysql': 'http://localhost:3001'
    }
  }
})

