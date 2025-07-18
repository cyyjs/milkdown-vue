<template lang="pug">
.preview-panel(v-if="preview")
  .preview(v-html="previewHtml")
</template>
<script setup>
import DOMPurify from 'dompurify'
import { computed } from 'vue'

const props = defineProps({
  preview: {
    type: [String, Object]
  }
})

const previewHtml = computed(() => {
  if (!props.preview) return ''
  return DOMPurify.sanitize(props.preview)
})
</script>
<style lang="less" scoped>
.preview-panel {
  &>:deep(.preview) {
    &>.mermaid {
      text-align: center;
    }
  }
}
</style>
