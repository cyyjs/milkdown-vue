import { cursor as cursorPlugin, dropCursorConfig } from '@milkdown/kit/plugin/cursor'
import { $prose } from '@milkdown/kit/utils'
import { createVirtualCursor } from 'prosemirror-virtual-cursor'

// import { crepeFeatureConfig } from '../../core/slice'
// import { CrepeFeature } from '../index'

export default (editor, config) => {
  editor
    // .config(crepeFeatureConfig(CrepeFeature.Cursor))
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
