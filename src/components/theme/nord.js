import { editorViewOptionsCtx } from '@milkdown/core'
import clsx from 'clsx'

import '@milkdown/prose/view/style/prosemirror.css'
import '@milkdown/prose/tables/style/tables.css'
import './code.css'
import './style.css'

export function nord(ctx) {
  ctx.update(editorViewOptionsCtx, (prev) => {
    const prevClass = prev.attributes

    return {
      ...prev,
      attributes: (state) => {
        const attrs = typeof prevClass === 'function' ? prevClass(state) : prevClass

        return {
          ...attrs,
          class: clsx(
            'prose dark:prose-invert outline-none',
            attrs?.class || '',
            'milkdown-theme-nord'
          )
        }
      }
    }
  })
}
