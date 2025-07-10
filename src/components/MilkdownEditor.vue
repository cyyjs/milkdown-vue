<!--
 * @Author: cyy
 * @Date: 2024-06-03 18:38:34
 * @LastEditors: cyy
 * @LastEditTime: 2025-07-10 15:59:58
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
import { getHTML, outline, replaceAll, getMarkdown } from '@milkdown/kit/utils'
import { listener, listenerCtx } from '@milkdown/kit/plugin/listener'
import { TextSelection } from '@milkdown/kit/prose/state'

import useCodeBlock from './plugins/code/index'
import useLinkTooltip from './plugins/linkTooltip'
import usePlaceholder from './plugins/placeholder/index'
import useToolbar from './plugins/toolbar/index'
import useTable from './plugins/table/index'
import useImage from './plugins/image'
import useKeymaps from './plugins/keymaps'
// import useSlash from './plugins/slash/index'
const emit = defineEmits(['change', 'switch-editor', 'save', 'copy'])
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
    default: () => {}
  }
})
let currentDoc = ''
let editorInstance
// const { slash, setSlash } = useSlash()
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
        doc.value = markdown
        currentDoc = markdown
        // emit('change', markdown)
      })

      // setSlash(ctx)
    })
    .use(commonmark)
    .use(listener)
    .use(gfm)
    // .use(imageInlineComponent)
    // .use(imageBlockComponent)
  // .use(slash)
  useKeymaps(editorInstance, {
    save: () => {
      emit('save', doc.value)
    },
    changeView: (v) => {
      emit('switch-editor', v)
    }
  })
  useCodeBlock(editorInstance, {
    dark: props.dark,
    onCopy: (text) => {
      emit('copy', text)
    }
  })
  useLinkTooltip(editorInstance, {
    dark: props.dark,
    onCopy: (text) => {
      emit('copy', text)
    }
  })
  usePlaceholder(editorInstance, { text: props.config.placeholder })
  useTable(editorInstance, { text: props.config })
  useToolbar(editorInstance, props.config)
  useImage(editorInstance, {
    onUpload: props.uploader
  })
  return editorInstance
})

const focus = (to) => {
  if (!editorInstance) return
  const view = editorInstance.ctx.get(editorViewCtx)
  view.focus()
  const tr = view.state.tr
  tr.setSelection(TextSelection.create(tr.doc, to || 0))
  view.dispatch(tr)
}

watch(
  () => doc.value,
  (md) => {
    if (md === currentDoc) return
    editorInstance.action(replaceAll(md))
  }
)

defineExpose({
  editorInstance,
  focus,
  setValue: (md) => editorInstance.action(replaceAll(md)),
  getMarkdown: () => editorInstance.action(getMarkdown()),
  getHtml: () => editorInstance.action(getHTML()),
  getOutline: () => editorInstance.action(outline())
})
</script>
