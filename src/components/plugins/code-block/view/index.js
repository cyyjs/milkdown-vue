import { codeBlockSchema } from '@milkdown/kit/preset/commonmark'
import { $view } from '@milkdown/kit/utils'

import { withMeta } from '../../__internal__/meta'
import { codeBlockConfig } from '../config'
import { LanguageLoader } from './loader'
import { CodeMirrorBlock } from './node-view'

export const codeBlockView = $view( codeBlockSchema.node, (ctx) => {
    const config = ctx.get(codeBlockConfig.key)
    const languageLoader = new LanguageLoader(config.languages)
    return (node, view, getPos) =>
      new CodeMirrorBlock(node, view, getPos, languageLoader, config)
  }
)

withMeta(codeBlockView, {
  displayName: 'NodeView<code-block>',
  group: 'CodeBlock',
})
