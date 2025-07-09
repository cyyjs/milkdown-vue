/*
 * @Author: cyy
 * @Date: 2025-06-30 10:38:00
 * @LastEditors: cyy
 * @LastEditTime: 2025-07-09 17:05:26
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
import { mermaid as codemirrorLangMermaid } from 'codemirror-lang-mermaid'
import { blockLatexSchema } from './block-latex'
import { mathInlineSchema } from './inline-latex'
import { toggleLatexCommand } from './command'
import { mathBlockInputRule, mathInlineInputRule } from './input-rule'
import { remarkMathBlockPlugin, remarkMathPlugin } from './remark'
import { inlineLatexTooltip } from './inline-tooltip/tooltip'
import { LatexInlineTooltip } from './inline-tooltip/view'
import copyIcon from '../../icons/copy.svg?raw'
import editIcon from '../../icons/edit.svg?raw'
import visibilityOfIcon from '../../icons/visibility-off.svg?raw'

// import 'katex/dist/katex.min.css';
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#7ce2ca',
    pieOuterStrokeWidth: '1px'
  }
})

export default (editor, config = {}) => {
  const extensions = [basicSetup, keymap.of([...defaultKeymap, indentWithTab])]
  if (config.dark) {
    extensions.push(oneDark)
  }
  editor
    .config((ctx) => {
      ctx.update(codeBlockConfig.key, (defaultConfig) => ({
        ...defaultConfig,
        expandIcon,
        searchIcon: null,
        clearSearchIcon,
        copyIcon: copyIcon,
        copyText: '复制',
        searchPlaceholder: '搜索',
        noResultText: '没有找到',
        previewLabel: '预览',
        languages: [
          ...languages,
          LanguageDescription.of({
            name: 'Mermaid',
            extensions: ['mermaid'],
            load() {
              return Promise.resolve(codemirrorLangMermaid())
            }
          })
        ],
        extensions,
        onCopy: (text) => {
          if (typeof config.onCopy === 'function') {
            config.onCopy(text)
          }
        },
        renderLanguage: (language, selected) => (selected ? `✔ ${language}` : language),
        previewToggleButton: (previewOnlyMode) =>
          previewOnlyMode ? `${editIcon} 编辑` : `${visibilityOfIcon} 隐藏`,
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
              displayMode: true
            })
          }
          return null
        }
      }))
      ctx.set(inlineLatexTooltip.key, {
        view: (view) => {
          return new LatexInlineTooltip(ctx, view, config)
        }
      })
    })
    .use(remarkMathPlugin)
    .use(remarkMathBlockPlugin)
    .use(mathInlineSchema)
    .use(inlineLatexTooltip)
    .use(blockLatexSchema)
    .use(mathInlineInputRule)
    .use(mathBlockInputRule)
    .use(codeBlockComponent)
    .use(toggleLatexCommand)
}
