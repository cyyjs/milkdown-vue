import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import libCss from 'vite-plugin-libcss'
const isBuildExample = !!process.env.EXAMPLE

export default defineConfig({
  base: isBuildExample ? '/milkdown-vue' : '/',
  plugins: [
    vue(),
    libCss()
  ],
  build: isBuildExample
    ? {}
    : {
      lib: {
        entry: fileURLToPath(new URL('./src/components/index.js', import.meta.url)),
        name: 'milkdown',
        formats: ['esm'],
        fileName: (format) => `milkdown.${format}.js`
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      }
    }
})
