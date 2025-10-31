import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/poker-lessons-web/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  }
})
