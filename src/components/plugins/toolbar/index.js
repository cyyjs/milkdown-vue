import { TooltipProvider, tooltipFactory } from '@milkdown/kit/plugin/tooltip'
import { TextSelection } from '@milkdown/kit/prose/state'
import { createApp, ref, shallowRef } from 'vue'

// import { crepeFeatureConfig } from '../../core/slice'
// import { CrepeFeature } from '../../feature'
import Toolbar from './component.vue'

const toolbarTooltip = tooltipFactory('CREPE_TOOLBAR')

class ToolbarView {
  #tooltipProvider
  #content
  #app
  #selection
  #show = ref(false)

  constructor(ctx, view, config) {
    const content = document.createElement('div')
    content.className = 'milkdown-toolbar'
    this.#selection = shallowRef(view.state.selection)
    const app = createApp(Toolbar, {
      ctx,
      hide: this.hide,
      config,
      selection: this.#selection,
      show: this.#show
    })
    app.mount(content)
    this.#content = content
    this.#app = app

    this.#tooltipProvider = new TooltipProvider({
      content: this.#content,
      debounce: 20,
      offset: 10,
      shouldShow(view) {
        const { doc, selection } = view.state
        const { empty, from, to } = selection

        const isEmptyTextBlock =
          !doc.textBetween(from, to).length && selection instanceof TextSelection

        const isNotTextBlock = !(selection instanceof TextSelection)

        const activeElement = view.dom.getRootNode().activeElement
        const isTooltipChildren = content.contains(activeElement)

        const notHasFocus = !view.hasFocus() && !isTooltipChildren

        const isReadonly = !view.editable

        if (notHasFocus || isNotTextBlock || empty || isEmptyTextBlock || isReadonly) return false

        return true
      }
    })
    this.#tooltipProvider.onShow = () => {
      this.#show.value = true
    }
    this.#tooltipProvider.onHide = () => {
      this.#show.value = false
    }
    this.update(view)
  }

  update = (view, prevState) => {
    this.#tooltipProvider.update(view, prevState)
    this.#selection.value = view.state.selection
  }

  destroy = () => {
    this.#tooltipProvider.destroy()
    this.#app.unmount()
    this.#content.remove()
  }

  hide = () => {
    this.#tooltipProvider.hide()
  }
}

export default (editor, config) => {
  editor
    // .config(crepeFeatureConfig(CrepeFeature.Toolbar))
    .config((ctx) => {
      ctx.set(toolbarTooltip.key, {
        view: (view) => new ToolbarView(ctx, view, config)
      })
    })
    .use(toolbarTooltip)
}
