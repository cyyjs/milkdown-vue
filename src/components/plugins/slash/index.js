import { slashFactory } from '@milkdown/plugin-slash'
import { usePluginViewFactory } from '@prosemirror-adapter/vue'
import Slash from './Slash.vue'

export default () => {
  const tooltip = slashFactory('Commands')
  const pluginViewFactory = usePluginViewFactory()

  const setSlash = (ctx) => {
    ctx.set(tooltip.key, {
      view: pluginViewFactory({
        component: Slash
      })
    })
  }
  return {
    slash: tooltip,
    setSlash
  }
}
