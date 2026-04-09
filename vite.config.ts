import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/agentation": {
        target: "http://localhost:4747",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/agentation/, ""),
      },
    },
  },
})
