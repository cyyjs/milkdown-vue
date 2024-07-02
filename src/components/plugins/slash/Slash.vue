<template lang="pug">
div.slash(ref='divRef')
  button(@mousedown.prevent='addCodeBlock') Code Block
    
</template>
<script setup>
import { editorViewCtx } from '@milkdown/core'
import { SlashProvider } from '@milkdown/plugin-slash'
import { createCodeBlockCommand } from '@milkdown/preset-commonmark'
import { callCommand } from '@milkdown/utils'
import { useInstance } from '@milkdown/vue'
import { usePluginViewContext } from '@prosemirror-adapter/vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const { view, prevState } = usePluginViewContext()
const [loading, get] = useInstance()

const divRef = ref()

let tooltipProvider

onMounted(() => {
  tooltipProvider = new SlashProvider({
    content: divRef.value
  })

  tooltipProvider.update(view.value, prevState.value)
})

watch([view, prevState], () => {
  tooltipProvider?.update(view.value, prevState.value)
})

onUnmounted(() => {
  tooltipProvider.destroy()
})

const addCodeBlock = (e) => {
  if (loading.value) return
  get().action((ctx) => {
    const view = ctx.get(editorViewCtx)
    const { dispatch, state } = view
    const { tr, selection } = state
    const { from } = selection
    dispatch(tr.deleteRange(from - 1, from))
    return callCommand(createCodeBlockCommand.key)(ctx)
  })
}
</script>
<style lang="less" scoped>
.slash {
  position: absolute;
  display: none;
  background-color: #fff;

  &[data-show='true'] {
    display: block;
  }

  button {
    @apply text-gray-600 bg-slate-200 px-2 py-1 rounded-lg hover:bg-slate-300 border hover:text-gray-900;
  }
}
</style>
