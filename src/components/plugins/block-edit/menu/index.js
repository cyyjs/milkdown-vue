import { SlashProvider, slashFactory } from '@milkdown/kit/plugin/slash'
import { TextSelection } from '@milkdown/kit/prose/state'
import { $ctx } from '@milkdown/kit/utils'
import { createApp, ref } from 'vue'

import { isInCodeBlock, isInList } from '../../../utils'
import Menu from './component.vue'

export const menu = slashFactory('CREPE_MENU')

export const menuAPI = $ctx(
  {
    show: () => {},
    hide: () => {}
  },
  'menuAPICtx'
)

export function configureMenu(ctx, config) {
  ctx.set(menu.key, {
    view: (view) => new MenuView(ctx, view, config)
  })
}

class MenuView {
  #content
  #app
  #filter
  #slashProvider
  #programmaticallyPos = null

  constructor(ctx, view, config) {
    const content = document.createElement('div')
    content.classList.add('milkdown-slash-menu')
    const show = ref(false)

    const filter = ref('')
    this.#filter = filter

    const hide = this.hide

    const app = createApp(Menu, {
      ctx,
      config,
      show,
      filter,
      hide
    })
    this.#app = app
    app.mount(content)

    this.#content = content
    // oxlint-disable-next-line ts/no-this-alias
    const self = this
    this.#slashProvider = new SlashProvider({
      content: this.#content,
      debounce: 20,
      shouldShow(view) {
        if (isInCodeBlock(view.state.selection) || isInList(view.state.selection)) return false

        const currentText = this.getContent(view, (node) =>
          ['paragraph', 'heading'].includes(node.type.name)
        )
        if (currentText == null) return false

        if (!isSelectionAtEndOfNode(view.state.selection)) {
          return false
        }

        const pos = self.#programmaticallyPos

        filter.value =
          currentText.startsWith('/') || currentText.startsWith('、')
            ? currentText.slice(1)
            : currentText

        if (typeof pos === 'number') {
          const maxSize = view.state.doc.nodeSize - 2
          const validPos = Math.min(pos, maxSize)
          if (
            view.state.doc.resolve(validPos).node() !==
            view.state.doc.resolve(view.state.selection.from).node()
          ) {
            self.#programmaticallyPos = null

            return false
          }

          return true
        }

        if (!(currentText.startsWith('/') || currentText.startsWith('、'))) return false

        return true
      },
      offset: 10
    })

    this.#slashProvider.onShow = () => {
      show.value = true
    }
    this.#slashProvider.onHide = () => {
      show.value = false
    }
    this.update(view)

    ctx.set(menuAPI.key, {
      show: (pos) => this.show(pos),
      hide: () => this.hide()
    })
  }

  update = (view) => {
    this.#slashProvider.update(view)
  }

  show = (pos) => {
    this.#programmaticallyPos = pos
    this.#filter.value = ''
    this.#slashProvider.show()
  }

  hide = () => {
    this.#programmaticallyPos = null
    this.#slashProvider.hide()
  }

  destroy = () => {
    this.#slashProvider.destroy()
    this.#app.unmount()
    this.#content.remove()
  }
}

function isSelectionAtEndOfNode(selection) {
  if (!(selection instanceof TextSelection)) return false

  const { $head } = selection
  const parent = $head.parent
  const offset = $head.parentOffset

  return offset === parent.content.size
}
