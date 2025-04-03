import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Avoid console errors from sanitize-html use of postcss
      // https://github.com/vitejs/vite/issues/9200#issuecomment-1220958604
      url: path.resolve(__dirname, './src/services/empty.ts'),
      path: path.resolve(__dirname, './src/services/empty.ts'),
      fs: path.resolve(__dirname, './src/services/empty.ts'),
      'source-map-js': path.resolve(__dirname, './src/services/empty.ts'),
    },
  },
})
