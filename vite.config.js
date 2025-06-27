import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// import tailwindcss from '@tailwindcss/vite'
// import libCss from 'vite-plugin-libcss'
const isBuildExample = !!process.env.EXAMPLE

export default defineConfig({
  base: isBuildExample ? '/milkdown-vue' : '/',
  plugins: [
    vue(),
    // tailwindcss(),
    // libCss()
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), 'src/components/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    })
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
