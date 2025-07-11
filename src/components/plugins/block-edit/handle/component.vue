<template lang="pug">
.operation-item(
  ref="addButton"
  @pointerdown.prevent.stop="onPointerdown"
  @pointerup.prevent.stop="onPointerup"
)
  Icon(:icon="addIcon")
.operation-item
  Icon(:icon="handleIcon")
</template>
<script setup>
import { Icon } from '@milkdown/kit/component'
import { ref } from 'vue'

const props = defineProps({
  onAdd: {
    type: Function,
    required: true
  },
  addIcon: {
    type: String,
    required: true
  },
  handleIcon: {
    type: String,
    required: true
  }
})
const addButton = ref()
const onPointerdown = () => {
  addButton.value?.classList.add('active')
}
const onPointerup = () => {
  addButton.value?.classList.remove('active')
  props.onAdd()
}
</script>
<style lang="less" scoped>
.operation-item {
  border-radius: 6px;
  padding: 2px;
  height: 24px;
  color: var(--cyyjs-primary-color);
  & > .milkdown-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: var(--cyyjs-color-hover);
  }

  &.active {
    background: var(--cyyjs-color-selected);
  }
}
</style>
