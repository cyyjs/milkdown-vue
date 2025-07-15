<template lang="pug">
button.copy-button(type="button" @click="onCopyCode")
  Icon(:icon="copyIcon")
  | {{copyText}}
</template>
<script setup>
import Icon from '../../../__internal__/components/icon.vue'

async function copyToClipboard(text) {
  try {
    return navigator.clipboard.writeText(text)
  } catch {
    const element = document.createElement('textarea')
    const previouslyFocusedElement = document.activeElement

    element.value = text

    // Prevent keyboard from showing on mobile
    element.setAttribute('readonly', '')

    element.style.contain = 'strict'
    element.style.position = 'absolute'
    element.style.left = '-9999px'
    element.style.fontSize = '12pt' // Prevent zooming on iOS

    const selection = document.getSelection()
    const originalRange = selection
      ? selection.rangeCount > 0 && selection.getRangeAt(0)
      : null

    document.body.appendChild(element)
    element.select()

    // Explicit selection workaround for iOS
    element.selectionStart = 0
    element.selectionEnd = text.length

    document.execCommand('copy')
    document.body.removeChild(element)

    if (originalRange) {
      selection.removeAllRanges() // originalRange can't be truthy when selection is falsy
      selection.addRange(originalRange)
    }

    // Get the focus back on the previously focused element, if any
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus()
    }
  }
}

const props = defineProps({
  copyText: {
    type: String,
    required: true,
  },
  copyIcon: {
    type: String,
    required: true,
  },
  onCopy: {
    type: Function,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
})

const onCopyCode = () => {
  copyToClipboard(props.text)
    .then(() => props.onCopy(props.text))
    .catch(console.error)
}
</script>
<style lang="less" scoped></style>
