import { editorViewCtx } from '@milkdown/kit/core'

export const createSaveKeymap = (emit, doc) => ({
  CustomCommand: {
    shortcuts: ['Mod-s'],
    command: (ctx) => () => {
      emit('save', doc.value)
      return true
    }
  }
})

export const createChangeViewKeymap = (emit) => ({
  CustomCommand: {
    shortcuts: ['Mod-/'],
    command: (ctx) => () => {
      const selection = ctx.get(editorViewCtx).state.selection
      emit('switch-editor', {
        type: 'code',
        selection: { from: selection.from, to: selection.to }
      })
      return true
    }
  }
})
