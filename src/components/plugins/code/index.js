/*
 * @Author: cyy
 * @Date: 2025-06-30 10:38:00
 * @LastEditors: cyy
 * @LastEditTime: 2025-07-01 13:45:00
 * @Description:
 */
import { defaultKeymap, indentWithTab } from '@codemirror/commands'
import { LanguageDescription } from '@codemirror/language'
import { languages } from '@codemirror/language-data'
import { oneDark } from '@codemirror/theme-one-dark'
import { keymap } from '@codemirror/view'
import { codeBlockComponent, codeBlockConfig } from '@milkdown/kit/component/code-block'
import { basicSetup } from 'codemirror'
import expandIcon from '../../icons/down.svg?raw'
import clearSearchIcon from '../../icons/clear.svg?raw'
import mermaid from 'mermaid'
import katex from 'katex'

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#00987444',
    pieOuterStrokeWidth: '1px'
  }
})

export default () => {
  const setCodeBlock = (ctx, { dark } = {}) => {
    const extensions = [basicSetup, keymap.of([...defaultKeymap, indentWithTab])]
    if (dark) {
      extensions.push(oneDark)
    }
    ctx.update(codeBlockConfig.key, (defaultConfig) => ({
      ...defaultConfig,
      expandIcon,
      searchIcon: null,
      clearSearchIcon,
      copyIcon: '📄',
      copyText: '复制代码',
      searchPlaceholder: '搜索',
      noResultText: '没有找到',
      previewLabel: '预览',
      languages: [
        ...languages,
        LanguageDescription.of({
          name: 'Mermaid',
          extensions: ['mermaid'],
          load() {
            return import('codemirror-lang-mermaid').then(m => m.mermaid())
          }
        }),
      ],
      extensions,
      onCopy: (text) => {
        alert('Copied: ' + text)
      },
      renderLanguage: (language, selected) => (selected ? `✔ ${language}` : language),
      previewToggleButton: (previewOnlyMode) => (previewOnlyMode ? '编辑' : '预览'),
      renderPreview: (language, content) => {
        const lang = language.toLowerCase()
        if (lang === 'mermaid' && content.length > 0) {
          const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`
          // 创建图表容器
          const container = document.createElement('div')
          container.id = id
          container.className = 'mermaid'
          container.textContent = content
          requestAnimationFrame(async () => {
            const node = document.getElementById(id)
            try {
              await mermaid.parse(content)
              const { svg } = await mermaid.render(id + '_svg', content)
              node.innerHTML = svg
            } catch (error) {
              node.innerHTML = `<pre style="overflow: auto;color:Red;">${error.message}</pre>`
            }
          })
          return container
        } else if (lang === 'latex') {
          return katex.renderToString(content, {
            throwOnError: false,
            displayMode: true,
          })
        } 
        return null
      }
    }))
  }
  return {
    codeBlock: codeBlockComponent,
    setCodeBlock
  }
}
