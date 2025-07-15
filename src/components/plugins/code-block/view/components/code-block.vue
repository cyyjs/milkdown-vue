<template lang="pug">
.tools
  LanguagePicker(
    :language="language"
    :config="config"
    :setLanguage="setLanguage"
    :getAllLanguages="getAllLanguages"
    :getReadOnly="getReadOnly"
  )
  .tools-button-group
    CopyButton(
      :copyIcon="config.copyIcon"
      :copyText="config.copyText"
      :onCopy="config.onCopy ?? empty"
      :text="text.value"
    )
    button.preview-toggle-button(
      v-if="preview"
      @click="previewOnlyMode = !previewOnlyMode"
    )
      Icon(:icon="config.previewToggleButton(previewOnlyMode)")
.codemirror-host(
  ref="codemirrorHostRef"
  :class="preview && previewOnlyMode && 'hidden'"
)
PreviewPanel(
  :text="text"
  :language="language"
  :config="config"
  :previewOnlyMode="previewOnlyMode"
  :preview="preview"
)
</template>
<script setup>
import { ref, computed, onMounted, } from 'vue'

import Icon from '../../../__internal__/components/icon.vue'
import CopyButton from './copy-button.vue'
import LanguagePicker from './language-picker.vue'
import PreviewPanel from './preview-panel.vue'

const props = defineProps({
  text: {
    type: Object,
    required: true,
  },
  selected: {
    type: Object,
    required: true,
  },
  getReadOnly: {
    type: Function,
    required: true,
  },
  codemirror: {
    type: Object,
    required: true,
  },
  language: {
    type: Object,
    required: true,
  },
  getAllLanguages: {
    type: Function,
    required: true,
  },
  setLanguage: {
    type: Function,
    required: true,
  },
  config: {
    type: Object,
    required: true,
  },
})

const previewOnlyMode = ref(false)
const codemirrorHostRef = ref()

onMounted(() => {
  while (codemirrorHostRef.value?.firstChild) {
    codemirrorHostRef.value.removeChild(codemirrorHostRef.value.firstChild)
  }

  if (codemirrorHostRef.value) {
    codemirrorHostRef.value.appendChild(props.codemirror.dom)
  }
})

const preview = computed(() => {
  const text = props.text.value
  const language = props.language.value
  return props.config.renderPreview(language, text)
})

const empty = () => { }

</script>
<style lang="less" scoped></style>
