import { cursor as cursorPlugin, dropCursorConfig } from '@milkdown/kit/plugin/cursor'
import { $prose } from '@milkdown/kit/utils'
import { createVirtualCursor } from 'prosemirror-virtual-cursor'

export default (editor, config) => {
  editor
    .config((ctx) => {
      ctx.update(dropCursorConfig.key, () => ({
        class: 'crepe-drop-cursor',
        width: config?.width ?? 4,
        color: config?.color ?? '#00987488'
      }))
    })
    .use(cursorPlugin)

  if (config?.virtual === false) {
    return
  }

  const virtualCursor = createVirtualCursor()
  editor.use($prose(() => virtualCursor))
}
