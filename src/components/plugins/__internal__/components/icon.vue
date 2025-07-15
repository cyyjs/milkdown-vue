<template lang="pug">
span.milkdown-icon(
  :class="class"
  @pointerdown="onClick"
  v-html="icon"
)
</template>
<script setup>

const props = defineProps({
  icon: {
    type: String,
    required: false,
  },
  class: {
    type: String,
    required: false,
  },
  onClick: {
    type: Function,
    required: false,
  }
})
</script>
<style lang="less" scoped>

</style>

