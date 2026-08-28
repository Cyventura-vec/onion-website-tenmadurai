import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../html/dist',
    emptyOutDir: true,
  },
  base: '/dist/', // So assets are loaded from /dist/...
})
