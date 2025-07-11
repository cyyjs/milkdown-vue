import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import libCss from 'vite-plugin-libcss'
const isBuildExample = !!process.env.EXAMPLE

export default defineConfig({
  base: isBuildExample ? '/milkdown-vue' : '/',
  plugins: [
    vue(),
    libCss(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), 'src/components/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  build: isBuildExample
    ? {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            // 文件不生成 hash
            if (/\.(otf|ttf|woff|woff2|eot)$/.test(assetInfo.name)) {
              return 'assets/fonts/[name].[ext]'
            }
            // 其他资源保持默认的 hash 命名
            return '[name]-[hash].[ext]'
          },
          manualChunks: (id) => {
            if (id.includes('lodash-es')) {
              return 'lodash-es'
            }
          },
        }
      },
    }
    : {
      lib: {
        entry: fileURLToPath(new URL('./src/components/index.js', import.meta.url)),
        name: 'milkdown',
        formats: ['esm'],
        fileName: (format) => `milkdown.${format}.js`
      },
      rollupOptions: {
        external: ['vue', 'mermaid', 'katex'],
        output: {
          globals: {
            vue: 'Vue'
          },
          manualChunks: (id) => {
            if (id.includes('@codemirror/legacy-modes')) {
              return 'codemirror-legacy-modes'
            }
          }
        }
      }
    }
})
