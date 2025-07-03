<!--
 * @Author: cyy
 * @Date: 2024-06-03 18:39:43
 * @LastEditors: cyy
 * @LastEditTime: 2025-07-02 17:08:56
 * @Description: 
-->
<template lang="pug">
.cyyjs-mk-box
  MilkdownProvider
    MilkdownEditor(
      v-show="viewType === 'md'"
      ref="editorRef"
      v-model="doc"
      :dark="isDark"
      :config="config"
      :uploader="uploader"
      @change="emit('change', $event)"
      @switchEditor="switchEditor"
      @save="emit('save', $event)"
      @copy="emit('copy', $event)"
    )
  MdEditor(
    ref="codeEditorRef"
    v-show="viewType === 'code'"
    v-model="doc"
    :dark="isDark"
    @switchEditor="switchEditor"
    @save="emit('save', $event)"
  )
</template>

<script setup>
import { ref, nextTick, computed, onMounted, onUnmounted } from 'vue'
import { MilkdownProvider } from '@milkdown/vue'
import MilkdownEditor from './MilkdownEditor.vue'
import MdEditor from './MdEditor.vue'
import './style/main.less'

const doc = defineModel({ type: String })
const props = defineProps({
  config: {
    type: Object,
    default: () => ({
      readonly: false,
      menu: true,
      theme: 'auto'
    })
  },
  uploader: {
    type: Function,
    default: () => () => Promise.resolve('')
  }
})
const emit = defineEmits(['change', 'save', 'copy'])
const viewType = ref('md')
const editorRef = ref(null)
const codeEditorRef = ref(null)
const selection = ref({
  md: 0,
  code: 0
})
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
const systemIsDark = ref(mediaQuery.matches)
const updateTheme = () => {
  systemIsDark.value = mediaQuery.matches
}

const isDark = computed(() => {
  if (props.config.theme !== 'auto') {
    return props.config.theme === 'dark'
  }
  return systemIsDark.value
})

onMounted(() => {
  mediaQuery.addEventListener('change', updateTheme)
  updateTheme() // 初始化
})

onUnmounted(() => {
  mediaQuery.removeEventListener('change', updateTheme)
})

const switchEditor = (obj) => {
  viewType.value = obj.type
  nextTick(() => {
    if (obj.type === 'md') {
      selection.value.code = obj.selection.to
      const to = Math.min(selection.value.md, doc.value.length)
      editorRef.value.focus(to)
    } else {
      selection.value.md = obj.selection.to
      const to = Math.min(selection.value.code, doc.value.length)
      codeEditorRef.value.focus(to)
    }
  })
}

const setValue = (md) => {
  doc.value = md
  editorRef.value.setValue(md)
}

defineExpose({
  setValue,
  getHtml: () => editorRef.value.getHtml(),
  getMarkdown: () => editorRef.value.getMarkdown(),
  getOutline: () => editorRef.value.getOutline(),
  editorInstance: editorRef.value?.editorInstance
})
</script>
