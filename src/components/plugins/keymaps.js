import { editorViewCtx, rootCtx } from '@milkdown/kit/core'
import { $useKeymap, getMarkdown } from '@milkdown/kit/utils'

export const createSaveKeymap = (fn) => ({
  CustomCommand: {
    shortcuts: ['Mod-s'],
    command: (ctx) => () => {
      fn()
      return true
    }
  }
})

export const createChangeViewKeymap = (fn) => ({
  CustomCommand: {
    shortcuts: ['Mod-/'],
    command: (ctx) => () => {
      const selection = ctx.get(editorViewCtx).state.selection
      fn({
        type: 'code',
        selection: { from: selection.from, to: selection.to }
      })
      return true
    }
  }
})

export default (editor, { save = () => {}, changeView = () => {} }) => {
  const saveKeymap = $useKeymap('saveKeymap', createSaveKeymap(save))
  const changeViewKeymap = $useKeymap('changeViewKeymap', createChangeViewKeymap(changeView))
  editor.use(changeViewKeymap).use(saveKeymap)
}
