import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import libCss from 'vite-plugin-libcss';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    libCss()
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/Milkdown.vue'),
      name: 'milkdown',
      fileName: (format) => `milkdown.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
