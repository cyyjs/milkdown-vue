// 获取当前文件夹下的所有svg文件
// 在 ESM 环境下，require.context 不可用，若使用 Webpack，可使用 import.meta.glob 替代
const svgFiles = import.meta.glob('./*.svg', { eager: true, query: '?raw' })

// 将下划线转为小驼峰
function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (match, p1) => p1.toUpperCase())
}

const icons = Object.fromEntries(
  Object.keys(svgFiles).map((path) => {
    const name = path.replace('./', '').replace('.svg', '')
    return [toCamelCase(name) + 'Icon', svgFiles[path].default]
  })
)

export default icons
