<template lang="pug">
div.tooltip(ref="divRef")
  button(@mousedown.prevent="toggle('toggleStrongCommand')") B
  button(@mousedown.prevent="toggle('toggleInlineCodeCommand')") Code
  button(@mousedown.prevent="toggle('toggleLinkCommand')") Link
  button(@mousedown.prevent="toggle('toggleEmphasisCommand')") I

</template>

<script setup>
import { TooltipProvider } from '@milkdown/plugin-tooltip'
import {
  toggleStrongCommand,
  toggleInlineCodeCommand,
  toggleLinkCommand,
  toggleEmphasisCommand
} from '@milkdown/preset-commonmark'
import { callCommand } from '@milkdown/utils'
import { useInstance } from '@milkdown/vue'
import { usePluginViewContext } from '@prosemirror-adapter/vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const { view, prevState } = usePluginViewContext()
const [loading, get] = useInstance()

const divRef = ref(null)

let tooltipProvider

onMounted(() => {
  tooltipProvider = new TooltipProvider({
    content: divRef.value
  })

  tooltipProvider.update(view.value, prevState.value)
})

watch([view, prevState], () => {
  tooltipProvider?.update(view.value, prevState.value)
})

onUnmounted(() => {
  tooltipProvider.destroy()
})

const toggleMap = {
  toggleStrongCommand: toggleStrongCommand.key,
  toggleInlineCodeCommand: toggleInlineCodeCommand.key,
  toggleLinkCommand: toggleLinkCommand.key,
  toggleEmphasisCommand: toggleEmphasisCommand.key
}
const toggle = (t) => {
  if (loading.value) return
  get().action(callCommand(toggleMap[t], ''))
}
</script>
<style lang="less" scoped>
.tooltip {
  position: absolute;
  display: none;
  background-color: #fff;

  &[data-show='true'] {
    display: block;
  }

  button {
    @apply text-gray-600 bg-slate-200 px-2 py-1 rounded-lg hover:bg-slate-300 border hover:text-gray-900;
  }
}
</style>
