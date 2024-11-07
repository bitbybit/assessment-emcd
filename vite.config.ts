import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

export default {
  plugins: [vue(), UnoCSS()],

  resolve: {
    alias: {
      src: resolve(import.meta.dirname, './src')
    }
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern'
      }
    }
  }
}
