import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        // target: "http://192.168.208.80:4000",
        changeOrigin: true,
        secure: false,
      },
    },
    host:"0.0.0.0",
    port:5173,
  },
})
