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
    //- button.preview-toggle-button(
    //-   v-if="preview"
    //-   @click="previewOnlyMode = !previewOnlyMode"
    //- )
    //-   Icon(:icon="config.previewToggleButton(previewOnlyMode)")
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
import { ref, computed, onMounted } from 'vue'

import Icon from '../../../__internal__/components/icon.vue'
import CopyButton from './copy-button.vue'
import LanguagePicker from './language-picker.vue'
import PreviewPanel from './preview-panel.vue'

const props = defineProps({
  text: {
    type: Object,
    required: true
  },
  selected: {
    type: Object,
    required: true
  },
  getReadOnly: {
    type: Function,
    required: true
  },
  codemirror: {
    type: Object,
    required: true
  },
  language: {
    type: Object,
    required: true
  },
  getAllLanguages: {
    type: Function,
    required: true
  },
  setLanguage: {
    type: Function,
    required: true
  },
  config: {
    type: Object,
    required: true
  }
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
  const text = (props.text.value).trim()
  if (!text) return ''
  const language = props.language.value
  return props.config.renderPreview(language, text)
})

const empty = () => { }
</script>
<style lang="less" scoped>
.tools {
  display: flex;
  justify-content: right;
  align-items: center;
  flex-direction: row-reverse;
  padding: 10px;
  height: 20px;
  background-color: var(--cyyjs-menu-bg);
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;

  &::before {
    content: ' ';
    background-image: url('../../../../icons/mac-sign.svg');
    background-repeat: no-repeat;
    display: block;
    width: 45px;
    height: 16px;
    position: absolute;
    left: 10px;
  }

  .tools-button-group {
    // position: absolute;
    transition: all 0.2s ease-in-out;
    opacity: 0;
    right: 10px;
    top: 30px;
    display: flex;
    align-items: center;
    gap: 1px;
    z-index: 1;

    button {
      font-size: 12px;
      padding: 4px 6px;
      height: 24px;
      border: 0;
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      gap: 2px;

      :deep(.milkdown-icon) {
        height: 16px;
      }

      &:hover {
        background-color: #fff;
      }

      &:first-child {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
      }

      &:last-child {
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
      }
    }
  }
}

.codemirror-host {
  background: var(--cyyjs-bg-2);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  overflow: hidden;
}
</style>
