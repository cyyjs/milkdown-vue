import { block } from '@milkdown/kit/plugin/block'
import { configureBlockHandle } from './handle'
import { configureMenu, menu, menuAPI } from './menu'

export default (editor, config) => {
  editor
    .config((ctx) => configureBlockHandle(ctx, config))
    .config((ctx) => configureMenu(ctx, config))
    .use(menuAPI)
    .use(block)
    .use(menu)
}
