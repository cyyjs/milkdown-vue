<!--
 * @Author: cyy
 * @Date: 2024-06-03 18:38:34
 * @LastEditors: cyy
 * @LastEditTime: 2025-06-30 15:35:58
 * @Description: 
-->
<template lang="pug">
Milkdown(:class="dark ? 'dark' : 'light'")
</template>

<script setup>
import { watch } from 'vue'
import {
  Editor,
  rootCtx,
  defaultValueCtx,
  editorViewCtx,
  editorViewOptionsCtx
} from '@milkdown/kit/core'
import { Milkdown, useEditor } from '@milkdown/vue'
import { commonmark } from '@milkdown/kit/preset/commonmark'
import { gfm } from '@milkdown/kit/preset/gfm'
import { getHTML, outline, replaceAll, getMarkdown, forceUpdate, $useKeymap } from '@milkdown/kit/utils'
import { listener, listenerCtx } from '@milkdown/kit/plugin/listener'
import { TextSelection } from '@milkdown/kit/prose/state'

import { imageBlockComponent } from '@milkdown/kit/component/image-block'
import useCodeBlock from './plugins/code/index'
import { createSaveKeymap, createChangeViewKeymap } from './plugins/keymaps';
// import useTooltip from './plugins/tooltip/index'
// import useSlash from './plugins/slash/index'
const emit = defineEmits(['change', 'switch-editor', 'save'])
const doc = defineModel({ type: String })
const props = defineProps({
  config: {
    type: Object,
    default: () => ({
      theme: 'auto'
    })
  },
  dark: {
    type: Boolean,
    default: false
  },
  uploader: {
    type: Function,
    default: () => { }
  }
})
let editorInstance
// const { tooltip, setTooltip } = useTooltip()
// const { slash, setSlash } = useSlash()
const { codeBlock, setCodeBlock } = useCodeBlock()
const saveKeymap = $useKeymap('saveKeymap', createSaveKeymap(emit, doc));
const changeViewKeymap = $useKeymap('changeViewKeymap', createChangeViewKeymap(emit));
useEditor((root) => {
  editorInstance = Editor.make()
    .config((ctx) => {
      ctx.update(editorViewOptionsCtx, (prev) => ({
        ...prev,
        editable: () => !props.config.readonly
      }))
      ctx.set(rootCtx, root)
      ctx.set(defaultValueCtx, doc.value)
      ctx.get(listenerCtx).markdownUpdated((ctx, markdown) => {
        emit('change', markdown)
      })
      setCodeBlock(ctx, {
        dark: props.dark
      })
      // setTooltip(ctx)
      // setSlash(ctx)
    })
    .use(commonmark)
    .use(listener)
    .use(saveKeymap)
    .use(changeViewKeymap)
    .use(gfm)
    .use(codeBlock)
    .use(imageBlockComponent)
  // .use(tooltip)
  // .use(slash)
  return editorInstance
})
watch(
  () => doc.value,
  (md) => {
    editorInstance.action(replaceAll(md))
  }
)

const focus = (to) => {
  if (!editorInstance) return
  const view = editorInstance.ctx.get(editorViewCtx)
  view.focus()
  const tr = view.state.tr
  tr.setSelection(TextSelection.create(tr.doc, to || 0))
  view.dispatch(tr)
}

defineExpose({
  editorInstance,
  focus,
  setValue: (md) => editorInstance.action(replaceAll(md)),
  getMarkdown: () => editorInstance.action(getMarkdown()),
  getHtml: () => editorInstance.action(getHTML()),
  getOutline: () => editorInstance.action(outline())
})
</script>
