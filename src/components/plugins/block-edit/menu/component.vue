<template lang="pug">
.slash-main(ref="host" @pointerdown.prevent)
  nav.tab-group
    ul
      li(
        v-for="group in groupInfo.groups"
        :key="group.key"
        @pointerdown="onHover(group.range[0], scrollToIndex)"
        :class="{selected: hoverIndex >= group.range[0] && hoverIndex < group.range[1]}"
      ) {{ group.label }}
  .menu-groups(@pointermove="onPointerMove")
    .menu-group(
      v-for="group in groupInfo.groups"
      :key="group.key"
      class="menu-group"
    )
      h6 {{ group.label }}
      ul
        li(
          v-for="item in group.items"
          :key="item.key"
          :data-index="item.index"
          :class="{hover: hoverIndex === item.index}"
          @pointerenter="getOnPointerEnter(item.index)"
          @pointerdown="getOnPointerDown(item.index)"
          @pointerup="getOnPointerUp(item.index)"
        )
          span.left
            Icon(:icon="item.icon")
            span {{ item.label }}
          span.shortcut(v-if="item.shortcut") /{{ item.shortcut }}
</template>
<script setup>
import { Icon } from '@milkdown/kit/component'
import { computed, onUnmounted, ref, watch, watchEffect } from 'vue'
import { getGroups } from './config'

const props = defineProps({
  ctx: {
    type: Object,
    required: true
  },
  show: {
    type: Object,
    required: true
  },
  filter: {
    type: Object,
    required: true
  },
  hide: {
    type: Function,
    required: true
  },
  config: {
    type: Object,
    required: false
  }
})

const host = ref()

const groupInfo = computed(() => getGroups(props.filter.value, props.config.value, props.ctx))
const hoverIndex = ref(0)
const prevMousePosition = ref({ x: -999, y: -999 })

const onPointerMove = (e) => {
  const { x, y } = e
  prevMousePosition.value = { x, y }
}

watch([() => groupInfo.value, () => props.show.value], () => {
  const { size } = groupInfo.value
  if (size === 0 && props.show.value) props.hide()
  else if (hoverIndex.value >= size) hoverIndex.value = 0
})

const onHover = (index, after) => {
  const prevHoverIndex = hoverIndex.value
  const next = typeof index === 'function' ? index(prevHoverIndex) : index
  after?.(next)
  hoverIndex.value = next
}

const scrollToIndex = (index) => {
  const target = host.value?.querySelector(`[data-index="${index}"]`)
  const scrollRoot = host.value?.querySelector('.menu-groups')

  if (!target || !scrollRoot) return

  scrollRoot.scrollTop = target.offsetTop - scrollRoot.offsetTop
}

const runByIndex = (index) => {
  const item = groupInfo.value.groups.flatMap((group) => group.items).at(index)
  if (item && props.ctx) item.onRun(props.ctx)

  props.hide()
}

const onKeydown = (e) => {
  const { size, groups } = groupInfo.value
  if (e.key === 'Escape') {
    e.preventDefault()
    props.hide?.()
    return
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    return onHover((index) => (index < size - 1 ? index + 1 : index), scrollToIndex)
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault()
    return onHover((index) => (index <= 0 ? index : index - 1), scrollToIndex)
  }

  if (e.key === 'ArrowLeft') {
    e.preventDefault()
    return onHover((index) => {
      const group = groups.find((group) => group.range[0] <= index && group.range[1] > index)
      if (!group) return index

      const prevGroup = groups[groups.indexOf(group) - 1]
      if (!prevGroup) return index

      return prevGroup.range[1] - 1
    }, scrollToIndex)
  }

  if (e.key === 'ArrowRight') {
    e.preventDefault()
    return onHover((index) => {
      const group = groups.find((group) => group.range[0] <= index && group.range[1] > index)
      if (!group) return index

      const nextGroup = groups[groups.indexOf(group) + 1]
      if (!nextGroup) return index

      return nextGroup.range[0]
    }, scrollToIndex)
  }

  if (e.key === 'Enter') {
    e.preventDefault()
    runByIndex(hoverIndex.value)
  }
}

const getOnPointerEnter = (index) => (e) => {
  const prevPos = prevMousePosition.value
  if (!prevPos) return

  const { x, y } = e
  if (x === prevPos.x && y === prevPos.y) return

  onHover(index)
}
const getOnPointerDown = (index) => {
  host.value?.querySelector(`[data-index="${index}"]`)?.classList.add('active')
}
const getOnPointerUp = (index) => {
  host.value?.querySelector(`[data-index="${index}"]`)?.classList.remove('active')
  runByIndex(index)
}
watchEffect(() => {
  const isShown = props.show.value
  if (isShown) {
    window.addEventListener('keydown', onKeydown, { capture: true })
  } else {
    window.removeEventListener('keydown', onKeydown, { capture: true })
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown, { capture: true })
})
</script>
<style lang="less" scoped>
.slash-main {
  ul {
    list-style-type: none;

    li {
      cursor: pointer;
      border-radius: 6px;
    }
  }

  .tab-group {
    border-bottom: 1px solid color-mix(in srgb, var(--cyyjs-color-outline), transparent 80%);

    ul {
      padding: 8px 10px;
      display: flex;
      gap: 10px;
      flex-wrap: nowrap;

      li {
        padding: 6px 10px;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 20px;

        &:hover {
          background: var(--cyyjs-color-hover);
        }

        &.selected {
          background: var(--cyyjs-color-selected);
        }
      }
    }
  }

  .menu-groups {
    // padding: 0 12px 12px;
    max-height: 360px;
    overflow: auto;
    overscroll-behavior: contain;
    scroll-behavior: smooth;

    .menu-group {
      margin-bottom: 5px;
      &:last-child {
        margin-bottom: 0;
      }
      h6 {
        font-size: 0.8rem;
        padding: 5px 10px;
        margin: 0;
        text-transform: uppercase;
        color: color-mix(in srgb, var(--cyyjs-color), transparent 40%);
      }
      ul {
        padding-inline-start: 0;
        padding: 4px;
        li {
          min-width: 200px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;

          &.hover,
          &:hover {
            background: var(--cyyjs-color-hover);
          }

          &.active {
            background: var(--cyyjs-color-selected);
          }

          :deep(.milkdown-icon) {
            display: inline-block;
            width: 18px;
            height: 18px;
            & > svg {
              width: 18px;
              height: 18px;
            }
          }
          .left {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            & > span {
              font-size: 14px;
              font-style: normal;
              line-height: 20px;
            }
          }
          .shortcut {
            font-size: 12px;
            color: color-mix(in srgb, var(--cyyjs-color), transparent 50%);
          }
        }
      }
    }

    .menu-group + .menu-group::before {
      content: '';
      display: block;
      height: 1px;
      background: color-mix(in srgb, var(--cyyjs-color-outline), transparent 80%);
      margin: 0 10px;
    }
  }
}
</style>
