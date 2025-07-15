import { Plugin, PluginKey } from '@milkdown/kit/prose/state'
import { Decoration, DecorationSet } from '@milkdown/kit/prose/view'
import { $prose } from '@milkdown/kit/utils'
import { editorViewCtx } from '@milkdown/kit/core'

function createBlockFocusDecoration(state) {
  const { selection } = state
  const $pos = selection.$anchor
  const node = $pos.parent

  const before = $pos.before()

  return Decoration.node(before, before + node.nodeSize, {
    class: 'block-focus'
  })
}

export default $prose((ctx) => {
  return new Plugin({
    key: new PluginKey('BLOCK_FOCUS'),
    props: {
      decorations: (state) => {
        if (!ctx.get(editorViewCtx).editable) return null
        const deco = createBlockFocusDecoration(state)
        return DecorationSet.create(state.doc, [deco])
      }
    }
  })
})
