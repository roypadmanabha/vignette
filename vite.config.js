import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/vignette/',
  plugins: [react()],
  server: {
    port: 6000,
    host: true,
  },
})
