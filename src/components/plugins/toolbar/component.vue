<template lang="pug">
.toolbar-group(v-for="(group, i) in groupInfo" :key="i")
  button.toolbar-item(
    v-for="item in group.items"
    type="button"
    :key="item.key"
    :class="{ 'active': checkActive(item.active) }"
    @pointerdown.prevent="item.onRun(ctx)"
  )
    SvgIcon(:name="item.icon")

</template>
<script setup>
import { Icon } from '@milkdown/kit/component'
import SvgIcon from '../../SvgIcon.vue'
import { editorCtx, EditorStatus } from '@milkdown/kit/core'
// import clsx from 'clsx'
import { defineComponent, h, Fragment, computed } from 'vue'
import { getGroups } from './config'
const props = defineProps({
  ctx: {
    type: Object,
    required: true
  },
  hide: {
    type: Function,
    required: true
  },
  show: {
    type: Object,
    required: true
  },
  selection: {
    type: Object,
    required: true
  },
  config: {
    type: Object,
    required: false
  }
})

const checkActive = (checker) => {
  // make sure the function subscribed to vue reactive
  props.selection.value
  // Check if the edtior is ready
  const status = props.ctx.get(editorCtx).status
  if (status !== EditorStatus.Created) return false

  return checker(props.ctx)
}

const groupInfo = computed(() => getGroups(props.config, props.ctx))

</script>
<style lang="less" scoped>
.toolbar-group {
  border-right: 1px solid var(--cyyjs-color-outline);
  padding-right: 5px;
  &:last-child {
    border-right: 0;
    padding-right: 0;
  }
}
.toolbar-group {
  display: flex;
  gap: 5px;
  align-items: center;
}
.toolbar-item {
  width: 28px;
  height: 28px;
  cursor: pointer;
  padding: 2px;
  border-radius: 4px;
  background-color: transparent;
  border: 0;
  color: var(--cyyjs-color);
  &>.span {
    width: 24px;
      height: 24px;
    display: inline-block;
  }
  &:hover {
    background-color: var(--cyyjs-btn-hv);
  }

  svg {
    height: 16px;
    width: 16px;
  }

  &.active {
    background: var(--cyyjs-color-selected);
    color: var(--cyyjs-primary-color);
  }
}
</style>
