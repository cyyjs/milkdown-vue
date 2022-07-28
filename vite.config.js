import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import libCss from 'vite-plugin-libcss'
import vueJsx from '@vitejs/plugin-vue-jsx'
const isBuildDemo = !!process.env.DEMO

export default defineConfig({
  base: isBuildDemo ? '/milkdown-vue' : '/',
  plugins: [
    vue(),
    libCss(),
    vueJsx({
      include: /\.js$/
    })
  ],
  build: isBuildDemo
    ? {}
    : {
        lib: {
          entry: path.resolve(__dirname, 'src/components/index.js'),
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
