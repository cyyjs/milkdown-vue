<!--
 * @Author: cyy
 * @Date: 2022-07-20 11:58:55
 * @LastEditors: cyy
 * @LastEditTime: 2025-06-27 15:40:00
 * @Description: markdown编辑器
-->
<template lang="pug">
div.md(ref="mdRef")
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { EditorState } from '@codemirror/state'
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap
} from '@codemirror/autocomplete'
import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  rectangularSelection
} from '@codemirror/view'
import {
  bracketMatching,
  defaultHighlightStyle,
  foldGutter,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting
} from '@codemirror/language'
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { markdown } from '@codemirror/lang-markdown'

const data = defineModel({ type: String })
const props = defineProps({
  dark: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['save', 'switch-editor'])
const mdRef = ref(null)
const mdFocus = ref(false)
const baseTheme = EditorView.baseTheme({
  '&.cm-editor.cm-focused': {
    outline: 'none'
  },
  '&light .cm-o-replacement': {
    backgroundColor: '#04c'
  },
  '&dark': {
    color: 'rgba(236, 239, 244, 0.87)',
    backgroundColor: '#2e3440'
  },
  '&dark.ͼ3 .ͼc': {
    color: '#95d3ff'
  },
  '&dark.cm-content': {
    caretColor: '#0e9'
  },
  '&dark.cm-focused .cm-cursor': {
    borderLeftColor: '#074'
  },
  '&dark.cm-focused .cm-selectionBackground, ::selection': {
    backgroundColor: '#252932'
  },
  '&dark.ͼ3 .cm-activeLine': {
    backgroundColor: '#252932'
  },
  '&dark.ͼ3 .cm-gutters': {
    backgroundColor: '#252932',
    color: '#ccc',
    border: 'none'
  }
})
let view
const createState = (doc, dark = false) =>
  EditorState.create({
    doc,
    extensions: [
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightSpecialChars(),
      history(),
      foldGutter(),
      drawSelection(),
      dropCursor(),
      EditorState.allowMultipleSelections.of(true),
      indentOnInput(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      rectangularSelection(),
      crosshairCursor(),
      highlightActiveLine(),
      highlightSelectionMatches(),
      keymap.of([
        {
          key: 'Mod-/',
          run() {
            const selection = view.state.selection
            emit('switch-editor', {
              type: 'md',
              selection: {
                from: selection.main.from,
                to: selection.main.to
              }
            })
            return true
          }
        },
        {
          key: 'Mod-s',
          run() {
            emit('save', data.value)
            return true
          }
        },
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        ...foldKeymap,
        ...completionKeymap
      ]),
      markdown(),
      baseTheme,
      EditorView.theme({}, { dark }),
      EditorView.updateListener.of((v) => {
        if (v.focusChanged) {
          mdFocus.value = v.view.hasFocus
        }
        if (v.docChanged) {
          data.value = v.state.doc.toString()
        }
      })
    ]
  })

onMounted(() => {
  view = new EditorView({
    state: createState(data.value),
    parent: mdRef.value
  })
})
watch([() => data.value, () => props.dark], () => {
  if (!mdFocus.value) {
    view.setState(createState(data.value, props.dark))
  }
})
const focus = (to) => {
  view.focus()
  view.dispatch({
    selection: {
      anchor: to,
      head: to
    }
  })
}
defineExpose({
  focus
})
</script>
