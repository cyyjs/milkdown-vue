import { editorViewOptionsCtx } from '@milkdown/kit/core'

import './code.css'
import './style.css'

export function nord(ctx) {
  ctx.update(editorViewOptionsCtx, (prev) => {
    const prevClass = prev.attributes
    console.log(prev)
    return {
      ...prev,
      attributes: (state) => {
        const attrs = typeof prevClass === 'function' ? prevClass(state) : prevClass
        console.log(attrs)
        const className = ['prose dark:prose-invert outline-none']
        if (attrs?.class) {
          className.push(attrs?.class)
        }
        className.push('milkdown-theme-nord')
        return {
          ...attrs,
          class: className.join(' ')
        }
      }
    }
  })
}
